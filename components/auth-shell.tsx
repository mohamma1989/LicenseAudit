import Link from "next/link"
import type { ReactNode } from "react"
import { BrandMark } from "@/components/brand-mark"

/**
 * Shared shell for the auth portal (Scenario B). Provides the split-panel
 * "premium auth provider" layout (à la Clerk / Kinde) that both the
 * <SignIn /> and <SignUp /> views render inside.
 */
export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string
  subtitle: string
  children: ReactNode
  footer: ReactNode
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand / value panel */}
      <aside className="relative hidden flex-col justify-between bg-sidebar p-10 text-sidebar-foreground lg:flex">
        <Link href="/">
          <BrandMark invert subtitle="Software Asset Management" />
        </Link>
        <div className="max-w-md">
          <p className="text-2xl font-medium leading-relaxed text-sidebar-foreground text-balance">
            {
              "\u201CLicenseAudit gave us a single source of truth for every application across 1,200 endpoints \u2014 and cut our license spend in the first quarter.\u201D"
            }
          </p>
          <p className="mt-4 text-sm text-sidebar-foreground/60">
            Director of IT Operations, enterprise customer
          </p>
        </div>
        <p className="text-xs text-sidebar-foreground/50">
          Secured by enterprise SSO. Each account is linked to a company
          workspace.
        </p>
      </aside>

      {/* Form panel */}
      <main className="flex flex-col items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <Link href="/">
              <BrandMark />
            </Link>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            {footer}
          </div>
        </div>
      </main>
    </div>
  )
}
