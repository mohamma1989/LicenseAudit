"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"
import { Check, Copy, Download, Terminal } from "lucide-react"

/**
 * First-time admin onboarding (Scenario C). Rendered only when the backend
 * returns zero assets for the tenant. Surfaces the company-scoped audit agent
 * install snippet so the admin can start collecting inventory.
 */
export function OnboardingScreen({ companyId }: { companyId: string }) {
  const [copied, setCopied] = useState(false)

  const installSnippet = `# LicenseAudit Agent — company: ${companyId}
export LICENSEAUDIT_COMPANY_ID="${companyId}"
curl -fsSL https://api.getlicenseaudit.com/install.sh | sudo -E bash`

  async function copySnippet() {
    try {
      await navigator.clipboard.writeText(installSnippet)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.log("[v0] clipboard copy failed:", (error as Error).message)
    }
  }

  return (
    <div className="mx-auto max-w-2xl py-10">
      <div className="text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Terminal className="size-6" aria-hidden="true" />
        </span>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-foreground text-balance">
          Welcome — let&apos;s collect your first assets
        </h1>
        <p className="mx-auto mt-2 max-w-md text-pretty text-muted-foreground">
          No inventory has been reported yet. Install the audit agent on your
          machines and they&apos;ll appear here automatically within minutes.
        </p>
      </div>

      <Card className="mt-8 border-border/80 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Download className="size-4 text-primary" aria-hidden="true" />
            Download Audit Agent Script
          </CardTitle>
          <CardDescription>
            This snippet is scoped to your company ID, so reported assets land in
            your workspace automatically.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="relative">
            <pre className="overflow-x-auto rounded-lg border border-border bg-muted/50 p-4 pr-12 font-mono text-xs leading-relaxed text-foreground">
              {installSnippet}
            </pre>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={copySnippet}
              className="absolute right-2 top-2 size-8"
              aria-label="Copy install snippet"
            >
              {copied ? (
                <Check className="size-4 text-success" aria-hidden="true" />
              ) : (
                <Copy className="size-4" aria-hidden="true" />
              )}
            </Button>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="/agent/linux_agent.py"
              download
              className={buttonVariants({ className: "flex-1" })}
            >
              <Download className="size-4" aria-hidden="true" />
              Linux agent (.py)
            </a>
            <a
              href="/agent/windows_agent.py"
              download
              className={buttonVariants({ variant: "outline", className: "flex-1" })}
            >
              <Download className="size-4" aria-hidden="true" />
              Windows agent (.py)
            </a>
          </div>

          <p className="text-xs text-muted-foreground">
            Company ID:{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground">
              {companyId}
            </code>
          </p>
        </CardContent>
      </Card>

      <ol className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          "Copy the company-scoped install command above.",
          "Run it on each Windows or Linux machine you manage.",
          "Refresh — your devices and software populate automatically.",
        ].map((step, i) => (
          <li
            key={step}
            className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground"
          >
            <span className="mb-2 flex size-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              {i + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
    </div>
  )
}
