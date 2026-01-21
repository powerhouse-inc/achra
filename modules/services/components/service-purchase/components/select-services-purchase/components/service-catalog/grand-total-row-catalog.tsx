import { cn } from '@/modules/shared/lib/utils'
import { PRICING_DATA } from '../mock/mock-data'
import type { PricingPlan } from '../types'

interface GrandTotalRowCatalogProps {
  selectedPlan: PricingPlan
}

export function GrandTotalRowCatalog({ selectedPlan }: Readonly<GrandTotalRowCatalogProps>) {
  return (
    <div
      className={cn(
        'border-border grid items-stretch gap-4 border px-6',
        'grid-cols-[2fr_repeat(4,1fr)]',
      )}
    >
      <span className="text-foreground flex items-center py-4 text-sm font-bold uppercase">
        {PRICING_DATA.grandTotal?.label}
      </span>

      {(['basic', 'team', 'premium', 'enterprise'] as PricingPlan[]).map((plan) => (
        <div
          key={plan}
          className={cn(
            'flex items-center justify-center transition-colors',
            selectedPlan === plan && 'bg-primary/30 font-bold',
          )}
        >
          <span className="text-base font-bold">{PRICING_DATA.grandTotal?.values[plan]}</span>
        </div>
      ))}
    </div>
  )
}
