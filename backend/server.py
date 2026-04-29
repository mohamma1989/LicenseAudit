import os
from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import psycopg2
import json
from keys import key_password

app = FastAPI()
class SoftwarePayload(BaseModel):
	hostname: str
	os_type: str
	software_list: list[str]
class LicenseInput(BaseModel):
    software_name: str
    allowed_count: int
class IgnoreInput(BaseModel):
    software_name: str    
try:
	conn = psycopg2.connect(
		dbname="licenseaudit",
		user="la_admin",
		password= key_password,
		host="localhost",
		port="5432"
	)
	# Autocommit ensures we don't have to call conn.commit() after every single insert
	conn.autocommit = True 
	cursor = conn.cursor()
except Exception as e:
	print(f"Database connection failed: {e}")
# --- THE CORS BRIDGE ---
# This tells the backend: "It is safe to accept requests from the React app"
app.add_middleware(
	CORSMiddleware,
	allow_origins=["http://localhost:5173"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

# Get the absolute path of the directory where server.py lives
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def init_db():
    # Table 1: Devices
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS devices (
            hostname TEXT PRIMARY KEY,
            os_type TEXT,
            software_list TEXT,
            last_seen TIMESTAMP
        )
    ''')

    # Table 2: Licenses
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS licenses (
            software_name TEXT PRIMARY KEY,
            allowed_count INTEGER
        )
    ''')

    # Table 3: Ignored Software
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS ignored_software (
            software_name TEXT PRIMARY KEY
        )
    ''')

    # Pre-load defaults 
    default_freeware = [
        ("Notepad",), ("Google Chrome",), ("Mozilla Firefox",), 
        ("Microsoft Edge",), ("Microsoft Edge Update",)
    ]
    cursor.executemany('''
        INSERT INTO ignored_software (software_name) 
        VALUES (%s) 
        ON CONFLICT (software_name) DO NOTHING
    ''', default_freeware)
    
    # That is it! No conn.close() down here.




init_db()



@app.post("/api/upload_scan")
async def receive_scan(payload: SoftwarePayload):
    try:
        software_string = json.dumps(payload.software_list)
        cursor.execute('''
                INSERT INTO devices (hostname, os_type, software_list, last_seen)
                VALUES (%s, %s, %s, CURRENT_TIMESTAMP)
                ON CONFLICT (hostname) DO UPDATE SET 
                    software_list = EXCLUDED.software_list,
                    last_seen = CURRENT_TIMESTAMP
            ''', (payload.hostname, payload.os_type, software_string))
        
        return {"status": "success"}
    except Exception as e:
        return {"error": str(e)}

@app.post("/api/add_license")
async def add_license(license_data: LicenseInput):
    try:
        # We use the global Postgres 'cursor' we defined at the top of server.py
        cursor.execute('''
            INSERT INTO licenses (software_name, allowed_count)
            VALUES (%s, %s)
            ON CONFLICT (software_name) DO UPDATE SET
                allowed_count = EXCLUDED.allowed_count
        ''', (license_data.software_name, license_data.allowed_count))
        
        # Note: If you set conn.autocommit = True earlier, you don't even need conn.commit() here!
        
        return {"status": "success", "message": f"Rule saved for {license_data.software_name}"}
    except Exception as e:
        return {"error": str(e)}

@app.post("/api/ignore_software")
async def ignore_software(data: IgnoreInput):
    try:
        cursor.execute('''
            INSERT INTO ignored_software (software_name)
            VALUES (%s)
            ON CONFLICT (software_name) DO NOTHING
        ''', (data.software_name,))
        return {"status": "success", "message": f"Successfully ignored {data.software_name}"}
    except Exception as e:
        return {"error": str(e)}
# --- THE NEW JSON DASHBOARD ROUTE ---
@app.get("/api/dashboard_data")
async def get_dashboard_data():
    try:
        # 1. Fetch raw data using the global PostgreSQL cursor
        cursor.execute("SELECT hostname, os_type, software_list, last_seen FROM devices")
        all_devices = cursor.fetchall()
        
        cursor.execute("SELECT software_name, allowed_count FROM licenses")
        # Convert to a dictionary: {"Microsoft Office": 50}
        licenses = {row[0]: row[1] for row in cursor.fetchall()} 
        
        cursor.execute("SELECT software_name FROM ignored_software")
        # Convert to a set for super fast lookups: {"Notepad", "Chrome"}
        ignored_apps = {row[0] for row in cursor.fetchall()}

        # 2. The Math Engine (Count everything)
        install_counts = {}
        software_locations = {}

        for device in all_devices:
            hostname = device[0]
            software_list = json.loads(device[2])
            for package in software_list:
                if package in install_counts:
                    install_counts[package] += 1
                    software_locations[package].append(hostname)
                else:
                    install_counts[package] = 1
                    software_locations[package] = [hostname]

        # 3. Calculate Alerts (Reconciliation Loop)
        real_alerts = []
        for app_name, installed in install_counts.items():
            
            # RULE A: If it's on the Allowlist, skip it entirely.
            if app_name in ignored_apps:
                continue
                
            # RULE B: Check if we own licenses for it.
            if app_name in licenses:
                allowed = licenses[app_name]
                if installed > allowed:
                    real_alerts.append({
                        "software": app_name,
                        "installed": installed,
                        "allowed": allowed,
                        "shortfall": installed - allowed,
                        "devices": software_locations.get(app_name, [])
                    })
            # RULE C: Not ignored, and not licensed? Unapproved Software!
            else:
                real_alerts.append({
                    "software": app_name,
                    "installed": installed,
                    "allowed": 0,
                    "shortfall": installed,
                    "devices": software_locations.get(app_name, [])
                })

        # 4. Package Device List for the UI
        device_list = []
        for device in all_devices:
            device_list.append({
                "hostname": device[0],
                "os_type": device[1],
                "software_count": len(json.loads(device[2])),
                "software_list": json.loads(device[2]),
                "last_seen": device[3]
            })

        return {"status": "success", "alerts": real_alerts, "devices": device_list}
        
    except Exception as e:
        return {"error": str(e)}


if __name__ == "__main__":
	uvicorn.run(app, host="0.0.0.0", port=8000)
