import type {
  BuilderProfileState,
  Maybe,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { MarketplaceHeader } from '../configure-services-step/marketplace-header'
import { SubmitRequestForm } from './submit-request-form'
import { SummaryCard } from './summary-card'

interface SummaryStepProps {
  operator: BuilderProfileState
  templateTitle?: string
  templateSubtitle?: Maybe<string>
}

function SummaryStep({ operator, templateTitle, templateSubtitle }: Readonly<SummaryStepProps>) {
  return (
    <div className="mt-6 flex flex-col gap-6">
      <MarketplaceHeader operator={operator} />
      <SummaryCard templateTitle={templateTitle} templateSubtitle={templateSubtitle} />
      <SubmitRequestForm />
    </div>
  )
}

export { SummaryStep }
