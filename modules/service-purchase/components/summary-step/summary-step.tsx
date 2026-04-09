import type { Maybe } from '@/modules/__generated__/graphql/switchboard-generated'
import { SubmitRequestForm } from './submit-request-form'
import { SummaryCard } from './summary-card'

interface SummaryStepProps {
  templateTitle?: string
  templateSubtitle?: Maybe<string>
}

function SummaryStep({ templateTitle, templateSubtitle }: Readonly<SummaryStepProps>) {
  return (
    <div className="mt-6 flex flex-col gap-6">
      <SummaryCard templateTitle={templateTitle} templateSubtitle={templateSubtitle} />
      <SubmitRequestForm />
    </div>
  )
}

export { SummaryStep }
