import type { Maybe, Pt_PaymentModel } from '@/modules/__generated__/graphql/switchboard-generated'
import { ProposalCardOutline } from './proposal-card-outline'

const PAYMENT_MODEL_LABELS: Record<Pt_PaymentModel, string> = {
  COST_AND_MATERIALS: 'Cost & Materials',
  MILESTONE: 'Milestone',
  RETAINER: 'Retainer',
}

interface PaymentTermsCardProps {
  paymentModel?: Maybe<Pt_PaymentModel>
}

function PaymentTermsCard({ paymentModel }: PaymentTermsCardProps) {
  return (
    <ProposalCardOutline title="Payment Terms" className="gap-8">
      <div className="flex flex-wrap justify-between gap-2 gap-y-3 px-6 text-center text-sm/5.5 uppercase [&>div]:flex-1 [&>div]:whitespace-nowrap">
        <div>{paymentModel ? PAYMENT_MODEL_LABELS[paymentModel] : '—'}</div>
      </div>
    </ProposalCardOutline>
  )
}

export { PaymentTermsCard }
