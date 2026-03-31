import { Suspense } from 'react'
import { Networks } from '@/modules/networks/components/networks/networks'
import { NetworksSkeleton } from '@/modules/networks/components/networks/networks-skeleton'
import { ErrorBoundaryWithPresets } from '@/modules/shared/components/error-state'
import { PageContent } from '@/modules/shared/components/page-containers'

export default function NetworksPage() {
  return (
    <PageContent>
      <ErrorBoundaryWithPresets>
        <Suspense fallback={<NetworksSkeleton />}>
          <Networks />
        </Suspense>
      </ErrorBoundaryWithPresets>
    </PageContent>
  )
}
