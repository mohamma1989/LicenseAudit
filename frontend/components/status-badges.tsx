import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { ComplianceStatus, DeviceStatus } from "@/lib/types"

export function ComplianceBadge({ status }: { status: ComplianceStatus }) {
  const styles: Record<ComplianceStatus, string> = {
    Compliant: "bg-success/10 text-success border-success/20",
    "Over-licensed": "bg-warning/15 text-warning-foreground border-warning/30",
    Unlicensed: "bg-destructive/10 text-destructive border-destructive/20",
  }
  return (
    <Badge variant="outline" className={cn("font-medium", styles[status])}>
      {status}
    </Badge>
  )
}

export function StatusBadge({ status }: { status: DeviceStatus }) {
  const isActive = status === "active"
  return (
    <span className="inline-flex items-center gap-2 text-sm">
      <span
        className={cn(
          "size-2 rounded-full",
          isActive ? "bg-success" : "bg-muted-foreground/40",
        )}
        aria-hidden="true"
      />
      <span className={cn(isActive ? "text-foreground" : "text-muted-foreground")}>
        {isActive ? "Active" : "Offline"}
      </span>
    </span>
  )
}
