import { Pt_PaymentModel } from '@/modules/__generated__/graphql/switchboard-generated'
import { ProposalCardOutline } from './proposal-card-outline'

const PAYMENT_MODEL_LABELS: Record<Pt_PaymentModel, string> = {
  [Pt_PaymentModel.Retainer]: 'Retainer',
  [Pt_PaymentModel.Milestone]: 'Milestone',
  [Pt_PaymentModel.CostAndMaterials]: 'Cost & Materials',
}

const ALL_PAYMENT_MODELS = Object.values(Pt_PaymentModel)

function PaymentTermsCard() {
  return (
    <ProposalCardOutline title="Payment Terms" className="gap-8">
      <div className="flex flex-wrap justify-between gap-2 gap-y-3 px-6 text-center text-sm/5.5 uppercase [&>div]:flex-1 [&>div]:whitespace-nowrap">
        {ALL_PAYMENT_MODELS.map((model) => (
          <div key={model}>{PAYMENT_MODEL_LABELS[model]}</div>
        ))}
      </div>
    </ProposalCardOutline>
  )
}

export { PaymentTermsCard }
