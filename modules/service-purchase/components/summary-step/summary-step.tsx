import type { Maybe } from '@/modules/__generated__/graphql/switchboard-generated'
import { SubmitRequestForm } from './submit-request-form'
import { SummaryCard } from './summary-card'

interface SummaryStepProps {
  templateTitle?: string
  templateSubtitle?: Maybe<string>
}

function SummaryStep({ templateTitle, templateSubtitle }: Readonly<SummaryStepProps>) {
  return (
    <div className="mt-6 flex flex-col-reverse gap-6 lg:grid lg:grid-cols-[3fr_2fr] lg:items-start">
      <SummaryCard templateTitle={templateTitle} templateSubtitle={templateSubtitle} />
      <div className="lg:sticky lg:top-28">
        <SubmitRequestForm />
      </div>
    </div>
  )
}

export { SummaryStep }
