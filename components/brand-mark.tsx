import { ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Reusable LicenseAudit brand mark. Used across the marketing nav, auth portal,
 * and the dashboard header for a cohesive identity.
 */
export function BrandMark({
  className,
  subtitle = "Software Asset Management",
  invert = false,
}: {
  className?: string
  subtitle?: string
  invert?: boolean
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "flex size-8 items-center justify-center rounded-md",
          invert
            ? "bg-sidebar-primary text-sidebar-primary-foreground"
            : "bg-primary text-primary-foreground",
        )}
      >
        <ShieldCheck className="size-5" aria-hidden="true" />
      </span>
      <div className="leading-tight">
        <p className="text-sm font-semibold tracking-tight text-foreground">
          LicenseAudit
        </p>
        {subtitle ? (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
    </div>
  )
}
