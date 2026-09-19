import { DashboardClient } from "@/components/dashboard-client"
import { getDashboardData, DEFAULT_COMPANY_ID } from "@/lib/api"

/**
 * Authed dashboard entry point (Scenarios C & D).
 *
 * Data is fetched on the server via the live FastAPI integration layer. If the
 * backend is unreachable or returns no inventory, `getDashboardData` resolves
 * to an empty (but valid) payload, and the client renders the onboarding
 * screen instead of crashing.
 */
export default async function DashboardPage() {
  const companyId = DEFAULT_COMPANY_ID
  const data = await getDashboardData(companyId)

  return <DashboardClient initialData={data} companyId={companyId} />
}
