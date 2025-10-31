import { BuildersSection } from '@/modules/networks/components/builders-section/builders-section'
import { FinancesSection } from '@/modules/networks/components/finances-section/finances-section'
import { GovernanceSection } from '@/modules/networks/components/governance-section/governance-section'
import { HomepageBanner } from '@/modules/networks/components/homepage-banner'
import { PROPOSALS } from '@/modules/networks/components/proposals-section/mocks/proposals'
import { ProposalsSection } from '@/modules/networks/components/proposals-section/proposals-section'
import { RoadmapSection } from '@/modules/networks/components/roadmap-section'
import { WALLETS } from '@/modules/networks/components/wallets-section/mocks/wallets'
import { WalletsSection } from '@/modules/networks/components/wallets-section/wallets-section'
import {
  NETWORK_HOMEPAGE_SECTIONS_ENCODED,
  NETWORK_HOMEPAGE_SKIP_SECTION,
} from '@/modules/networks/config/constants'
import { mockedRoadmaps } from '@/modules/roadmap/mocks'
import { PageBackground, PageContent } from '@/modules/shared/components/page-containers'
import { SectionActivation } from '@/modules/shared/components/section-activation'

export default function NetworkPage() {
  return (
    <PageBackground>
      <PageContent className="gap-8">
        <HomepageBanner />
        <ProposalsSection proposals={PROPOSALS} />
        <RoadmapSection roadmaps={mockedRoadmaps} />
        <FinancesSection />
        <WalletsSection wallets={WALLETS} />
        <BuildersSection />
        <GovernanceSection />

        <SectionActivation
          sections={NETWORK_HOMEPAGE_SECTIONS_ENCODED}
          options={{
            skipSection: NETWORK_HOMEPAGE_SKIP_SECTION,
          }}
        />
      </PageContent>
    </PageBackground>
  )
}
