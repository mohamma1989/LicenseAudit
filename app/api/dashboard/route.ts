import { NextResponse } from "next/server"
import { getDashboardData, DEFAULT_COMPANY_ID } from "@/lib/api"

/**
 * Route handler that proxies the FastAPI dashboard endpoint.
 *
 * The client (see `useDashboard` hook) fetches `/api/dashboard` via SWR. This
 * server-side handler attaches secrets/tokens before calling FastAPI — keeping
 * the admin API token off the browser entirely. `getDashboardData` already
 * falls back to an empty (but valid) payload, so this route never 5xx's the UI.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const companyId = searchParams.get("company_id") ?? DEFAULT_COMPANY_ID
  const data = await getDashboardData(companyId)
  return NextResponse.json(data)
}
