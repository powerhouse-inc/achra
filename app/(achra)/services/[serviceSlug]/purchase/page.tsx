import { Suspense } from 'react'
import ServicePurchase from '@/modules/service-purchase'
import { StepOneSkeleton } from '@/modules/service-purchase/components/service-purchase-form/components/step-one-skeleton/step-one-skeleton'
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
        {/* TODO: The loading state will depend on the step the user lands on */}
        <Suspense fallback={<StepOneSkeleton />}>
          <ServicePurchase serviceSlug={serviceSlug} />
        </Suspense>
      </ErrorBoundaryWithPresets>
    </PageContent>
  )
}
