"use client"

import { BrandMark } from "@/components/brand-mark"

export const DASHBOARD_TABS = [
  "Dashboard",
  "Devices",
  "Software",
  "Reports",
] as const

export type DashboardTab = (typeof DASHBOARD_TABS)[number]

/**
 * Dashboard header with an interactive active-tab controller. The parent owns
 * the active tab state and receives changes via `onTabChange`.
 */
export function DashboardHeader({
  activeTab,
  onTabChange,
  companyName = "Acme Corp",
}: {
  activeTab: DashboardTab
  onTabChange: (tab: DashboardTab) => void
  companyName?: string
}) {
  return (
    <header className="border-b border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <BrandMark invert />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {DASHBOARD_TABS.map((tab) => {
            const isActive = tab === activeTab
            return (
              <button
                key={tab}
                type="button"
                onClick={() => onTabChange(tab)}
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? "rounded-md bg-sidebar-accent px-3 py-1.5 text-sm font-medium text-sidebar-accent-foreground"
                    : "rounded-md px-3 py-1.5 text-sm font-medium text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                }
              >
                {tab}
              </button>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden text-right text-xs leading-tight sm:block">
            <span className="block font-medium text-sidebar-foreground">
              {companyName}
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
