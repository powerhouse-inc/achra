import { StepOneSkeleton } from '@/modules/service-purchase/components/service-purchase-form/components/step-one-skeleton/step-one-skeleton'
import { PageContent } from '@/modules/shared/components/page-containers'

export default function ServicePurchaseLoading() {
  return (
    <PageContent className="gap-6">
      <StepOneSkeleton />
    </PageContent>
  )
}
