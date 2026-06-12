import type { DashboardData, Device, SoftwareAsset } from "./types"

/**
 * ============================================================================
 *  LIVE FASTAPI INTEGRATION LAYER
 * ============================================================================
 *
 *  This module is the single place where the frontend talks to the hosted
 *  FastAPI backend. Every function performs a real network request against
 *  `${API_BASE_URL}` and reads the calculated Pydantic payload.
 *
 *  Backend endpoints:
 *    GET /v1/dashboard?company_id=...  -> { metrics, devices, software }
 *    GET /v1/devices?company_id=...    -> Device[]
 *    GET /v1/software?company_id=...   -> SoftwareAsset[]
 *
 *  Graceful fallback: if the server is unreachable / still spinning up, or it
 *  returns a non-OK status, every function resolves to an EMPTY tracking state
 *  instead of throwing — so the UI renders the onboarding screen rather than
 *  crashing.
 * ============================================================================
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.getlicenseaudit.com"

/** The active tenant. In production this comes from the authed session. */
export const DEFAULT_COMPANY_ID =
  process.env.NEXT_PUBLIC_DEFAULT_COMPANY_ID ?? "default_company"

/** A valid, fully-typed but empty payload used as a safe fallback. */
export const EMPTY_DASHBOARD: DashboardData = {
  metrics: {
    totalDevices: 0,
    totalSoftwareAssets: 0,
    complianceAlerts: 0,
    potentialSavings: 0,
  },
  devices: [],
  software: [],
}

/**
 * True when the backend has no inventory yet for this tenant — the trigger for
 * the first-time admin onboarding screen (Scenario C).
 */
export function isDashboardEmpty(data: DashboardData): boolean {
  return data.devices.length === 0 && data.software.length === 0
}

/** Builds the auth headers. Keep the admin token server-side only. */
function authHeaders(): HeadersInit {
  const token = process.env.LICENSEAUDIT_API_TOKEN
  return token ? { Authorization: `Bearer ${token}` } : {}
}

/**
 * Fetch the full dashboard payload (metrics + devices + software) for a tenant.
 * Returns EMPTY_DASHBOARD on any failure so callers never have to handle throws.
 */
export async function getDashboardData(
  companyId: string = DEFAULT_COMPANY_ID,
): Promise<DashboardData> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/v1/dashboard?company_id=${encodeURIComponent(companyId)}`,
      { headers: authHeaders(), cache: "no-store" },
    )
    if (!res.ok) {
      console.log("[v0] dashboard fetch non-OK:", res.status)
      return EMPTY_DASHBOARD
    }
    const json = (await res.json()) as Partial<DashboardData>
    // Defensive merge: tolerate partial payloads while the backend warms up.
    return {
      metrics: { ...EMPTY_DASHBOARD.metrics, ...json.metrics },
      devices: json.devices ?? [],
      software: json.software ?? [],
    }
  } catch (error) {
    console.log("[v0] dashboard fetch error:", (error as Error).message)
    return EMPTY_DASHBOARD
  }
}

export async function getDevices(
  companyId: string = DEFAULT_COMPANY_ID,
): Promise<Device[]> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/v1/devices?company_id=${encodeURIComponent(companyId)}`,
      { headers: authHeaders(), cache: "no-store" },
    )
    if (!res.ok) return []
    return (await res.json()) as Device[]
  } catch (error) {
    console.log("[v0] devices fetch error:", (error as Error).message)
    return []
  }
}

export async function getSoftware(
  companyId: string = DEFAULT_COMPANY_ID,
): Promise<SoftwareAsset[]> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/v1/software?company_id=${encodeURIComponent(companyId)}`,
      { headers: authHeaders(), cache: "no-store" },
    )
    if (!res.ok) return []
    return (await res.json()) as SoftwareAsset[]
  } catch (error) {
    console.log("[v0] software fetch error:", (error as Error).message)
    return []
  }
}
