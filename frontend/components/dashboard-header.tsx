import { ShieldCheck } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="border-b border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <ShieldCheck className="size-5" aria-hidden="true" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-tight">LicenseAudit</p>
            <p className="text-xs text-sidebar-foreground/60">
              Software Asset Management
            </p>
          </div>
        </div>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <span className="font-medium text-sidebar-foreground">Dashboard</span>
          <span className="text-sidebar-foreground/60">Devices</span>
          <span className="text-sidebar-foreground/60">Software</span>
          <span className="text-sidebar-foreground/60">Reports</span>
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden text-right text-xs leading-tight sm:block">
            <span className="block font-medium text-sidebar-foreground">
              Acme Corp
            </span>
            <span className="block text-sidebar-foreground/60">IT Admin</span>
          </span>
          <span
            className="flex size-8 items-center justify-center rounded-full bg-sidebar-accent text-xs font-medium text-sidebar-accent-foreground"
            aria-hidden="true"
          >
            IA
          </span>
        </div>
      </div>
    </header>
  )
}
