import os
from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import sqlite3
import json

app = FastAPI()

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

# Lock the database file strictly to that directory
DB_FILE = os.path.join(BASE_DIR, "scans.db")


def init_db():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute(
        """CREATE TABLE IF NOT EXISTS device_scans (id INTEGER PRIMARY KEY AUTOINCREMENT, hostname TEXT UNIQUE, os_type TEXT, software_json TEXT, last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"""
    )
    cursor.execute(
        """CREATE TABLE IF NOT EXISTS purchased_licenses (id INTEGER PRIMARY KEY AUTOINCREMENT, software_name TEXT UNIQUE, allowed_count INTEGER)"""
    )
    cursor.execute(
        "INSERT OR IGNORE INTO purchased_licenses (software_name, allowed_count) VALUES ('python3', 0)"
    )
    conn.commit()
    conn.close()


init_db()


class SoftwarePayload(BaseModel):
    hostname: str
    os_type: str
    software_list: list[str]


@app.post("/api/upload_scan")
async def receive_scan(payload: SoftwarePayload):
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    software_string = json.dumps(payload.software_list)
    cursor.execute(
        """INSERT OR REPLACE INTO device_scans (hostname, os_type, software_json, last_seen) VALUES (?, ?, ?, CURRENT_TIMESTAMP)""",
        (payload.hostname, payload.os_type, software_string),
    )
    conn.commit()
    conn.close()
    return {"status": "success"}


@app.post("/api/add_license")
async def add_license(software_name: str = Form(...), allowed_count: int = Form(...)):
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute(
        """INSERT OR REPLACE INTO purchased_licenses (software_name, allowed_count) VALUES (?, ?)""",
        (software_name.lower(), allowed_count),
    )
    conn.commit()
    conn.close()
    # Notice we no longer redirect to an HTML page. We just return a success message.
    return {"status": "success", "message": f"Rule saved for {software_name}"}


# --- THE NEW JSON DASHBOARD ROUTE ---
@app.get("/api/dashboard_data")
async def get_dashboard_data():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute(
        "SELECT hostname, os_type, software_json, last_seen FROM device_scans"
    )
    all_devices = cursor.fetchall()
    cursor.execute("SELECT software_name, allowed_count FROM purchased_licenses")
    purchased_rules = cursor.fetchall()
    conn.close()

    # The Math Engine
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

    # Package the alerts into a clean list of dictionaries
    alerts = []
    for rule in purchased_rules:
        software_name = rule[0]
        allowed = rule[1]
        installed = install_counts.get(software_name, 0)

        if installed > allowed:
            alerts.append(
                {
                    "software": software_name,
                    "installed": installed,
                    "allowed": allowed,
                    "shortfall": installed - allowed,
                    "devices": software_locations.get(software_name, []),
                }
            )

    # Package the devices into a clean list
    device_list = []
    for device in all_devices:
        device_list.append(
            {
                "hostname": device[0],
                "os_type": device[1],
                "software_count": len(json.loads(device[2])),
                "software_list": json.loads(device[2]),
                "last_seen": device[3],
            }
        )

    # Return pure data, no UI!
    return {"status": "success", "alerts": alerts, "devices": device_list}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
