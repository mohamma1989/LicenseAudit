import platform
import subprocess
import json
import urllib.request
import urllib.error


def get_linux_software():
    """Scans Debian/Ubuntu/Mint systems using dpkg"""
    try:
        result = subprocess.run(
            ["dpkg-query", "-W", "-f=${binary:Package}\n"],
            capture_output=True,
            text=True,
        )
        packages = result.stdout.strip().split("\n")
        return [pkg for pkg in packages if pkg]
    except Exception as e:
        print(f"Error reading Linux packages: {e}")
        return []


def get_windows_software():
    """Scans Windows Registry for installed software"""
    software_list = set()
    import winreg

    # We must check System-wide (HKLM) AND User-specific (HKCU) installs
    hives = [
        (
            winreg.HKEY_LOCAL_MACHINE,
            r"SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall",
        ),
        (
            winreg.HKEY_LOCAL_MACHINE,
            r"SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall",
        ),
        (
            winreg.HKEY_CURRENT_USER,
            r"SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall",
        ),
    ]

    for hive, path in hives:
        try:
            # Open the registry folder
            registry_key = winreg.OpenKey(hive, path, 0, winreg.KEY_READ)

            # Count how many programs are installed in this folder
            num_subkeys = winreg.QueryInfoKey(registry_key)[0]

            for i in range(num_subkeys):
                try:
                    # Open each specific program's folder
                    subkey_name = winreg.EnumKey(registry_key, i)

                    # THE FIX: Just look for the subkey name, don't duplicate the path!
                    subkey = winreg.OpenKey(registry_key, subkey_name)

                    # Grab the "DisplayName" (e.g., "Python 3.12")
                    display_name = winreg.QueryValueEx(subkey, "DisplayName")[0]
                    software_list.add(display_name.strip())
                except OSError:
                    # Some system components hide their names; we just skip them
                    continue
        except Exception as e:
            # If a path doesn't exist, just skip it quietly
            continue

    return list(software_list)


def main():
    os_type = platform.system()
    hostname = platform.node()
    software = []

    # 1. The Traffic Cop: Which OS are we on?
    if os_type == "Linux":
        print("🐧 Linux detected. Scanning dpkg...")
        software = get_linux_software()
    elif os_type == "Windows":
        print("🪟 Windows detected. Scanning Registry...")
        software = get_windows_software()
    else:
        print(f"❌ OS {os_type} not supported yet.")
        return

    # 2. Build the Payload
    payload = {"hostname": hostname, "os_type": os_type, "software_list": software}

    # 3. Send it to the server
    # NOTE: We use standard urllib so the agent doesn't require pip installs!
    url = "http://192.168.1.21:8000/api/upload_scan"

    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url, data=data, headers={"Content-Type": "application/json"}
    )

    try:
        urllib.request.urlopen(req)
        print(f"✅ Success! Sent {len(software)} packages to the server.")
    except Exception as e:
        print(f"🚨 Failed to send data: {e}")


if __name__ == "__main__":
    main()
