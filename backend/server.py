import os
from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import psycopg2
import json
from keys import key_password

app = FastAPI()

# Allow the React dev server (and optional production frontend) to call the API.
_cors_origins = [
    origin.strip()
    for origin in os.getenv(
        "CORS_ORIGINS",
        "http://localhost:5173,http://127.0.0.1:5173",
    ).split(",")
    if origin.strip()
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=_cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SoftwarePayload(BaseModel):
    company_id: str
    machine_id: str
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

# Get the absolute path of the directory where server.py lives
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def init_db():
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS master_apps (
            id SERIAL PRIMARY KEY,
            app_name TEXT NOT NULL UNIQUE,
            risk_tier INTEGER DEFAULT 1,
            app_type TEXT DEFAULT 'Unknown',
            is_prohibited BOOLEAN DEFAULT FALSE,
            is_reviewed_by_ad BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS machine_inventories (
            id SERIAL PRIMARY KEY,
            company_id TEXT NOT NULL,
            machine_id TEXT NOT NULL,
            master_app_id INTEGER REFERENCES master_apps(id) ON DELETE CASCADE,
            installed_version TEXT DEFAULT 'Unknown',
            last_scanned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE (company_id, machine_id, master_app_id)
        )
    ''')

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS licenses (
            software_name TEXT PRIMARY KEY,
            allowed_count INTEGER
        )
    ''')

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS ignored_software (
            software_name TEXT PRIMARY KEY
        )
    ''')

    default_freeware = [
        
    ]
    cursor.executemany('''
        INSERT INTO ignored_software (software_name) 
        VALUES (%s) 
        ON CONFLICT (software_name) DO NOTHING
    ''', default_freeware)



init_db()


def get_or_create_master_app_id(app_name: str) -> int:
    cursor.execute(
        '''
        INSERT INTO master_apps (app_name)
        VALUES (%s)
        ON CONFLICT (app_name) DO UPDATE SET app_name = EXCLUDED.app_name
        RETURNING id
        ''',
        (app_name,),
    )
    row = cursor.fetchone()
    if row:
        return row[0]
    cursor.execute("SELECT id FROM master_apps WHERE app_name = %s", (app_name,))
    return cursor.fetchone()[0]


@app.post("/api/upload_scan")
async def receive_scan(payload: SoftwarePayload):
    try:
        clean_software_list = []
        junk_keywords = [
            "kb50", "security update", "windows update", "hotfix",
            "language pack", "redistributable", "c++",
        ]

        for app in payload.software_list:
            if any(keyword in app.lower() for keyword in junk_keywords):
                continue
            clean_software_list.append(app)

        cursor.execute(
            '''
            DELETE FROM machine_inventories
            WHERE company_id = %s AND machine_id = %s
            ''',
            (payload.company_id, payload.machine_id),
        )

        for app in clean_software_list:
            master_app_id = get_or_create_master_app_id(app)
            cursor.execute(
                '''
                INSERT INTO machine_inventories
                    (company_id, machine_id, master_app_id, last_scanned_at)
                VALUES (%s, %s, %s, CURRENT_TIMESTAMP)
                ON CONFLICT (company_id, machine_id, master_app_id)
                DO UPDATE SET last_scanned_at = CURRENT_TIMESTAMP
                ''',
                (payload.company_id, payload.machine_id, master_app_id),
            )

        return {
            "status": "success",
            "company_id": payload.company_id,
            "machine_id": payload.machine_id,
            "apps_stored": len(clean_software_list),
            "filtered_out": len(payload.software_list) - len(clean_software_list),
        }

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
        cursor.execute("SELECT software_name, allowed_count FROM licenses")
        licenses = {row[0]: row[1] for row in cursor.fetchall()}

        cursor.execute("SELECT software_name FROM ignored_software")
        ignored_apps = {row[0] for row in cursor.fetchall()}

        cursor.execute('''
            SELECT mi.company_id, mi.machine_id, ma.app_name, mi.last_scanned_at
            FROM machine_inventories mi
            JOIN master_apps ma ON mi.master_app_id = ma.id
        ''')
        all_software_rows = cursor.fetchall()

        install_counts = {}
        software_locations = {}
        device_software_map = {}
        device_meta = {}

        for company_id, machine_id, app_name, last_scanned in all_software_rows:
            device_key = f"{company_id}:{machine_id}"

            if app_name in install_counts:
                install_counts[app_name] += 1
                software_locations[app_name].append(machine_id)
            else:
                install_counts[app_name] = 1
                software_locations[app_name] = [machine_id]

            if device_key not in device_software_map:
                device_software_map[device_key] = []
            device_software_map[device_key].append(app_name)

            existing = device_meta.get(device_key)
            if not existing or (last_scanned and last_scanned > existing["last_seen"]):
                device_meta[device_key] = {
                    "company_id": company_id,
                    "machine_id": machine_id,
                    "last_seen": last_scanned,
                }

        real_alerts = []
        for app_name, installed in install_counts.items():
            if app_name in ignored_apps:
                continue
            if app_name in licenses:
                allowed = licenses[app_name]
                if installed > allowed:
                    real_alerts.append({
                        "software": app_name,
                        "installed": installed,
                        "allowed": allowed,
                        "shortfall": installed - allowed,
                        "devices": software_locations.get(app_name, []),
                    })
            else:
                real_alerts.append({
                    "software": app_name,
                    "installed": installed,
                    "allowed": 0,
                    "shortfall": installed,
                    "devices": software_locations.get(app_name, []),
                })

        device_list = []
        for device_key, meta in device_meta.items():
            host_apps = device_software_map.get(device_key, [])
            device_list.append({
                "hostname": meta["machine_id"],
                "company_id": meta["company_id"],
                "os_type": "Unknown",
                "software_count": len(host_apps),
                "software_list": host_apps,
                "last_seen": meta["last_seen"],
            })

        return {"status": "success", "alerts": real_alerts, "devices": device_list}

    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
	uvicorn.run(app, host="0.0.0.0", port=8000)
