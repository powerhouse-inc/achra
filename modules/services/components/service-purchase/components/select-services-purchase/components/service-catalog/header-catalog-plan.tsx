import { RadioGroup } from '@/modules/shared/components/ui/radio-group'
import { cn } from '@/modules/shared/lib/utils'
import { PRICING_DATA } from '../../../../mock/mock-data'
import { PlanSelectorItem } from './plan-selector'
import type { PricingPlan } from '../types'

interface HeaderCatalogPlanProps {
  selectedPlan?: PricingPlan
  handlePlanChange: (plan: PricingPlan) => void
  readOnly?: boolean
}

export default function HeaderCatalogPlan({
  selectedPlan,
  handlePlanChange,
  readOnly = false,
}: Readonly<HeaderCatalogPlanProps>) {
  return (
    <div className={cn('grid h-21 items-center gap-4 px-6', 'grid-cols-[4fr_repeat(4,1fr)]')}>
      <div className="flex items-center">
        <span className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
          SERVICE CATALOG
        </span>
      </div>
      <RadioGroup
        value={selectedPlan}
        onValueChange={(value) => {
          handlePlanChange(value as PricingPlan)
        }}
        className={cn('contents', 'col-span-4')}
        disabled={readOnly}
      >
        {PRICING_DATA.tiers.map((tier) => (
          <div
            key={tier.id}
            className={cn(
              'flex h-full items-center justify-center transition-colors',
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
