import type { BuilderProfileState } from '@/modules/__generated__/graphql/switchboard-generated'
import { MarketplaceHeader } from '../configure-services-step/marketplace-header'
import { SubmitRequestForm } from './submit-request-form'
import { SummaryCard } from './summary-card'

interface SummaryStepProps {
  operator: BuilderProfileState
}

function SummaryStep({ operator }: Readonly<SummaryStepProps>) {
  return (
    <div className="mt-6 flex flex-col gap-6">
      <MarketplaceHeader operator={operator} />
      <SummaryCard />
      <SubmitRequestForm />
    </div>
  )
}

export { SummaryStep }
