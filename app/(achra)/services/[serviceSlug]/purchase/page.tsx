import { Suspense } from 'react'
import ServicePurchase from '@/modules/service-purchase'
import { ErrorBoundaryWithPresets } from '@/modules/shared/components/error-state'
import { PageContent } from '@/modules/shared/components/page-containers'

interface ServicePurchasePageProps {
  params: Promise<{ serviceSlug: string }>
}

export default async function ServicePurchasePage({ params }: ServicePurchasePageProps) {
  const { serviceSlug } = await params

  return (
    <PageContent className="gap-6">
      <ErrorBoundaryWithPresets>
        {/* TODO: Implement the missing skeletons components for the service purchase page */}
        <Suspense fallback={<div>Loading...</div>}>
          <ServicePurchase docId={serviceSlug} />
        </Suspense>
      </ErrorBoundaryWithPresets>
    </PageContent>
  )
}
