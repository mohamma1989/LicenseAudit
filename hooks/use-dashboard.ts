"use client"

import useSWR from "swr"
import type { DashboardData } from "@/lib/types"

const fetcher = async (url: string): Promise<DashboardData> => {
  const res = await fetch(url)
  if (!res.ok) throw new Error("Failed to load dashboard data")
  return res.json()
}

/**
 * Client-side data hook (SWR).
 *
 * The dashboard page renders with server-fetched data for fast first paint,
 * then `fallbackData` seeds SWR so this hook can keep the tables live
 * (refetch on focus / interval) without a flash of loading state.
 *
 * It hits the `/api/dashboard` route handler, which in turn calls FastAPI.
 */
export function useDashboard(fallbackData?: DashboardData) {
  return useSWR<DashboardData>("/api/dashboard", fetcher, {
    fallbackData,
    revalidateOnFocus: false,
    // refreshInterval: 60_000, // uncomment to poll FastAPI every 60s
  })
}
