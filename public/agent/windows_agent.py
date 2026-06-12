"""
LicenseAudit — Windows Data Collection Agent
============================================

Scans installed software from the Windows Registry (both 32-bit and 64-bit
uninstall hives), normalizes it into a clean JSON payload, and POSTs it to the
LicenseAudit FastAPI ingestion endpoint.

Standard library only (winreg, json, socket, platform) plus `requests`.

    pip install requests

Run:
    python windows_agent.py
"""

from __future__ import annotations

import json
import platform
import socket
from datetime import datetime, timezone
from typing import Any

import requests

try:
    import winreg  # type: ignore  # Windows-only
except ImportError:  # pragma: no cover - allows linting on non-Windows hosts
    winreg = None  # type: ignore

# --- Configuration ----------------------------------------------------------
INGEST_URL = "https://api.getlicenseaudit.com/v1/ingest"
# Per-organization key issued in the LicenseAudit dashboard. Prefer reading
# this from an environment variable or a secured config file in production.
API_KEY = "REPLACE_WITH_YOUR_ORG_API_KEY"
REQUEST_TIMEOUT = 30  # seconds

# Registry locations that hold installed-program metadata.
UNINSTALL_KEYS = [
    # 64-bit applications on 64-bit Windows
    (r"SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall", "HKLM_64"),
    # 32-bit applications on 64-bit Windows (WOW6432Node)
    (r"SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall", "HKLM_32"),
    # Per-user installs
    (r"SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall", "HKCU"),
]


def _read_value(handle: Any, name: str) -> str | None:
    """Read a single registry value, returning None if it does not exist."""
    try:
        value, _ = winreg.QueryValueEx(handle, name)
        return str(value).strip() if value not in (None, "") else None
    except (FileNotFoundError, OSError):
        return None


def _normalize_install_date(raw: str | None) -> str | None:
    """Convert the registry's YYYYMMDD InstallDate to ISO-8601 (YYYY-MM-DD)."""
    if not raw or not raw.isdigit() or len(raw) != 8:
        return raw
    try:
        return datetime.strptime(raw, "%Y%m%d").date().isoformat()
    except ValueError:
        return raw


def scan_registry() -> list[dict[str, Any]]:
    """Enumerate installed applications across all uninstall hives."""
    if winreg is None:
        raise RuntimeError("winreg is unavailable; this agent must run on Windows.")

    applications: list[dict[str, Any]] = []
    seen: set[tuple[str, str | None]] = set()

    for subkey_path, scope in UNINSTALL_KEYS:
        root = winreg.HKEY_CURRENT_USER if scope == "HKCU" else winreg.HKEY_LOCAL_MACHINE
        try:
            base_key = winreg.OpenKey(root, subkey_path)
        except (FileNotFoundError, OSError):
            # Hive may not exist (e.g. WOW6432Node on 32-bit Windows). Skip it.
            continue

        with base_key:
            index = 0
            while True:
                try:
                    entry_name = winreg.EnumKey(base_key, index)
                except OSError:
                    break  # No more subkeys
                index += 1

                try:
                    with winreg.OpenKey(base_key, entry_name) as entry:
                        display_name = _read_value(entry, "DisplayName")
                        if not display_name:
                            # Skip patches/updates with no friendly name.
                            continue

                        display_version = _read_value(entry, "DisplayVersion")
                        install_date = _normalize_install_date(
                            _read_value(entry, "InstallDate")
                        )

                        dedupe_key = (display_name, display_version)
                        if dedupe_key in seen:
                            continue
                        seen.add(dedupe_key)

                        applications.append(
                            {
                                "DisplayName": display_name,
                                "DisplayVersion": display_version,
                                "InstallDate": install_date,
                            }
                        )
                except OSError:
                    # Corrupt or access-denied subkey — log and continue gracefully.
                    continue

    return applications


def build_payload(applications: list[dict[str, Any]]) -> dict[str, Any]:
    """Wrap the scanned applications in the standard ingestion envelope."""
    return {
        "device_name": socket.gethostname(),
        "os": "Windows",
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
          f"{len(payload['applications'])} applications reported.")


def main() -> None:
    try:
        applications = scan_registry()
        payload = build_payload(applications)
        send_payload(payload)
    except requests.RequestException as exc:
        print(f"[LicenseAudit] Network error sending inventory: {exc}")
    except Exception as exc:  # noqa: BLE001 - agent must never crash the host
        print(f"[LicenseAudit] Unexpected error: {exc}")


if __name__ == "__main__":
    main()
