import subprocess
import json
import socket
import urllib.request
import urllib.error
import os

# Configuration
SERVER_URL = "https://licenseaudit.onrender.com/api/upload_scan"

def get_debian_apps():
    """Fetches native apps on Debian/Ubuntu/Mint using dpkg-query."""
    apps = {}
    if os.path.exists("/usr/bin/dpkg-query"):
        try:
            # Output format: Package_Name|Version
            cmd = "dpkg-query -W -f='${Package}|${Version}\n'"
            output = subprocess.check_output(cmd, shell=True, text=True, stderr=subprocess.DEVNULL)
            for line in output.split("\n"):
                if "|" in line:
                    name, version = line.strip().split("|", 1)
                    # Filter out tiny internal library components to keep data clean
                    if name.startswith("lib") or "-dev" in name or ":amd64" in name:
                        continue
                    apps[name] = version
        except Exception:
            pass
    return apps

def get_redhat_apps():
    """Fetches native apps on Fedora/Red Hat/CentOS using rpm."""
    apps = {}
    if os.path.exists("/usr/bin/rpm"):
        try:
            # Output format: Package_Name|Version
            cmd = "rpm -qa --qf '%{NAME}|%{VERSION}\n'"
            output = subprocess.check_output(cmd, shell=True, text=True, stderr=subprocess.DEVNULL)
            for line in output.split("\n"):
                if "|" in line:
                    name, version = line.strip().split("|", 1)
                    if name.startswith("lib") or "-devel" in name:
                        continue
                    apps[name] = version
        except Exception:
            pass
    return apps

def get_snap_apps():
    """Fetches modern containerized apps via Snap."""
    apps = {}
    if os.path.exists("/usr/bin/snap"):
        try:
            # snap list outputs columns; skip the header line
            output = subprocess.check_output(["snap", "list"], text=True, stderr=subprocess.DEVNULL)
            lines = output.strip().split("\n")
            if len(lines) > 1:
                for line in lines[1:]:
                    parts = line.split()
                    if len(parts) >= 2:
                        name, version = parts[0], parts[1]
                        # Append (Snap) so the admin knows the environment tracking medium
                        apps[f"{name} (Snap)"] = version
        except Exception:
            pass
    return apps

def get_flatpak_apps():
    """Fetches modern sandboxed apps via Flatpak."""
    apps = {}
    if os.path.exists("/usr/bin/flatpak"):
        try:
            # Output format: Application_ID|Version
            cmd = "flatpak list --columns=application,version"
            output = subprocess.check_output(cmd, shell=True, text=True, stderr=subprocess.DEVNULL)
            for line in output.strip().split("\n"):
                parts = line.split()
                if len(parts) >= 1:
                    name = parts[0]
                    version = parts[1] if len(parts) > 1 else "Unknown"
                    apps[f"{name} (Flatpak)"] = version
        except Exception:
            pass
    return apps

def send_to_server(machine_id, software_data):
    """Packages the data and transmits it to your FastAPI pipeline on Render."""
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
        body = e.read().decode("utf-8", errors="replace")
        print(f"Failed to send data: HTTP {e.code} {e.reason}")
        print(f"Server said: {body}")
        return False
    except Exception as e:
        print(f"Failed to send data: {e}")
        return False

if __name__ == "__main__":
    print("Gathering Linux software inventory with exact version hashes...")
    machine_id = socket.gethostname()
    
    all_software_data = {}
    
    # Run targeted collection checks (Safe: missing binaries exit gracefully)
    all_software_data.update(get_debian_apps())
    all_software_data.update(get_redhat_apps())
    all_software_data.update(get_snap_apps())
    all_software_data.update(get_flatpak_apps())
    
    print(f"Found {len(all_software_data)} total assets. Sending to LicenseAudit server...")
    
    if all_software_data:
        send_to_server(machine_id, all_software_data)
    else:
        print("Error: No applications could be found on this system configuration.")