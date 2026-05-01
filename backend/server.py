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
# --- THE CLOUD DETECTOR ---
# This line tells Python: "Look for a cloud database first. If you don't find one, 
# just use my local laptop database."
DB_URL = os.getenv("DATABASE_URL", f"host=localhost dbname=licenseaudit user=postgres password={key_password}")

# Connect using the dynamic URL
conn = psycopg2.connect(DB_URL)
conn.autocommit = True
cursor = conn.cursor()
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
    # Table 1: Devices (Cleaned up)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS devices (
            hostname TEXT PRIMARY KEY,
            os_type TEXT,
            last_seen TIMESTAMP
        )
    ''')

    # NEW Table 2: Device Software Mapping
    # Every single app gets its own row. ON DELETE CASCADE means if a device 
    # is deleted, all its software records vanish automatically to keep data clean.
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS device_software (
            hostname TEXT REFERENCES devices(hostname) ON DELETE CASCADE,
            software_name TEXT,
            PRIMARY KEY (hostname, software_name)
        )
    ''')

    # Table 3: Licenses
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS licenses (
            software_name TEXT PRIMARY KEY,
            allowed_count INTEGER
        )
    ''')

    # Table 4: Ignored Software
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS ignored_software (
            software_name TEXT PRIMARY KEY
        )
    ''')

    default_freeware = [
        ("Notepad",), ("Google Chrome",), ("Mozilla Firefox",), 
        ("Microsoft Edge",), ("Microsoft Edge Update",)
    ]
    cursor.executemany('''
        INSERT INTO ignored_software (software_name) 
        VALUES (%s) 
        ON CONFLICT (software_name) DO NOTHING
    ''', default_freeware)



init_db()



@app.post("/api/upload_scan")
async def receive_scan(payload: SoftwarePayload):
    try:
        # --- THE SMART FILTER ---
        clean_software_list = []
        junk_keywords = ["kb50", "security update", "windows update", "hotfix", "language pack", "redistributable", "c++"]

        for app in payload.software_list:
            if any(keyword in app.lower() for keyword in junk_keywords):
                continue
            clean_software_list.append(app)

        # 1. Update the Device Record
        cursor.execute('''
                INSERT INTO devices (hostname, os_type, last_seen)
                VALUES (%s, %s, CURRENT_TIMESTAMP)
                ON CONFLICT (hostname) DO UPDATE SET 
                    last_seen = CURRENT_TIMESTAMP
            ''', (payload.hostname, payload.os_type))
        
        # 2. Erase the old software list for THIS specific device
        cursor.execute("DELETE FROM device_software WHERE hostname = %s", (payload.hostname,))
        
        # 3. Insert the fresh, clean software list (One row per app!)
        for app in clean_software_list:
            cursor.execute('''
                INSERT INTO device_software (hostname, software_name)
                VALUES (%s, %s)
            ''', (payload.hostname, app))
            
        return {"status": "success", "filtered_out": len(payload.software_list) - len(clean_software_list)}
        
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
        cursor.execute("SELECT hostname, os_type, last_seen FROM devices")
        all_devices = cursor.fetchall()
        
        cursor.execute("SELECT software_name, allowed_count FROM licenses")
        licenses = {row[0]: row[1] for row in cursor.fetchall()} 
        
        cursor.execute("SELECT software_name FROM ignored_software")
        ignored_apps = {row[0] for row in cursor.fetchall()}

        # NEW LOGIC: Get all software from the new table
        cursor.execute("SELECT hostname, software_name FROM device_software")
        all_software_rows = cursor.fetchall()

        # Group it up for the math engine
        install_counts = {}
        software_locations = {}
        device_software_map = {} # Groups apps by hostname for the UI

        for row in all_software_rows:
            host = row[0]
            app = row[1]

            # Count total installs across network
            if app in install_counts:
                install_counts[app] += 1
                software_locations[app].append(host)
            else:
                install_counts[app] = 1
                software_locations[app] = [host]
            
            # Map apps to specific devices for the UI list
            if host not in device_software_map:
                device_software_map[host] = []
            device_software_map[host].append(app)

        # 3. Calculate Alerts (Reconciliation Loop)
        real_alerts = []
        for app_name, installed in install_counts.items():
            if app_name in ignored_apps:
                continue
            if app_name in licenses:
                allowed = licenses[app_name]
                if installed > allowed:
                    real_alerts.append({
                        "software": app_name, "installed": installed, "allowed": allowed,
                        "shortfall": installed - allowed, "devices": software_locations.get(app_name, [])
                    })
            else:
                real_alerts.append({
                    "software": app_name, "installed": installed, "allowed": 0,
                    "shortfall": installed, "devices": software_locations.get(app_name, [])
                })

        # 4. Package Device List for the UI
        device_list = []
        for device in all_devices:
            host = device[0]
            # Grab the list we built above, or an empty list if they have no apps
            host_apps = device_software_map.get(host, []) 
            
            device_list.append({
                "hostname": host,
                "os_type": device[1],
                "software_count": len(host_apps),
                "software_list": host_apps,
                "last_seen": device[2]
            })

        return {"status": "success", "alerts": real_alerts, "devices": device_list}
        
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
	uvicorn.run(app, host="0.0.0.0", port=8000)
