import { SubmitRequestFormSkeleton } from './submit-request-form/submit-request-form-skeleton'
import { SummaryCardSkeleton } from './summary-card/summary-card-skeleton'

function SummaryStepSkeleton() {
  return (
    <div className="mt-6 flex flex-col-reverse gap-6 lg:grid lg:grid-cols-[3fr_2fr] lg:items-start">
      <SummaryCardSkeleton />
      <div className="lg:sticky lg:top-28">
        <SubmitRequestFormSkeleton />
      </div>
    </div>
  )
}

export { SummaryStepSkeleton }
