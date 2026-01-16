import { cn } from '@/modules/shared/lib/utils'
import { PRICING_DATA } from '../mock/mock-data'
import type { PricingPlan } from '../types'

interface GrandTotalRowCatalogProps {
  showAllPlans: boolean
  selectedPlan: PricingPlan
}

export function GrandTotalRowCatalog({
  showAllPlans,
  selectedPlan,
}: Readonly<GrandTotalRowCatalogProps>) {
  return (
    <div
      className={cn(
        'grid items-stretch gap-4',
        showAllPlans ? 'grid-cols-[2fr_repeat(4,1fr)]' : 'grid-cols-[2fr_1fr]',
      )}
    >
      <span className="text-foreground flex items-center px-6 py-4 text-sm font-bold uppercase">
        {PRICING_DATA.grandTotal?.label}
      </span>
      {showAllPlans ? (
        (['basic', 'team', 'premium', 'enterprise'] as PricingPlan[]).map((plan) => (
          <div
            key={plan}
            className={cn(
              'flex items-center justify-center transition-colors',
              selectedPlan === plan ? 'bg-border/10 font-bold' : 'py-4',
            )}
          >
            <span className="text-base font-bold">{PRICING_DATA.grandTotal?.values[plan]}</span>
          </div>
        ))
      ) : (
        <div className="bg-border/10 flex items-center justify-center">
          <span className="text-base font-bold">
            {PRICING_DATA.grandTotal?.values[selectedPlan]}
          </span>
        </div>
      )}
    </div>
  )
}
