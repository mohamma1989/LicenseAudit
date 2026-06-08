import type { DashboardData, Device, SoftwareAsset } from "./types"
import { mockDashboardData } from "./mock-data"

/**
 * ============================================================================
 *  FASTAPI INTEGRATION LAYER
 * ============================================================================
 *
 *  This module is the single place where the frontend talks to your hosted
 *  FastAPI backend. Right now every function returns mock data so the UI can
 *  render immediately. To go live, set NEXT_PUBLIC_API_BASE_URL and replace
 *  the `return mock...` lines with the `fetch()` calls shown in each TODO.
 *
 *  Recommended backend endpoints (adjust paths to match your API):
 *    GET /v1/dashboard          -> { metrics, devices, software }
 *    GET /v1/devices            -> Device[]
 *    GET /v1/software           -> SoftwareAsset[]
 *
 *  Auth: send the org/admin token via an Authorization header. Store it in an
 *  httpOnly cookie or a server-side session — never in NEXT_PUBLIC_* vars.
 * ============================================================================
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.getlicenseaudit.com"

/** Simulates network latency so loading states are visible in development. */
function delay<T>(value: T, ms = 600): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

/**
 * Fetch the full dashboard payload (metrics + devices + software).
 *
 * This is a server-friendly function: call it from a React Server Component
 * (e.g. directly inside an async `page.tsx`) for the best performance, or from
 * the client via SWR using the `/api/dashboard` route handler.
 */
export async function getDashboardData(): Promise<DashboardData> {
  // ----------------------------------------------------------------------
  // TODO: Replace the mock return below with a live call to FastAPI.
  //
  //   const res = await fetch(`${API_BASE_URL}/v1/dashboard`, {
  //     headers: { Authorization: `Bearer ${process.env.LICENSEAUDIT_API_TOKEN}` },
  //     // next: { revalidate: 60 }, // cache for 60s in an RSC
  //     cache: "no-store",
  //   })
  //   if (!res.ok) throw new Error(`Dashboard fetch failed: ${res.status}`)
  //   return (await res.json()) as DashboardData
  // ----------------------------------------------------------------------
  return delay(mockDashboardData)
}

export async function getDevices(): Promise<Device[]> {
  // TODO:
  //   const res = await fetch(`${API_BASE_URL}/v1/devices`, { cache: "no-store" })
  //   if (!res.ok) throw new Error(`Devices fetch failed: ${res.status}`)
  //   return (await res.json()) as Device[]
  return delay(mockDashboardData.devices)
}

export async function getSoftware(): Promise<SoftwareAsset[]> {
  // TODO:
  //   const res = await fetch(`${API_BASE_URL}/v1/software`, { cache: "no-store" })
  //   if (!res.ok) throw new Error(`Software fetch failed: ${res.status}`)
  //   return (await res.json()) as SoftwareAsset[]
  return delay(mockDashboardData.software)
}
