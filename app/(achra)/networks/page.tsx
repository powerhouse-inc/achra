import { Suspense } from 'react'
import {
  NetworkGrid,
  NetworkGridHydration,
  NetworkGridSkeleton,
} from '@/modules/networks/components/network-grid'
import { PageContent } from '@/modules/shared/components/page-containers'

export default function NetworksPage() {
  return (
    <PageContent>
      <h1 className="text-foreground/50 md:text- mb-4 text-3xl font-bold tracking-tight">
        Networks
      </h1>

      <Suspense fallback={<NetworkGridSkeleton />}>
        <NetworkGridHydration>
          <NetworkGrid />
        </NetworkGridHydration>
      </Suspense>
    </PageContent>
  )
}
