"""
LicenseAudit — Linux Data Collection Agent
==========================================

Detects the host package manager (dpkg for Debian/Ubuntu, rpm for
RHEL/Fedora/SUSE), lists installed packages, and emits the EXACT same JSON
payload structure as the Windows agent so the FastAPI backend has a single
ingestion contract.

Standard library only (subprocess, json, socket, platform) plus `requests`.

    pip install requests

Run:
    python3 linux_agent.py
"""

from __future__ import annotations

import json
import platform
import shutil
import socket
import subprocess
from datetime import datetime, timezone
from typing import Any

import requests

# --- Configuration ----------------------------------------------------------
INGEST_URL = "https://api.getlicenseaudit.com/v1/ingest"
API_KEY = "REPLACE_WITH_YOUR_ORG_API_KEY"
REQUEST_TIMEOUT = 30  # seconds


def _run(command: list[str]) -> str:
    """Run a shell command and return stdout, raising on failure."""
    result = subprocess.run(
        command,
        capture_output=True,
        text=True,
        timeout=60,
        check=True,
    )
    return result.stdout


def scan_dpkg() -> list[dict[str, Any]]:
    """Query installed packages on Debian/Ubuntu systems via dpkg-query."""
    # Tab-separated: name, version, install status. Newlines separate packages.
    output = _run(
        [
            "dpkg-query",
            "-W",
            "-f=${Package}\t${Version}\t${db:Status-Abbrev}\n",
        ]
    )
    apps: list[dict[str, Any]] = []
    for line in output.splitlines():
        parts = line.split("\t")
        if len(parts) < 2:
            continue
        name, version = parts[0].strip(), parts[1].strip()
        status = parts[2].strip() if len(parts) > 2 else ""
        # "ii" = installed/installed. Skip half-configured/removed entries.
        if status and not status.startswith("ii"):
            continue
        if name:
            apps.append(
                {
                    "DisplayName": name,
                    "DisplayVersion": version or None,
                    "InstallDate": None,  # dpkg does not record install date
                }
            )
    return apps


def scan_rpm() -> list[dict[str, Any]]:
    """Query installed packages on RHEL/Fedora/SUSE systems via rpm."""
    # %{INSTALLTIME:date} gives a parseable install timestamp.
    output = _run(
        [
            "rpm",
            "-qa",
            "--queryformat",
            "%{NAME}\t%{VERSION}-%{RELEASE}\t%{INSTALLTIME:date}\n",
        ]
    )
    apps: list[dict[str, Any]] = []
    for line in output.splitlines():
        parts = line.split("\t")
        if len(parts) < 2:
            continue
        name, version = parts[0].strip(), parts[1].strip()
        install_date = _normalize_rpm_date(parts[2].strip()) if len(parts) > 2 else None
        if name:
            apps.append(
                {
                    "DisplayName": name,
                    "DisplayVersion": version or None,
                    "InstallDate": install_date,
                }
            )
    return apps


def _normalize_rpm_date(raw: str) -> str | None:
    """Best-effort conversion of rpm's date string to an ISO-8601 date."""
    if not raw:
        return None
    for fmt in ("%a %d %b %Y %I:%M:%S %p %Z", "%a %b %d %H:%M:%S %Y"):
        try:
            return datetime.strptime(raw, fmt).date().isoformat()
        except ValueError:
            continue
    return raw  # Fall back to the raw string if the format is unexpected.


def scan_packages() -> list[dict[str, Any]]:
    """Pick the right package manager for the host and scan."""
    if shutil.which("dpkg-query"):
        return scan_dpkg()
    if shutil.which("rpm"):
        return scan_rpm()
    raise RuntimeError("No supported package manager (dpkg/rpm) found on this host.")


def build_payload(applications: list[dict[str, Any]]) -> dict[str, Any]:
    """Wrap scanned packages in the SAME envelope used by the Windows agent."""
    return {
        "device_name": socket.gethostname(),
        "os": "Linux",
        "os_version": platform.platform(),
        "scanned_at": datetime.now(timezone.utc).isoformat(),
        "applications": applications,
    }


def send_payload(payload: dict[str, Any]) -> None:
    """POST the payload to the FastAPI ingestion endpoint over HTTPS."""
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    }
    response = requests.post(
        INGEST_URL,
        data=json.dumps(payload),
        headers=headers,
        timeout=REQUEST_TIMEOUT,
    )
    response.raise_for_status()
    print(f"[LicenseAudit] Ingest OK ({response.status_code}) — "
          f"{len(payload['applications'])} packages reported.")


def main() -> None:
    try:
        applications = scan_packages()
        payload = build_payload(applications)
        send_payload(payload)
    except subprocess.CalledProcessError as exc:
        print(f"[LicenseAudit] Package manager error: {exc.stderr or exc}")
    except requests.RequestException as exc:
        print(f"[LicenseAudit] Network error sending inventory: {exc}")
    except Exception as exc:  # noqa: BLE001 - agent must never crash the host
        print(f"[LicenseAudit] Unexpected error: {exc}")


if __name__ == "__main__":
    main()
