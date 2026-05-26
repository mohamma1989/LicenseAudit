import winreg
import subprocess
import json
import socket
import urllib.request
import urllib.error
import tkinter as tk
from tkinter import messagebox

# Configuration
SERVER_URL = "https://licenseaudit.onrender.com/api/upload_scan"

def get_classic_apps():
    """Reads classic Win32 apps from the Windows Registry."""
    software_list = set()
    
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
                                # Skip hidden system dependencies
                                try:
                                    is_system = winreg.QueryValueEx(subkey, "SystemComponent")[0]
                                    if is_system == 1:
                                        continue
                                except OSError:
                                    pass

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
    """Reads modern UWP apps, filtering out core system frameworks."""
    software_list = set()
    try:
        command = 'powershell.exe -NoProfile -Command "Get-AppxPackage | Where-Object { -not $_.IsFramework -and $_.NonRemovable -eq $false } | Select-Object -ExpandProperty Name"'
        output = subprocess.check_output(command, text=True, stderr=subprocess.DEVNULL)
        
        for line in output.split('\n'):
            clean_name = line.strip()
            # Skip raw internal Microsoft package names that slip through
            if clean_name and not clean_name.startswith("Microsoft.Windows.") and not clean_name.startswith("Windows."):
                software_list.add(clean_name)
    except Exception:
        pass
        
    return software_list

def send_to_server(machine_id, software_list):
    """Packages the data as JSON matching the Master Architecture."""
    payload = {
        "company_id": "mohammad_corp_test",  
        "machine_id": machine_id,            
        "software_list": list(software_list)
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
    print("Gathering Windows software inventory...")
    machine_id = socket.gethostname()
    
    all_apps = set()
    all_apps.update(get_classic_apps())
    all_apps.update(get_store_apps())
    
    print(f"Found {len(all_apps)} total applications. Sending to LicenseAudit server...")
    success = send_to_server(machine_id, all_apps)
    
    # Show dialog based on result
    root = tk.Tk()
    root.withdraw()  # Hide the main window
    
    if success:
        messagebox.showinfo("Status", "200\nSuccessfully")
    else:
        messagebox.showerror("Status", "Wrong")
    
    root.destroy()