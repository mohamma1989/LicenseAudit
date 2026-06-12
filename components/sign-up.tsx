"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

/**
 * <SignUp /> placeholder.
 *
 * Models a premium auth provider sign-up. The company name field is what links
 * the new admin user to a `company_id` row (the `companies` table) on the
 * backend; subsequent FastAPI queries are scoped to that tenant.
 */
export function SignUp() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    // TODO: replace with your auth provider's sign-up call, then POST the
    // company name to create/link a companies row and an admin_users record.
    setTimeout(() => router.push("/dashboard"), 700)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Button type="button" variant="outline" className="w-full" disabled>
        Continue with SSO
      </Button>
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="company" className="text-sm font-medium text-foreground">
          Company name
        </label>
        <Input id="company" required placeholder="Acme Corp" autoComplete="organization" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Work email
        </label>
        <Input
          id="email"
          type="email"
          required
          placeholder="you@company.com"
          autoComplete="email"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="password"
          className="text-sm font-medium text-foreground"
        >
          Password
        </label>
        <Input
          id="password"
          type="password"
          required
          placeholder="••••••••"
          autoComplete="new-password"
        />
      </div>
      <Button type="submit" className="mt-2 w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Creating workspace...
          </>
        ) : (
          "Create workspace"
        )}
      </Button>
    </form>
  )
}
