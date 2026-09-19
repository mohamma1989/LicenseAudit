import Link from "next/link"
import type { Metadata } from "next"
import { AuthShell } from "@/components/auth-shell"
import { SignIn } from "@/components/sign-in"

export const metadata: Metadata = {
  title: "Sign in — LicenseAudit",
}

export default function SignInPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your company workspace to view compliance reports."
      footer={
        <>
          {"Don't have a workspace? "}
          <Link href="/sign-up" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </>
      }
    >
      <SignIn />
    </AuthShell>
  )
}
