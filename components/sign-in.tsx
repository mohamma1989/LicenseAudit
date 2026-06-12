"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

/**
 * <SignIn /> placeholder.
 *
 * This is a clean layout placeholder modelled on a premium auth provider
 * (Clerk / Kinde). Wire `handleSubmit` to your provider's hosted flow or SDK;
 * on success the authed user is linked to a `company_id` and routed to the
 * dashboard.
 */
export function SignIn() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    // TODO: replace with your auth provider's sign-in call. On success the
    // session carries the user's company_id used by the FastAPI queries.
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
          autoComplete="current-password"
        />
      </div>
      <Button type="submit" className="mt-2 w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </Button>
    </form>
  )
}
