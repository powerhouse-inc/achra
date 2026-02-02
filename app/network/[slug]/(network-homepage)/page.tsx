import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { BuildersSection } from '@/modules/networks/components/builders-section/builders-section'
import { FinancesSection } from '@/modules/networks/components/finances-section/finances-section'
import { GovernanceSection } from '@/modules/networks/components/governance-section/governance-section'
import {
  HomepageBanner,
  HomepageBannerSkeleton,
} from '@/modules/networks/components/homepage-banner'
import { PROPOSALS } from '@/modules/networks/components/proposals-section/mocks/proposals'
import { ProposalsSection } from '@/modules/networks/components/proposals-section/proposals-section'
import {
  RoadmapSection,
  RoadmapSectionSkeleton,
} from '@/modules/networks/components/roadmap-section'
import { WALLETS } from '@/modules/networks/components/wallets-section/mocks/wallets'
import { WalletsSection } from '@/modules/networks/components/wallets-section/wallets-section'
import {
  NETWORK_HOMEPAGE_SECTIONS_ENCODED,
  NETWORK_HOMEPAGE_SKIP_SECTION,
} from '@/modules/networks/config/constants'
import { ErrorBoundaryWithPresets } from '@/modules/shared/components/error-state'
import { PageContent } from '@/modules/shared/components/page-containers'
import { SectionActivation } from '@/modules/shared/components/section-activation'
import ff from '@/modules/shared/lib/feature-flags'

interface NetworkPageProps {
  params: Promise<{ slug: string }>
}

export default async function NetworkPage({ params }: NetworkPageProps) {
  const { slug } = await params

  if (ff.USE_BUILDERS_AS_NETWORK_HOMEPAGE) {
    return redirect(`/network/${slug}/builders`)
  }

  return (
    <PageContent className="gap-8">
      <Suspense fallback={<HomepageBannerSkeleton />}>
        <HomepageBanner />
      </Suspense>

      <ProposalsSection proposals={PROPOSALS} />

      {ff.ROADMAPS_ENABLED && (
        <ErrorBoundaryWithPresets description="We ran into an unexpected error while loading the roadmaps. Please try again later.">
          <Suspense fallback={<RoadmapSectionSkeleton />}>
            <RoadmapSection params={params} />
          </Suspense>
        </ErrorBoundaryWithPresets>
      )}

      <FinancesSection />

      <WalletsSection wallets={WALLETS} />

      {/* TODO: Implement builders section backend integration */}
      <BuildersSection />

      <GovernanceSection />

      <SectionActivation
        sections={NETWORK_HOMEPAGE_SECTIONS_ENCODED}
        options={{
          skipSection: NETWORK_HOMEPAGE_SKIP_SECTION,
        }}
      />
    </PageContent>
  )
}
