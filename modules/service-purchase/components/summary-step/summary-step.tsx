import { MarketplaceHeader } from '../configure-services-purchase/components/marketplace-header'
import { SubmitRequestForm } from './submit-request-form'
import { SummaryCard } from './summary-card'

function SummaryStep() {
  return (
    <div className="mt-6 flex flex-col gap-6">
      <MarketplaceHeader />
      <SummaryCard />
      <SubmitRequestForm />
    </div>
  )
}

export { SummaryStep }
