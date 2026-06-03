import { threeDigitsPrecisionHumanization } from '@/modules/shared/lib/humanization'
import { cn } from '@/modules/shared/lib/utils'
import { ProposalCardOutline } from './proposal-card-outline'

interface BudgetEstimateCardProps {
  totalBudget: number
}

function BudgetEstimateCard({ totalBudget }: BudgetEstimateCardProps) {
  const humanizedBudget = threeDigitsPrecisionHumanization(totalBudget)

  return (
    <ProposalCardOutline title="Budget Estimate" className="pb-6">
      <div className="flex h-full gap-2 text-center">
        <div className="flex flex-1 items-end justify-center">
          <div
            className={cn(
              'flex justify-center gap-2',
              humanizedBudget.suffix ? 'items-end' : 'items-baseline',
            )}
          >
            <div className="text-3xl font-bold">{humanizedBudget.value}</div>
            <div className="text-foreground/50 text-left leading-4 uppercase">
              {humanizedBudget.suffix && <div>{humanizedBudget.suffix}</div>}
              <div>USD</div>
            </div>
          </div>
        </div>
        {/* TODO: enable this once we have the POWTS data in the API */}
        {/* <div className="flex flex-1 items-end justify-center">
          <div className="flex items-center justify-center gap-2">
            <div className="text-3xl font-bold">4.0</div>
            <div className="text-foreground/50 text-left leading-4 uppercase">
              <div>K</div>
              <div>POWTS</div>
            </div>
          </div>
        </div> */}
      </div>
    </ProposalCardOutline>
  )
}

export { BudgetEstimateCard }
