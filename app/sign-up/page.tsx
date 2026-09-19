import Link from "next/link"
import type { Metadata } from "next"
import { AuthShell } from "@/components/auth-shell"
import { SignUp } from "@/components/sign-up"

export const metadata: Metadata = {
  title: "Sign up — LicenseAudit",
}

export default function SignUpPage() {
  return (
    <AuthShell
      title="Create your workspace"
      subtitle="Set up your company account and start auditing in minutes."
      footer={
        <>
          {"Already have an account? "}
          <Link href="/sign-in" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <SignUp />
    </AuthShell>
  )
}
