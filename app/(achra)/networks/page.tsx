import { Suspense } from 'react'
import { Networks } from '@/modules/networks/components/networks/networks'
import { NetworksSkeleton } from '@/modules/networks/components/networks/networks-skeleton'
import { PageContent } from '@/modules/shared/components/page-containers'

export default function NetworksPage() {
  return (
    <PageContent>
      <Suspense fallback={<NetworksSkeleton />}>
        <Networks />
      </Suspense>
    </PageContent>
  )
}
