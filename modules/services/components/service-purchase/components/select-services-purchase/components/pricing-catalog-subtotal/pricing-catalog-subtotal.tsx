import { cn } from '@/modules/shared/lib/utils'
import type { PricingPlan, ServiceSectionCatalog } from '../types'

interface PricingCatalogSubtotalProps {
  section: ServiceSectionCatalog
  activePlan: PricingPlan
  showAllPlans: boolean
}

export default function PricingCatalogSubtotal({
  section,
  activePlan,
  showAllPlans,
}: Readonly<PricingCatalogSubtotalProps>) {
  return (
    <div className="bg-muted/20 border-t px-6 py-3">
      <div
        className={cn(
          'grid items-center gap-4',
          showAllPlans ? 'grid-cols-[2fr_repeat(4,1fr)]' : 'grid-cols-[2fr_1fr]',
        )}
      >
        <span className="text-foreground text-xs font-bold uppercase">
          {section.subtotal?.label}
        </span>
        {showAllPlans ? (
          (['basic', 'team', 'premium', 'enterprise'] as PricingPlan[]).map((plan) => (
            <div
              key={plan}
              className={cn('flex items-center justify-center', activePlan === plan && 'font-bold')}
            >
              <span
                className={cn(
                  'text-sm',
                  activePlan === plan ? 'text-primary font-bold' : 'text-foreground font-medium',
                )}
              >
                {section.subtotal?.values[plan]}
              </span>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center">
            <span className="text-primary text-sm font-bold">
              {section.subtotal?.values[activePlan]}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
