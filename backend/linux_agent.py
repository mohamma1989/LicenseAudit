import os
import subprocess
import json
import socket
import urllib.request
import urllib.error
import re

# Configuration
SERVER_URL = "https://licenseaudit.onrender.com/api/upload_scan"

def get_package_version(pkg_name):
    """Helper to cleanly extract a native package version if available."""
    # Try Debian/Ubuntu/Mint dpkg
    if os.path.exists("/usr/bin/dpkg-query"):
        try:
            output = subprocess.check_output(
                f"dpkg-query -W -f='${{Version}}' {pkg_name} 2>/dev/null", 
                shell=True, text=True
            ).strip()
            if output:
                return output
        except Exception:
            pass
            
    # Try Fedora/RedHat rpm
    if os.path.exists("/usr/bin/rpm"):
        try:
            output = subprocess.check_output(
                f"rpm -q --qf '%{{VERSION}}' {pkg_name} 2>/dev/null", 
                shell=True, text=True
            ).strip()
            if output:
                return output
        except Exception:
            pass
            
    return "Unknown"

def get_desktop_apps():
    """Scans the Linux application menus for real human graphical apps."""
    apps = {}
    
    # Standard directories where launcher shortcut entries live on Linux
    desktop_dirs = [
        "/usr/share/applications",
        os.path.expanduser("~/.local/share/applications")
    ]
    
    # Regex rules to pull the exact display names out of the shortcut files
    name_re = re.compile(r"^Name=(.+)$", re.MULTILINE)
    
    for folder in desktop_dirs:
        if not os.path.exists(folder):
            continue
            
        for file_name in os.listdir(folder):
            if not file_name.endswith(".desktop"):
                continue
                
            file_path = os.path.join(folder, file_name)
            try:
                with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read()
                    
                # Skip helper shortcuts that don't actually display UI windows
                if "NoDisplay=true" in content or "Type=Link" in content:
                    continue
                    
                name_match = name_re.search(content)
                if name_match:
                    app_display_name = name_match.group(1).strip()
                    
                    # Deduce the package name from the filename to lookup version metadata
                    # e.g., google-chrome.desktop -> google-chrome
                    pkg_base_name = file_name.replace(".desktop", "")
                    
                    # Try to match standalone variations (like google-chrome-stable)
                    if "chrome" in pkg_base_name and not pkg_base_name.endswith("-stable"):
                        version = get_package_version(f"{pkg_base_name}-stable")
                    else:
                        version = get_package_version(pkg_base_name)
                        
                    # Save cleanly
                    apps[app_display_name] = version
            except Exception:
                pass
                
    return apps

def get_snap_apps():
    """Fetches human-installed Snap applications."""
    apps = {}
    if os.path.exists("/usr/bin/snap"):
        try:
            output = subprocess.check_output(["snap", "list"], text=True, stderr=subprocess.DEVNULL)
            lines = output.strip().split("\n")
            if len(lines) > 1:
                for line in lines[1:]:
                    parts = line.split()
                    if len(parts) >= 2:
                        name, version = parts[0], parts[1]
                        # Ignore core snap system tools that run invisibly in the back
                        if name in ["core", "core18", "core20", "core22", "core24", "snapd", "bare", "gtk-common-themes"]:
                            continue
                        apps[f"{name.title()} (Snap)"] = version
        except Exception:
            pass
    return apps

def get_flatpak_apps():
    """Fetches human-installed Flatpak applications."""
    apps = {}
    if os.path.exists("/usr/bin/flatpak"):
        try:
            # We fetch app identity names cleanly
            cmd = "flatpak list --columns=name,version"
            output = subprocess.check_output(cmd, shell=True, text=True, stderr=subprocess.DEVNULL)
            for line in output.strip().split("\n"):
                if not line or "Name" in line: # Skip header line block
                    continue
                parts = line.split("\t") # Flatpak list defaults to tab separation splits
                if len(parts) >= 1:
                    name = parts[0].strip()
                    version = parts[1].strip() if len(parts) > 1 and parts[1].strip() else "Unknown"
                    apps[f"{name} (Flatpak)"] = version
        except Exception:
            pass
    return apps

def send_to_server(machine_id, software_data):
    """Transmits the data directly to your optimized production server API endpoint."""
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
        print(f"Failed to send data: HTTP {e.code} {e.reason}")
        return False
    except Exception as e:
        print(f"Failed to send data: {e}")
        return False

if __name__ == "__main__":
    print("Gathering real graphical software applications on Linux...")
    machine_id = socket.gethostname()
    
    all_software_data = {}
    
    # Merge filtered launcher items, user snaps, and user flatpaks safely
    all_software_data.update(get_desktop_apps())
    all_software_data.update(get_snap_apps())
    all_software_data.update(get_flatpak_apps())
    
    print("\n================ LOCAL SCAN RESULTS ================")
    for app_name, version in sorted(all_software_data.items()):
        print(f"-> {app_name} | Version: {version}")
    print("====================================================\n")
    
    print(f"Found {len(all_software_data)} targeted application tools.")
    
    # Comment this out if you just want to run local view tests first!
    #send_to_server(machine_id, all_software_data)