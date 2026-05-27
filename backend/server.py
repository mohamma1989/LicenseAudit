import os
import json
from datetime import datetime
from typing import Dict
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
    for origin in os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173").split(",")
    if origin.strip()
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=_cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_URL = os.getenv("DATABASE_URL", "host=localhost dbname=licenseaudit user=postgres password=root")
openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY", "your-fallback-key-here"))

# --- Updated Data Contract to hold Version Data ---
class AgentPayload(BaseModel):
    company_id: str
    machine_id: str
    software_data: Dict[str, str]  # e.g., {"Google Chrome": "124.0.12", "uTorrent": "3.6.0"}

@app.post("/api/upload_scan")
async def upload_scan(payload: AgentPayload):
    # Step 1: Clean and extract incoming names
    incoming_apps = [name.strip() for name in payload.software_data.keys() if name.strip()]
    if not incoming_apps:
        return {"status": "success", "message": "No applications found to process"}

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Step 2: Query what we already know globally
        cursor.execute("SELECT id, app_name FROM master_apps WHERE app_name = ANY(%s);", (incoming_apps,))
        existing_rows = cursor.fetchall()
        known_apps_map = {row["app_name"].lower(): row["id"] for row in existing_rows}

        # Identify truly unseen apps for the AI
        missing_apps = [name for name in incoming_apps if name.lower() not in known_apps_map]

        # Step 3: Call AI Agent for classification metadata (Skip Version requests)
        if missing_apps:
            system_prompt = (
                "You are an enterprise Software Asset Management expert.\n"
                "Categorize the provided list of software names into a JSON object containing an array named 'apps'.\n"
                "Each object within 'apps' must strictly feature these single-letter keys:\n"
                "- 'n': The exact string of the app_name.\n"
                "- 'r': The risk tier as a single integer (0, 1, 2, or 3).\n"
                "- 't': The app_type category classification (string).\n\n"
                "Return absolutely zero conversational fluff. Only raw minified JSON."
            )

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

            # Step 4: Save metadata to Master table
            for item in ai_categorized_list:
                name = item.get("n")
                tier = item.get("r", 1)
                atype = item.get("t", "Unknown")
                if not name:
                    continue

                is_prohibited = atype.lower() in ["game", "p2p/torrent", "torrent", "p2p", "media downloader"]

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
                        (name, tier, atype, is_prohibited, datetime.utcnow())
                    )
                    new_id_row = cursor.fetchone()
                    if new_id_row:
                        known_apps_map[name.lower()] = new_id_row["id"]
                    cursor.execute("RELEASE SAVEPOINT app_insert_savepoint;")
                except Exception as db_err:
                    print(f"Skipping row write error for {name}: {db_err}")
                    cursor.execute("ROLLBACK TO SAVEPOINT app_insert_savepoint;")
                    continue

        # Step 5: Save REAL versions into machine inventory entries dynamically
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
                (payload.company_id, payload.machine_id, master_id, version_string or "Unknown", datetime.utcnow())
            )

        conn.commit()
        cursor.close()
        conn.close()
        return {"status": "success", "message": f"Processed {len(incoming_apps)} apps with real versions"}

    except Exception as general_err:
        raise HTTPException(status_code=500, detail=str(general_err))

def get_db_connection():
    return psycopg2.connect(DB_URL, cursor_factory=RealDictCursor)