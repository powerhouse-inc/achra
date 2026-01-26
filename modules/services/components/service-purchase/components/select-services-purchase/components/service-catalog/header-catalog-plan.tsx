import { RadioGroup } from '@/modules/shared/components/ui/radio-group'
import { cn } from '@/modules/shared/lib/utils'
import { PRICING_DATA } from '../../../../mock/mock-data'
import { PlanSelectorItem } from './plan-selector'
import type { Plan } from '../types'

interface HeaderCatalogPlanProps {
  selectedPlan?: Plan
  handlePlanChange: (plan: Plan) => void
  readOnly?: boolean
}

export default function HeaderCatalogPlan({
  selectedPlan,
  handlePlanChange,
  readOnly = false,
}: Readonly<HeaderCatalogPlanProps>) {
  return (
    <div
      className={cn(
        'border-input grid h-21 items-center border-b',
        'grid-cols-[minmax(0,4fr)_repeat(4,minmax(0,1fr))]',
      )}
    >
      <div className="flex items-center px-6">
        <span className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
          SERVICE CATALOG
        </span>
      </div>
      <RadioGroup
        value={selectedPlan}
        onValueChange={(value) => {
          handlePlanChange(value as Plan)
        }}
        className="contents"
        disabled={readOnly}
      >
        {PRICING_DATA.tiers.map((tier) => (
          <div
            key={tier.id}
            className={cn(
              'flex h-full min-w-0 items-center justify-center px-6 transition-colors',
              selectedPlan === tier.id && 'bg-primary/15',
            )}
          >
            <PlanSelectorItem
              value={tier.id}
              label={tier.name}
              description={tier.price}
              id={tier.id}
            />
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
