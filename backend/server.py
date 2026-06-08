import os
import json
import asyncio
from datetime import datetime
from typing import Dict
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import psycopg2
from psycopg2.pool import SimpleConnectionPool
from psycopg2.extras import RealDictCursor
from openai import OpenAI

app = FastAPI()

# --- CORS Middleware Config ---
_cors_origins = [
    origin.strip()
    for origin in os.getenv(
        "CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173"
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

# --- Database Setup & Connection Pooling ---
DB_URL = os.getenv(
    "DATABASE_URL", "host=localhost dbname=licenseaudit user=postgres password=root"
)

# Initialize a global connection pool (min 2 permanent pathways, max 20 concurrent pathways)
db_pool = SimpleConnectionPool(
    minconn=2, maxconn=20, dsn=DB_URL, cursor_factory=RealDictCursor
)

# --- OpenAI Initialization & Concurrency Control ---
openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY", "your-fallback-key-here"))

# This global lock queues concurrent requests so they never cause a 429 Rate Limit error
openai_lock = asyncio.Lock()


class AgentPayload(BaseModel):
    company_id: str
    machine_id: str
    software_data: Dict[str, str]
# --- Fixed Schema Layer ---
class UIDashboardMetrics(BaseModel):
    totalDevices: int
    totalSoftwareAssets: int
    complianceAlerts: int
    potentialSavings: float

class UIDevice(BaseModel):
    id: str
    deviceName: str
    os: str
    ipAddress: str
    lastAudit: str
    status: str

class UISoftwareAsset(BaseModel):
    id: str
    applicationName: str
    version: str  # Fixed to str
    totalInstallations: int
    licenseType: str
    complianceStatus: str

class UIDashboardPayload(BaseModel):
    metrics: UIDashboardMetrics
    devices: list[UIDevice]
    software: list[UISoftwareAsset]

@app.get("/v1/dashboard", response_model=UIDashboardPayload)
async def get_dashboard_data(company_id: str = "default_company"):
    conn = db_pool.getconn()
    try:
        cursor = conn.cursor()

        # 1. Fetch Unique System Devices
        cursor.execute(
            """
            SELECT machine_id, MAX(last_scanned_at) as last_audit
            FROM machine_inventories 
            WHERE company_id = %s 
            GROUP BY machine_id;
            """,
            (company_id,),
        )
        device_rows = cursor.fetchall()

        ui_devices = []
        for dev in device_rows:
            m_id = dev["machine_id"]
            ui_devices.append({
                "id": m_id,
                "deviceName": m_id,
                "os": "Linux" if "lnx" in m_id.lower() or "linux" in m_id.lower() else "Windows",
                "ipAddress": "10.4.x.x",  # Placeholder unless streamed by agent
                "lastAudit": dev["last_audit"].isoformat() + "Z",
                "status": "active" if (datetime.utcnow() - dev["last_audit"]).days < 2 else "offline"
            })

        # 2. Fetch Aggregated Discovered Software Packages paired with purchased License stats
        cursor.execute(
            """
            SELECT 
                m.id as app_id,
                m.app_name,
                m.risk_tier,
                m.app_type,
                COUNT(DISTINCT i.machine_id) as installations_count,
                MAX(i.installed_version) as typical_version,
                COALESCE(l.seats_purchased, 0) as seats_purchased,
                COALESCE(l.license_cost, 0.00) as unit_cost
            FROM master_apps m
            JOIN machine_inventories i ON m.id = i.master_app_id
            LEFT JOIN software_licenses l ON m.id = l.master_app_id AND l.company_id = %s
            WHERE i.company_id = %s
            GROUP BY m.id, m.app_name, m.risk_tier, m.app_type, l.seats_purchased, l.license_cost;
            """,
            (company_id, company_id),
        )
        software_rows = cursor.fetchall()

        ui_software = []
        alerts_count = 0
        total_wasted_spend = 0.0

        for sw in software_rows:
            installs = sw["installations_count"]
            seats = sw["seats_purchased"]
            unit_cost = float(sw["unit_cost"])
            
            # Real SAM Compliance logic calculations
            if sw["risk_tier"] == 3:  # Commercial Software
                lic_type = "Commercial"
                if installs > seats:
                    compliance = "Unlicensed"
                    alerts_count += 1
                elif seats > installs:
                    compliance = "Over-licensed"
                    # Financial Optimization: Cost per seat * unused seats sitting idle
                    total_wasted_spend += (seats - installs) * unit_cost
                else:
                    compliance = "Compliant"
            else:
                lic_type = "Open Source" if sw["risk_tier"] == 1 else "Freeware"
                compliance = "Compliant"

            ui_software.append({
                "id": str(sw["app_id"]),
                "applicationName": sw["app_name"],
                "version": sw["typical_version"],
                "totalInstallations": installs,
                "licenseType": lic_type,
                "complianceStatus": compliance
            })

        # 3. Pack complete payload summary mapping directly to Next.js state fields
        payload = {
            "metrics": {
                "totalDevices": len(ui_devices),
                "totalSoftwareAssets": len(ui_software),
                "complianceAlerts": alerts_count,
                "potentialSavings": total_wasted_spend
            },
            "devices": ui_devices,
            "software": ui_software
        }

        cursor.close()
        return payload

    except Exception as err:
        print(f"SAM compilation engine exception: {err}")
        raise HTTPException(status_code=500, detail="Internal asset calculation failure.")
    finally:
        db_pool.putconn(conn)

@app.post("/api/upload_scan")
async def upload_scan(payload: AgentPayload):
    incoming_apps = [
        name.strip() for name in payload.software_data.keys() if name.strip()
    ]
    if not incoming_apps:
        return {"status": "success", "message": "No applications found to process"}

    # Dynamically lease a database channel connection from our pool
    conn = db_pool.getconn()
    try:
        cursor = conn.cursor()

        # Step 1: Query what we already know globally
        cursor.execute(
            "SELECT id, app_name FROM master_apps WHERE app_name = ANY(%s);",
            (incoming_apps,),
        )
        existing_rows = cursor.fetchall()
        known_apps_map = {row["app_name"].lower(): row["id"] for row in existing_rows}

        # Identify truly unseen apps for the AI
        missing_apps = [
            name for name in incoming_apps if name.lower() not in known_apps_map
        ]

        # Step 2: Call AI Agent for classification metadata safely using our Async Lock
        if missing_apps:
            system_prompt = (
                "You are an enterprise Software Asset Management expert.\n"
                "Categorize the provided list of software names into a JSON object containing an array named 'apps'.\n"
                "Each object within 'apps' must strictly feature these single-letter keys:\n"
                "- 'n': The exact string of the app_name.\n"
                "- 'r': The risk tier as a single integer (0, 1, 2, or 3).\n"
                "- 't': The app_type category classification (string).\n\n"
                "Risk Tiers mapping rules:\n"
                "0 = Operating System components, low-level system drivers, updates, language runtimes.\n"
                "1 = Standard free, open-source, or utility applications.\n"
                "2 = Medium risk, Shadow IT, or restrictive items (Games, Torrents, Personal Chat tools).\n"
                "3 = High risk, high-cost, or audit-intensive commercial software requiring active licenses.\n\n"
                "CATCH-ALL RULE FOR UNKNOWN/RARE APPS:\n"
                "If you encounter a software name that is completely rare, unknown, or not in your training data, "
                "do not guess randomly. Categorize its tier as 1 ('r': 1) and output its type classification "
                "strictly as 'Unclassified App' ('t': 'Unclassified App').\n\n"
                "Return absolutely zero conversational fluff. Only raw minified JSON."
            )

            # Acquired Lock: If another computer is using OpenAI, this thread waits here gracefully
            async with openai_lock:
                ai_response = openai_client.chat.completions.create(
                    model="gpt-5.4-mini",
                    response_format={"type": "json_object"},
                    messages=[
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": json.dumps(missing_apps)},
                    ],
                )

            parsed_payload = json.loads(ai_response.choices[0].message.content)
            ai_categorized_list = parsed_payload.get("apps", [])

            # Step 3: Save metadata to Master table
            for item in ai_categorized_list:
                name = item.get("n")
                tier = item.get("r", 1)
                atype = item.get("t", "Unknown")
                if not name:
                    continue

                is_prohibited = atype.lower() in [
                    "game",
                    "p2p/torrent",
                    "torrent",
                    "p2p",
                    "media downloader",
                ]

                try:
                    cursor.execute("SAVEPOINT app_insert_savepoint;")
                    cursor.execute(
                        """
                        INSERT INTO master_apps (app_name, risk_tier, app_type, is_prohibited, sent_to_ai_at)
                        VALUES (%s, %s, %s, %s, %s)
                        ON CONFLICT (app_name) DO UPDATE 
                        SET risk_tier = EXCLUDED.risk_tier, app_type = EXCLUDED.app_type
                        RETURNING id;
                        """,
                        (name, tier, atype, is_prohibited, datetime.utcnow()),
                    )
                    new_id_row = cursor.fetchone()
                    if new_id_row:
                        known_apps_map[name.lower()] = new_id_row["id"]
                    cursor.execute("RELEASE SAVEPOINT app_insert_savepoint;")
                except Exception as db_err:
                    print(f"Skipping row write error for {name}: {db_err}")
                    cursor.execute("ROLLBACK TO SAVEPOINT app_insert_savepoint;")
                    continue

        # Step 4: Save REAL versions into machine inventory entries dynamically
        for app_name, version_string in payload.software_data.items():
            master_id = known_apps_map.get(app_name.lower())
            if not master_id:
                continue

            cursor.execute(
                """
                INSERT INTO machine_inventories (company_id, machine_id, master_app_id, installed_version, last_scanned_at)
                VALUES (%s, %s, %s, %s, %s)
                ON CONFLICT (machine_id, master_app_id) DO UPDATE
                SET installed_version = EXCLUDED.installed_version, last_scanned_at = EXCLUDED.last_scanned_at;
                """,
                (
                    payload.company_id,
                    payload.machine_id,
                    master_id,
                    version_string or "Unknown",
                    datetime.utcnow(),
                ),
            )

        conn.commit()
        cursor.close()
        return {
            "status": "success",
            "message": f"Processed {len(incoming_apps)} apps cleanly",
        }

    except Exception as general_err:
        conn.rollback()
        print(f"Server processing failure error log: {general_err}")
        raise HTTPException(status_code=500, detail=str(general_err))

    finally:
        # Crucial: Always drop the connection lease back to the pool for the next machine request!
        db_pool.putconn(conn)
