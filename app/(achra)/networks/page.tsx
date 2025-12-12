import { Suspense } from 'react'
import { NetworkGrid, NetworkGridSkeleton } from '@/modules/networks/components/network-grid'
import { ErrorBoundaryWithPresets } from '@/modules/shared/components/error-state'
import { PageContent } from '@/modules/shared/components/page-containers'

export default function NetworksPage() {
  return (
    <PageContent>
      <h1 className="text-foreground/50 md:text- mb-4 text-3xl font-bold tracking-tight">
        Networks (just for testing)
      </h1>

      <ErrorBoundaryWithPresets>
        <Suspense fallback={<NetworkGridSkeleton />}>
          <NetworkGrid />
        </Suspense>
      </ErrorBoundaryWithPresets>
    </PageContent>
  )
}
