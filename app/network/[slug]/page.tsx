import { BuildersSection } from '@/modules/networks/components/builders-section/builders-section'
import { FinancesSection } from '@/modules/networks/components/finances-section/finances-section'
import { GovernanceSection } from '@/modules/networks/components/governance-section/governance-section'
import { HomepageBanner } from '@/modules/networks/components/homepage-banner'
import { PROPOSALS } from '@/modules/networks/components/proposals-section/mocks/proposals'
import { ProposalsSection } from '@/modules/networks/components/proposals-section/proposals-section'
import { RoadmapSection } from '@/modules/networks/components/roadmap-section'
import { WALLETS } from '@/modules/networks/components/wallets-section/mocks/wallets'
import { WalletsSection } from '@/modules/networks/components/wallets-section/wallets-section'
import { mockedRoadmaps } from '@/modules/roadmap/mocks'
import { PageBackground } from '@/modules/shared/components/page-background'

export default function NetworkPage() {
  return (
    <PageBackground>
      <main className="container mt-8 mb-8 flex flex-col gap-8">
        <HomepageBanner
          title="Sky DAO Dashboard"
          description="Welcome to the Sky Fusion Dashboard, your hub for key insights into Sky Ecosystem's finances, governance, teams, and roadmaps. Get up-to-date data and explore strategic developments to stay informed about Sky's progress and plans."
          isLoggedIn={true}
        />
        <ProposalsSection proposals={PROPOSALS} />
        <RoadmapSection roadmaps={mockedRoadmaps} />
        <FinancesSection />
        <WalletsSection wallets={WALLETS} />
        <BuildersSection />
        <GovernanceSection />
        <p className="text-muted-foreground sm:text-md mt-12 text-base">Coming soon</p>
      </main>
    </PageBackground>
  )
}
