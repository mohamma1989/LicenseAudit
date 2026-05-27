import subprocess
import json
import socket
import urllib.request
import urllib.error
import re

# Configuration
SERVER_URL = "https://licenseaudit.onrender.com/api/upload_scan"

def get_mac_apps():
    """Gathers all graphical application names and versions natively on macOS."""
    software_dict = {}
    try:
        # system_profiler extracts a structured text list of all installed apps
        # We target App Name and Version lines specifically
        cmd = ["system_profiler", "SPApplicationsDataType"]
        output = subprocess.check_output(cmd, text=True, stderr=subprocess.DEVNULL)
        
        current_app = None
        version_re = re.compile(r"Version:\s*(.+)")
        
        for line in output.split("\n"):
            # A line with text but no indentation means it's a new Application Name block
            if line and not line.startswith(" ") and ":" in line:
                current_app = line.split(":")[0].strip()
            
            # If we are inside an app block, look for its version sub-property
            elif current_app and "Version:" in line:
                match = version_re.search(line)
                if match:
                    version_string = match.group(1).strip()
                    # Filter out standard Apple system background entries to keep it light
                    if "com.apple." in version_string or "Internal" in version_string:
                        continue
                    
                    software_dict[current_app] = version_string
                    current_app = None # Reset for next application element
    except Exception:
        pass
        
    return software_dict

def send_to_server(machine_id, software_data):
    """Packages the data and transmits it to the LicenseAudit backend on Render."""
    payload = {
        "company_id": "mohammad_corp_test",
        "machine_id": machine_id,
        "software_data": software_data
    }
    
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(SERVER_URL, data=data, headers={'Content-Type': 'application/json'})
    
    try:
        response = urllib.request.urlopen(req)
        print(f"Success! Server response: {response.read().decode('utf-8')}")
        return True
    except urllib.error.HTTPError as e:
        print(f"Failed to send data: HTTP {e.code}")
        return False
    except Exception as e:
        print(f"Failed to send data: {e}")
        return False

if __name__ == "__main__":
    print("Gathering macOS software inventory...")
    machine_id = socket.gethostname()
    
    mac_software = get_mac_apps()
    print(f"Found {len(mac_software)} Apple workstation applications.")
    
    if mac_software:
        send_to_server(machine_id, mac_software)
    else:
        print("Error: No applications found or this system is not running macOS.")