import winreg
import subprocess
import json
import socket
import urllib.request

# Configuration
SERVER_URL = "http://127.0.0.1:8000/api/upload_scan" # Change to your server IP later

def get_classic_apps():
    """Reads classic Win32 apps from the Windows Registry."""
    software_list = set()
    
    # We check both the 64-bit and 32-bit registry paths for the machine and the current user
    registry_paths = [
        (winreg.HKEY_LOCAL_MACHINE, r"SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall"),
        (winreg.HKEY_LOCAL_MACHINE, r"SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall"),
        (winreg.HKEY_CURRENT_USER, r"SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall")
    ]
    
    for hive, path in registry_paths:
        try:
            with winreg.OpenKey(hive, path) as key:
                for i in range(0, winreg.QueryInfoKey(key)[0]):
                    try:
                        subkey_name = winreg.EnumKey(key, i)
                        with winreg.OpenKey(key, subkey_name) as subkey:
                            try:
                                # We only want things that have an actual display name
                                app_name = winreg.QueryValueEx(subkey, "DisplayName")[0]
                                if app_name:
                                    software_list.add(app_name.strip())
                            except OSError:
                                pass
                    except OSError:
                        pass
        except OSError:
            pass
            
    return software_list

def get_store_apps():
    """Reads modern UWP apps (like Pinterest) from the Microsoft Store using PowerShell."""
    software_list = set()
    try:
        # Run PowerShell silently to get Appx packages
        command = 'powershell.exe -NoProfile -Command "Get-AppxPackage | Select-Object -ExpandProperty Name"'
        output = subprocess.check_output(command, text=True, stderr=subprocess.DEVNULL)
        
        # Clean up the output and add it to our list
        for line in output.split('\n'):
            clean_name = line.strip()
            if clean_name:
                software_list.add(clean_name)
    except Exception:
        pass
        
    return software_list

def send_to_server(hostname, software_list):
    """Packages the data as JSON and shoots it to your FastAPI backend."""
    payload = {
        "hostname": hostname,
        "os_type": "Windows",
        "software_list": software_list
    }
    
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(SERVER_URL, data=data, headers={'Content-Type': 'application/json'})
    
    try:
        response = urllib.request.urlopen(req)
        print(f"Success! Server response: {response.read().decode('utf-8')}")
    except Exception as e:
        print(f"Failed to send data: {e}")

if __name__ == "__main__":
    print("Gathering Windows software inventory...")
    hostname = socket.gethostname()
    
    # Merge both lists into one giant Set (which automatically removes duplicates)
    all_apps = set()
    all_apps.update(get_classic_apps())
    all_apps.update(get_store_apps())
    
    # Convert the set back to a normal Python list to send via JSON
    final_list = list(all_apps)
    
    print(f"Found {len(final_list)} total applications. Sending to LicenseAudit server...")
    send_to_server(hostname, final_list)