"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ComplianceBadge } from "@/components/status-badges"
import type { DashboardData, ComplianceStatus } from "@/lib/types"

function formatNumber(n: number) {
  return new Intl.NumberFormat("en-US").format(n)
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n)
}

/**
 * Reports view — a summarized compliance breakdown derived entirely from the
 * live dashboard payload (no extra fetch needed).
 */
export function ReportsView({ data }: { data: DashboardData }) {
  const statuses: ComplianceStatus[] = [
    "Compliant",
    "Over-licensed",
    "Unlicensed",
  ]

  const byStatus = statuses.map((status) => {
    const apps = data.software.filter((s) => s.complianceStatus === status)
    const installs = apps.reduce((sum, s) => sum + s.totalInstallations, 0)
    return { status, count: apps.length, installs }
  })

  const totalApps = data.software.length || 1

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Compliance Reports
        </h2>
        <p className="text-sm text-muted-foreground">
          Summary of license posture across your audited software estate.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {byStatus.map(({ status, count, installs }) => (
          <Card key={status} className="border-border/80 shadow-sm">
            <CardHeader className="pb-2">
              <ComplianceBadge status={status} />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold tracking-tight text-foreground tabular-nums">
                {formatNumber(count)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                applications · {formatNumber(installs)} installations
              </p>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${(count / totalApps) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/80 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Estimated Savings Opportunity</CardTitle>
          <CardDescription>
            Reclaimable spend from unused and over-licensed applications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-semibold tracking-tight text-success tabular-nums">
            {formatCurrency(data.metrics.potentialSavings)}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Based on {formatNumber(data.metrics.complianceAlerts)} open
            compliance alerts across {formatNumber(data.metrics.totalDevices)}{" "}
            monitored devices.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
