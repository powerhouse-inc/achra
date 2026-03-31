import { Suspense } from 'react'
import { MoreNetworksComingSoon } from '@/modules/networks/components/more-networks-coming-soon'
import { NetworkGrid, NetworkGridSkeleton } from '@/modules/networks/components/network-grid'
import { NetworksIntroCard } from '@/modules/networks/components/networks-intro-card'
import { StayInTheLoop } from '@/modules/networks/components/stay-in-the-loop'
import { ErrorBoundaryWithPresets } from '@/modules/shared/components/error-state'
import { PageContent } from '@/modules/shared/components/page-containers'

export default function NetworksPage() {
  return (
    <PageContent>
      <div className="flex flex-col gap-6">
        <Suspense fallback={<NetworkGridSkeleton />}>
          <ErrorBoundaryWithPresets>
            <NetworkGrid />
          </ErrorBoundaryWithPresets>
        </Suspense>
        <NetworksIntroCard />

        <h2 className="text-foreground text-2xl leading-[120%] font-bold">Other Networks</h2>

        <MoreNetworksComingSoon />
        <StayInTheLoop />
      </div>
    </PageContent>
  )
}
