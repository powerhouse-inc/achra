import { Suspense } from 'react'
import ServicePurchase from '@/modules/services/components/service-purchase'
import { ErrorBoundaryWithPresets } from '@/modules/shared/components/error-state'
import { PageContent } from '@/modules/shared/components/page-containers'

export default function ServicePurchasePage() {
  return (
    <PageContent className="gap-6">
      <ErrorBoundaryWithPresets>
        {/* TODO: Implement the missing skeletons components for the service purchase page */}
        <Suspense fallback={<div>Loading...</div>}>
          <ServicePurchase />
        </Suspense>
      </ErrorBoundaryWithPresets>
    </PageContent>
  )
}
