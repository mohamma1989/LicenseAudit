import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Monitor, Package, ShieldAlert, TrendingDown } from "lucide-react"
import type { DashboardMetrics } from "@/lib/types"

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

interface MetricItem {
  label: string
  value: string
  icon: typeof Monitor
  hint: string
  tone?: "default" | "alert" | "positive"
}

export function MetricsRow({ metrics }: { metrics: DashboardMetrics }) {
  const items: MetricItem[] = [
    {
      label: "Total Monitored Devices",
      value: formatNumber(metrics.totalDevices),
      icon: Monitor,
      hint: "Across all sites",
    },
    {
      label: "Software Assets Audited",
      value: formatNumber(metrics.totalSoftwareAssets),
      icon: Package,
      hint: "Unique installations discovered",
    },
    {
      label: "Compliance Alerts",
      value: formatNumber(metrics.complianceAlerts),
      icon: ShieldAlert,
      hint: "Require review",
      tone: "alert",
    },
    {
      label: "Potential Cost Savings",
      value: formatCurrency(metrics.potentialSavings),
      icon: TrendingDown,
      hint: "From unused & over-licensed apps",
      tone: "positive",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label} className="border-border/80 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-muted-foreground">
                {item.label}
              </p>
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-md",
                  item.tone === "alert" && "bg-destructive/10 text-destructive",
                  item.tone === "positive" && "bg-success/10 text-success",
                  (!item.tone || item.tone === "default") &&
                    "bg-primary/10 text-primary",
                )}
              >
                <item.icon className="size-5" aria-hidden="true" />
              </span>
            </div>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground tabular-nums">
              {item.value}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{item.hint}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
