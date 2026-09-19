import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardClient } from "@/components/dashboard-client"
import { getDashboardData } from "@/lib/api"

/**
 * Server Component entry point.
 *
 * Data is fetched on the server via `getDashboardData()` (the FastAPI
 * integration layer in `lib/api.ts`) so the first render already contains
 * real data — great for SEO and perceived performance. The result is handed
 * to the client component, which keeps it live with SWR.
 */
export default async function DashboardPage() {
  const data = await getDashboardData()

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <DashboardClient initialData={data} />
      </main>
    </div>
  )
}
