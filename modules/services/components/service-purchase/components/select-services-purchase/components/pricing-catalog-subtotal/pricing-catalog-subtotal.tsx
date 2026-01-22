import { cn } from '@/modules/shared/lib/utils'
import type { PricingPlan, ServiceSectionCatalog } from '../types'

interface PricingCatalogSubtotalProps {
  section: ServiceSectionCatalog
  activePlan: PricingPlan
}

export default function PricingCatalogSubtotal({
  section,
  activePlan,
}: Readonly<PricingCatalogSubtotalProps>) {
  return (
    <div className={cn('border-t px-6')}>
      <div className={cn('grid items-center gap-4', 'grid-cols-[2fr_repeat(4,1fr)]')}>
        <span className="text-foreground/50 text-base/6 font-semibold uppercase">
          {section.subtotal?.label}
        </span>
        {(['basic', 'team', 'premium', 'enterprise'] as PricingPlan[]).map((plan) => (
          <div
            key={plan}
            className={cn(
              'flex h-14 items-center justify-center',
              activePlan === plan && 'bg-primary/10 font-bold',
            )}
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
        ))}
      </div>
    </div>
  )
}
