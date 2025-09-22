import { FinancesSection } from '@/modules/networks/components/finances-section/finances-section'
import { HomepageBanner } from '@/modules/networks/components/homepage-banner'
import { PROPOSALS } from '@/modules/networks/components/proposals-section/mocks/proposals'
import ProposalsSection from '@/modules/networks/components/proposals-section/proposals-section'

export default function NetworkPage() {
  return (
    <main className="container mt-8 mb-8 flex flex-col gap-8">
      <HomepageBanner
        title="Sky DAO Dashboard"
        description="Welcome to the Sky Fusion Dashboard, your hub for key insights into Sky Ecosystem's finances, governance, teams, and roadmaps. Get up-to-date data and explore strategic developments to stay informed about Sky's progress and plans."
        isLoggedIn={true}
      />

      <ProposalsSection proposals={PROPOSALS} />
      <FinancesSection />
      <p className="text-muted-foreground sm:text-md mt-12 text-base">Coming soon</p>
    </main>
  )
}
