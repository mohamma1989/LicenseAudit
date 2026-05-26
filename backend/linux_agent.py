import os
import json
import socket
import urllib.request
import urllib.error

# Configuration
SERVER_URL = "https://licenseaudit.onrender.com/api/upload_scan"

def get_installed_software():
    software_set = set()

    # These are the 3 standard locations where Linux stores "Start Menu" app shortcuts
    desktop_dirs = [
        "/usr/share/applications",              # System-wide apt/dpkg apps
        "/var/lib/snapd/desktop/applications",  # Snap apps
        os.path.expanduser("~/.local/share/applications"),  # User-specific flatpaks/apps
    ]

    for directory in desktop_dirs:
        if not os.path.exists(directory):
            continue

        for filename in os.listdir(directory):
            if filename.endswith(".desktop"):
                filepath = os.path.join(directory, filename)
                try:
                    with open(filepath, "r", encoding="utf-8") as f:
                        lines = f.readlines()
                    
                    # Skip hidden system utilities
                    if any("NoDisplay=true" in line for line in lines):
                        continue
                        
                    for line in lines:
                        if line.startswith("Name="):
                            clean_name = line.strip().split("=", 1)[1]
                            software_set.add(clean_name)
                            break  
                except Exception:
                    pass

    return list(software_set)

def send_to_server(machine_id, software_list):
    payload = {
        "company_id": "mohammad_corp_test",  # Identifies the client anchor context
        "machine_id": machine_id,            
        "software_list": software_list
    }

    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        SERVER_URL, data=data, headers={"Content-Type": "application/json"}
    )

    try:
        response = urllib.request.urlopen(req)
        print(f"Success! Server response: {response.read().decode('utf-8')}")
        return True
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        print(f"Failed to send data: HTTP {e.code} {e.reason}")
        print(f"Server said: {body}")
        return False
    except Exception as e:
        print(f"Failed to send data: {e}")
        return False

if __name__ == "__main__":
    print("Gathering Linux software inventory...")
    machine_id = socket.gethostname()  
    apps = get_installed_software()

    print(f"Found {len(apps)} applications. Sending to LicenseAudit server...")
    success = send_to_server(machine_id, apps)
    if not success:
        raise SystemExit(1)