"use client"

import { MetricsRow } from "@/components/metrics-row"
import { DevicesTable } from "@/components/devices-table"
import { SoftwareTable } from "@/components/software-table"
import { useDashboard } from "@/hooks/use-dashboard"
import type { DashboardData } from "@/lib/types"
import { RefreshCw } from "lucide-react"

/**
 * Client dashboard body. Seeded with server-fetched `initialData` for instant
 * paint, then kept live by SWR (which calls /api/dashboard -> FastAPI).
 */
export function DashboardClient({
  initialData,
}: {
  initialData: DashboardData
}) {
  const { data, isValidating } = useDashboard(initialData)
  const dashboard = data ?? initialData

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Audit Overview
          </h1>
          <p className="text-sm text-muted-foreground">
            Real-time view of monitored devices and software compliance.
          </p>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <RefreshCw
            className={`size-3.5 ${isValidating ? "animate-spin" : ""}`}
            aria-hidden="true"
          />
          {isValidating ? "Syncing..." : "Up to date"}
        </span>
      </div>

      <MetricsRow metrics={dashboard.metrics} />

      <div className="grid grid-cols-1 gap-6">
        <DevicesTable devices={dashboard.devices} />
        <SoftwareTable software={dashboard.software} />
      </div>
    </div>
  )
}
