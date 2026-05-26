import os
import json
from datetime import datetime
from typing import List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import psycopg2
from psycopg2.extras import RealDictCursor
from openai import OpenAI

app = FastAPI()

# --- CORS Middleware Config ---
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

# --- Database & OpenAI Initialization ---
DB_URL = os.getenv("DATABASE_URL", "host=localhost dbname=licenseaudit user=postgres password=root")
openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY", "your-fallback-key-here"))

# --- Pydantic Data Contract ---
class AgentPayload(BaseModel):
    company_id: str
    machine_id: str
    software_list: List[str]

def get_db_connection():
    # Supports both standard DSN strings and keyword strings
    return psycopg2.connect(DB_URL, cursor_factory=RealDictCursor)

@app.post("/api/upload_scan")
async def upload_scan(payload: AgentPayload):
    # Step 1: Clean and deduplicate incoming strings locally
    incoming_apps = list(set([app.strip() for app in payload.software_list if app.strip()]))
    if not incoming_apps:
        return {"status": "success", "message": "No applications found to process"}

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Step 2: Check global database dictionary to see what we already know
        cursor.execute(
            "SELECT id, app_name FROM master_apps WHERE app_name = ANY(%s);",
            (incoming_apps,)
        )
        existing_rows = cursor.fetchall()
        known_apps_map = {row["app_name"]: row["id"] for row in existing_rows}

        # Identify missing software that requires AI classification
        missing_apps = [name for name in incoming_apps if name not in known_apps_map]

        # Step 3: Call AI Agent using GPT-5.4-mini if unknown software is detected
        if missing_apps:
            system_prompt = (
                "You are an enterprise Software Asset Management expert.\n"
                "Categorize the provided list of software names into a JSON object containing an array named 'apps'.\n"
                "Each object within 'apps' must strictly feature: 'app_name', 'risk_tier' (integer 0-3), and 'app_type' (string).\n\n"
                "Risk Tiers mapping rules:\n"
                "0 = Operating System components, low-level system drivers, updates, language runtimes (e.g. .NET, DirectX).\n"
                "1 = Standard free, open-source, or utility applications (e.g. Google Chrome, Notepad++, VLC).\n"
                "2 = Medium risk, Shadow IT, or restrictive items (e.g. Games, Torrent Clients, Personal Chat tools).\n"
                "3 = High risk, high-cost, or audit-intensive commercial software requiring active licenses (e.g. Adobe Creative Cloud, IntelliJ IDEA, Microsoft Office).\n\n"
                "Return absolutely zero conversational fluff, notes, or markdown. Only raw JSON matching the requested structure."
            )

            # Requesting JSON structure explicitly from GPT-5.4-mini
            ai_response = openai_client.chat.completions.create(
                model="gpt-5.4-mini",
                response_format={"type": "json_object"},
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": json.dumps(missing_apps)}
                ]
            )

            parsed_payload = json.loads(ai_response.choices[0].message.content)
            ai_categorized_list = parsed_payload.get("apps", [])

            # Step 4: Save new app classes into global master catalog
            for item in ai_categorized_list:
                name = item.get("app_name")
                tier = item.get("risk_tier", 1)
                atype = item.get("app_type", "Unknown")
                
                # Automatically flag malicious/non-work applications as prohibited
                is_prohibited = atype.lower() in ["game", "p2p/torrent", "torrent", "p2p", "media downloader"]

                try:
                    cursor.execute(
                        """
                        INSERT INTO master_apps (app_name, risk_tier, app_type, is_prohibited, sent_to_ai_at)
                        VALUES (%s, %s, %s, %s, %s)
                        ON CONFLICT (app_name) DO UPDATE 
                        SET risk_tier = EXCLUDED.risk_tier, app_type = EXCLUDED.app_type
                        RETURNING id;
                        """,
                        (name, tier, atype, is_prohibited, datetime.utcnow())
                    )
                    new_id_row = cursor.fetchone()
                    if new_id_row:
                        known_apps_map[name] = new_id_row["id"]
                except Exception as db_err:
                    print(f"Skipping row write error for {name}: {db_err}")
                    conn.rollback()
                    continue

        # Step 5: Map inventory states linking this computer to the master catalog entries
        for app_name in incoming_apps:
            master_id = known_apps_map.get(app_name)
            if not master_id:
                continue # Safety bypass for any missing allocations
            
            cursor.execute(
                """
                INSERT INTO machine_inventories (company_id, machine_id, master_app_id, last_scanned_at)
                VALUES (%s, %s, %s, %s)
                ON CONFLICT (machine_id, master_app_id) DO UPDATE
                SET last_scanned_at = EXCLUDED.last_scanned_at;
                """,
                (payload.company_id, payload.machine_id, master_id, datetime.utcnow())
            )

        conn.commit()
        cursor.close()
        conn.close()

        return {"status": "success", "message": f"Processed {len(incoming_apps)} apps successfully"}

    except Exception as general_err:
        print(f"Server-side failure crash log: {general_err}")
        raise HTTPException(status_code=500, detail=str(general_err))