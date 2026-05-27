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
    """Reads classic Win32 app names AND real versions from the Windows Registry."""
    software_dict = {}
    
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
                                # Skip completely hidden background subcomponents
                                try:
                                    is_system = winreg.QueryValueEx(subkey, "SystemComponent")[0]
                                    if is_system == 1:
                                        continue
                                except OSError:
                                    pass

                                app_name = winreg.QueryValueEx(subkey, "DisplayName")[0]
                                
                                # Extract the real machine version string natively
                                try:
                                    version = winreg.QueryValueEx(subkey, "DisplayVersion")[0]
                                except OSError:
                                    version = "Unknown"

                                if app_name and app_name.strip():
                                    software_dict[app_name.strip()] = str(version).strip()
                            except OSError:
                                pass
                    except OSError:
                        pass
        except OSError:
            pass
            
    return software_dict

def get_store_apps():
    """Reads modern UWP apps, dropping internal code runtimes but KEEPING Notepad/Calculator."""
    software_dict = {}
    try:
        # We fetch Name and Version string tokens using a clean PowerShell custom format array
        command = 'powershell.exe -NoProfile -Command "Get-AppxPackage | Where-Object { -not $_.IsFramework } | Select-Object Name, Version | ConvertTo-Json"'
        output = subprocess.check_output(command, text=True, stderr=subprocess.DEVNULL).strip()
        
        if output:
            parsed_packages = json.loads(output)
            
            # PowerShell ConvertTo-Json outputs a single dict if only 1 item exists, or a list if multiple items exist
            if isinstance(parsed_packages, dict):
                parsed_packages = [parsed_packages]
                
            for pkg in parsed_packages:
                raw_name = pkg.get("Name", "")
                version = pkg.get("Version", "Unknown")
                
                if not raw_name:
                    continue
                    
                # Skip hidden internal system dependencies that have no user UI interface
                if raw_name.startswith("Microsoft.VCLibs") or raw_name.startswith("Microsoft.NET."):
                    continue
                if "SecHealthUI" in raw_name or "波形" in raw_name:
                    continue
                    
                # Standardize displaying names nicely
                if raw_name == "Microsoft.WindowsNotepad":
                    clean_name = "Notepad (App)"
                elif raw_name == "Microsoft.WindowsCalculator":
                    clean_name = "Calculator"
                elif raw_name == "Microsoft.MSPaint":
                    clean_name = "Paint"
                else:
                    clean_name = raw_name
                    
                software_dict[clean_name] = str(version).strip()
    except Exception:
        pass
        
    return software_dict

def send_to_server(machine_id, software_data):
    """Packages the data as a clean dictionary matching our new backend contract schema."""
    payload = {
        "company_id": "mohammad_corp_test",  
        "machine_id": machine_id,            
        "software_data": software_data  # Changed from software_list to dictionary map
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
    print("Gathering Windows software inventory with real versions...")
    machine_id = socket.gethostname()
    
    # Combine everything into our dictionary map payload tracker
    all_software_data = {}
    
    # Merges items safely (UWP apps will override or supplement win32 arrays cleanly)
    all_software_data.update(get_classic_apps())
    all_software_data.update(get_store_apps())
    
    print(f"Found {len(all_software_data)} total applications. Sending to LicenseAudit server...")
    success = send_to_server(machine_id, all_software_data)
    
    # Show dialog box results notification anchor
    root = tk.Tk()
    root.withdraw() 
    
    if success:
        messagebox.showinfo("Status", "200\nSuccessfully")
    else:
        messagebox.showerror("Status", "Wrong")
        
    root.destroy()