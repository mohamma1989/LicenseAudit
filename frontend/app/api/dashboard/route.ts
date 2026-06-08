import { NextResponse } from "next/server"
import { getDashboardData } from "@/lib/api"

/**
 * Route handler that proxies the FastAPI dashboard endpoint.
 *
 * The client (see `useDashboard` hook) fetches `/api/dashboard` via SWR, and
 * this server-side handler is where you attach secrets/tokens before calling
 * FastAPI — keeping the admin API token off the browser entirely.
 */
export async function GET() {
  try {
    const data = await getDashboardData()
    return NextResponse.json(data)
  } catch (error) {
    console.log("[v0] /api/dashboard error:", (error as Error).message)
    return NextResponse.json(
      { error: "Failed to load dashboard data" },
      { status: 502 },
    )
  }
}
