import os
import json
import socket
import urllib.request

# Configuration
SERVER_URL = "https://licenseaudit.onrender.com/api/upload_scan" #server IP


def get_installed_software():
    software_set = set()

    # These are the 3 standard locations where Linux stores "Start Menu" app shortcuts
    desktop_dirs = [
        "/usr/share/applications",  # System-wide apt/dpkg apps
        "/var/lib/snapd/desktop/applications",  # Snap apps
        os.path.expanduser(
            "~/.local/share/applications"
        ),  # User-specific flatpaks/apps
    ]

    for directory in desktop_dirs:
        if not os.path.exists(directory):
            continue

        for filename in os.listdir(directory):
            if filename.endswith(".desktop"):
                filepath = os.path.join(directory, filename)
                try:
                    # Open the file and find the actual human-readable name
                    with open(filepath, "r", encoding="utf-8") as f:
                        for line in f:
                            # We strictly want the default "Name=" line, not the translated ones like "Name[fr]="
                            if line.startswith("Name="):
                                clean_name = line.strip().split("=", 1)[1]
                                software_set.add(clean_name)
                                break  # Stop reading the file once we find the name
                except Exception:
                    pass

    return list(software_set)


def send_to_server(hostname, software_list):
    payload = {"hostname": hostname, "os_type": "Linux", "software_list": software_list}

    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        SERVER_URL, data=data, headers={"Content-Type": "application/json"}
    )

    try:
        response = urllib.request.urlopen(req)
        print(f"Success! Server response: {response.read().decode('utf-8')}")
    except Exception as e:
        print(f"Failed to send data: {e}")


if __name__ == "__main__":
    print("Gathering Linux software inventory...")
    hostname = socket.gethostname()
    apps = get_installed_software()

    print(f"Found {len(apps)} real applications. Sending to LicenseAudit server...")
    send_to_server(hostname, apps)
