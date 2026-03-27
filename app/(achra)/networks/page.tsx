import { Suspense } from 'react'
import { NetworkGridSkeleton } from '@/modules/networks/components/networks/components/network-grid'
import { Networks } from '@/modules/networks/components/networks/networks'
import { ErrorBoundaryWithPresets } from '@/modules/shared/components/error-state'
import { PageContent } from '@/modules/shared/components/page-containers'

export default function NetworksPage() {
  return (
    <PageContent>
      <ErrorBoundaryWithPresets>
        <Suspense fallback={<NetworkGridSkeleton />}>
          <Networks />
        </Suspense>
      </ErrorBoundaryWithPresets>
    </PageContent>
  )
}
