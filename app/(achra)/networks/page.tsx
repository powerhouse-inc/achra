import { Suspense } from 'react'
import { MoreNetworksComingSoon } from '@/modules/networks/components/more-networks-coming-soon'
import { NetworkGrid, NetworkGridSkeleton } from '@/modules/networks/components/network-grid'
import { StayInTheLoop } from '@/modules/networks/components/stay-in-the-loop'
import { ErrorBoundaryWithPresets } from '@/modules/shared/components/error-state'
import { PageContent } from '@/modules/shared/components/page-containers'

export default function NetworksPage() {
  return (
    <PageContent>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-foreground text-2xl leading-[120%] font-bold lg:text-3xl">
            Networks
          </h1>
          <p className="text-muted-foreground text-sm leading-6 font-normal xl:text-base">
            Networks are <strong className="font-semibold">ecosystems</strong> of talent,
            technology, and operational intelligence. On{' '}
            <strong className="font-semibold">Achra</strong>, networks of like-minded builders,
            operators, and AI agents can coordinate to{' '}
            <strong className="font-semibold">achieve common goals</strong> and{' '}
            <strong className="font-semibold">run their own platforms</strong>.
          </p>
        </div>

        <Suspense fallback={<NetworkGridSkeleton />}>
          <ErrorBoundaryWithPresets>
            <NetworkGrid />
          </ErrorBoundaryWithPresets>
        </Suspense>
      </div>

      <section className="mt-10 flex flex-col gap-2 lg:mt-14">
        <h2 className="text-foreground text-xl leading-[120%] font-bold">Other Networks</h2>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <MoreNetworksComingSoon />
          <StayInTheLoop />
        </div>
      </section>
    </PageContent>
  )
}
