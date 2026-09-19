import Link from "next/link"
import { BrandMark } from "@/components/brand-mark"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Activity,
  BarChart3,
  Boxes,
  ShieldCheck,
  TrendingDown,
  Workflow,
} from "lucide-react"

const features = [
  {
    icon: Boxes,
    title: "Automated Asset Discovery",
    description:
      "Lightweight audit agents scan every Windows and Linux endpoint, reporting installed software and versions back to your tenant in real time.",
  },
  {
    icon: ShieldCheck,
    title: "License Compliance Tracking",
    description:
      "Reconcile installations against purchased seats to surface unlicensed, over-licensed, and prohibited applications instantly.",
  },
  {
    icon: TrendingDown,
    title: "Cost Optimization",
    description:
      "Identify unused subscriptions and reclaim wasted spend with calculated savings estimates across your entire fleet.",
  },
  {
    icon: Activity,
    title: "Continuous Monitoring",
    description:
      "Always-on agents keep your inventory current, flagging risk-tier changes the moment new software appears on a machine.",
  },
  {
    icon: BarChart3,
    title: "Enterprise Analytics",
    description:
      "Rich dashboards turn raw inventory into the metrics IT leaders report on — devices monitored, assets audited, and open alerts.",
  },
  {
    icon: Workflow,
    title: "Effortless Onboarding",
    description:
      "Drop a single company-scoped agent script onto your machines and watch assets populate automatically — no manual entry.",
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <BrandMark />
          <div className="flex items-center gap-2">
            <Link href="/sign-in" className={buttonVariants({ variant: "ghost" })}>
              Login
            </Link>
            <Link href="/sign-up" className={buttonVariants()}>
              Login / Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 lg:px-8 lg:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
              Trusted Software Asset Management for modern IT teams
            </span>
            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Know exactly what software runs across your organization
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              LicenseAudit continuously discovers installed applications,
              reconciles them against your licenses, and shows compliance risk
              and savings in one enterprise dashboard.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/sign-up" className={buttonVariants({ size: "lg" })}>
                Login / Sign Up
              </Link>
              <Link
                href="/dashboard"
                className={buttonVariants({ size: "lg", variant: "outline" })}
              >
                View Live Dashboard
              </Link>
            </div>
          </div>
        </section>

        {/* Feature grid */}
        <section className="border-t border-border bg-card/40">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground">
                Everything you need to stay compliant
              </h2>
              <p className="mt-3 text-pretty text-muted-foreground">
                From discovery to optimization, LicenseAudit covers the full
                software asset lifecycle.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title} className="border-border/80 shadow-sm">
                  <CardHeader>
                    <span className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <feature.icon className="size-5" aria-hidden="true" />
                    </span>
                    <CardTitle className="mt-3 text-lg">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Card className="border-border/80 bg-card shadow-sm">
            <CardContent className="flex flex-col items-center gap-6 px-6 py-12 text-center lg:px-12">
              <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-foreground">
                Start auditing your software estate today
              </h2>
              <p className="max-w-xl text-pretty text-muted-foreground">
                Create your company workspace, deploy the audit agent, and see
                your first compliance report within minutes.
              </p>
              <Link href="/sign-up" className={buttonVariants({ size: "lg" })}>
                Login / Sign Up
              </Link>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
          <BrandMark subtitle="" />
          <p className="text-xs text-muted-foreground">
            {"\u00A9"} {new Date().getUTCFullYear()} LicenseAudit. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
