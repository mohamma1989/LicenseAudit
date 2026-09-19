"use client"

import { useState } from "react"
import { MetricsRow } from "@/components/metrics-row"
import { DevicesTable } from "@/components/devices-table"
import { SoftwareTable } from "@/components/software-table"
import { ReportsView } from "@/components/reports-view"
import { OnboardingScreen } from "@/components/onboarding-screen"
import {
  DashboardHeader,
  type DashboardTab,
} from "@/components/dashboard-header"
import { useDashboard } from "@/hooks/use-dashboard"
import { isDashboardEmpty } from "@/lib/api"
import type { DashboardData } from "@/lib/types"
import { RefreshCw } from "lucide-react"

/**
 * Top-level authed shell. Owns the active-tab state (Scenario D) and decides
 * between the onboarding screen (Scenario C) and the analytics dashboard based
 * on whether the live FastAPI payload contains any assets.
 */
export function DashboardClient({
  initialData,
  companyId,
}: {
  initialData: DashboardData
  companyId: string
}) {
  const [activeTab, setActiveTab] = useState<DashboardTab>("Dashboard")
  const { data, isValidating } = useDashboard(initialData)
  const dashboard = data ?? initialData
  const empty = isDashboardEmpty(dashboard)

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {empty ? (
          <OnboardingScreen companyId={companyId} />
        ) : (
          <DashboardBody
            data={dashboard}
            activeTab={activeTab}
            isValidating={isValidating}
          />
        )}
      </main>
    </div>
  )
}

function DashboardBody({
  data,
  activeTab,
  isValidating,
}: {
  data: DashboardData
  activeTab: DashboardTab
  isValidating: boolean
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            {activeTab === "Reports" ? "Reports" : "Audit Overview"}
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

      {activeTab === "Dashboard" && (
        <>
          <MetricsRow metrics={data.metrics} />
          <div className="grid grid-cols-1 gap-6">
            <DevicesTable devices={data.devices} />
            <SoftwareTable software={data.software} />
          </div>
        </>
      )}

      {activeTab === "Devices" && <DevicesTable devices={data.devices} />}

      {activeTab === "Software" && <SoftwareTable software={data.software} />}

      {activeTab === "Reports" && <ReportsView data={data} />}
    </div>
  )
}
