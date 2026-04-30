import subprocess
import json
import socket
import urllib.request

# Configuration
SERVER_URL = "http://192.168.1.21:8000/api/upload_scan"

def run_command(command):
    """Runs a terminal command and returns the output as a list of strings."""
    try:
        # Run the command and capture the output
        output = subprocess.check_output(command, text=True, stderr=subprocess.DEVNULL)
        # Split by newlines and remove empty strings
        return [line.strip() for line in output.split('\n') if line.strip()]
    except FileNotFoundError:
        # The package manager isn't installed on this OS, ignore it
        return []
    except subprocess.CalledProcessError:
        # Command failed to run, ignore it
        return []

def get_installed_software():
    software_set = set()

    # 1. Check Debian/Ubuntu/Mint (dpkg)
    debian_apps = run_command(['dpkg-query', '-f', '${binary:Package}\n', '-W'])
    software_set.update(debian_apps)

    # 2. Check RedHat/CentOS/Fedora (rpm)
    redhat_apps = run_command(['rpm', '-qa', '--queryformat', '%{NAME}\n'])
    software_set.update(redhat_apps)

    # 3. Check Snaps (Universal)
    snap_apps = run_command(['snap', 'list'])
    # Snaps have headers, so we skip the first line and grab the first column
    if snap_apps:
        software_set.update([line.split()[0] for line in snap_apps[1:]])

    # Convert the set (which automatically removes duplicates) back to a list
    return list(software_set)

def send_to_server(hostname, software_list):
    payload = {
        "hostname": hostname,
        "os_type": "Linux",
        "software_list": software_list
    }
    
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(SERVER_URL, data=data, headers={'Content-Type': 'application/json'})
    
    try:
        response = urllib.request.urlopen(req)
        print(f"Success: {response.read().decode('utf-8')}")
    except Exception as e:
        print(f"Failed to send data: {e}")

if __name__ == "__main__":
    print("Gathering Linux software inventory...")
    hostname = socket.gethostname()
    apps = get_installed_software()
    
    print(f"Found {len(apps)} installed packages. Sending to LicenseAudit server...")
    send_to_server(hostname, apps)