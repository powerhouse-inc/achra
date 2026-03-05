import { MarketplaceHeaderSkeleton } from '../configure-services-step/marketplace-header/marketplace-header-skeleton'
import { SubmitRequestFormSkeleton } from './submit-request-form/submit-request-form-skeleton'
import { SummaryCardSkeleton } from './summary-card/summary-card-skeleton'

function SummaryStepSkeleton() {
  return (
    <div className="mt-6 flex flex-col gap-6">
      <MarketplaceHeaderSkeleton />
      <SummaryCardSkeleton />
      <SubmitRequestFormSkeleton />
    </div>
  )
}

export { SummaryStepSkeleton }
