import { cn } from '@/modules/shared/lib/utils'
import { Plan, type ServiceSectionCatalog } from '../types'

interface PricingCatalogSubtotalProps {
  section: ServiceSectionCatalog
  activePlan: Plan
}

const PRICING_PLANS: Plan[] = [Plan.Basic, Plan.Team, Plan.Premium, Plan.Enterprise]

export default function PricingCatalogSubtotal({
  section,
  activePlan,
}: Readonly<PricingCatalogSubtotalProps>) {
  // Improve this check when the real data is available
  const nonEmptyValues = PRICING_PLANS.filter((plan) => section.subtotal?.values[plan])
  const isSpanningSubtotal = nonEmptyValues.length === 1

  if (isSpanningSubtotal) {
    const valueToShow = nonEmptyValues[0] ? section.subtotal?.values[nonEmptyValues[0]] : ''

    return (
      <div className={cn('border-t px-6')}>
        <div className={cn('grid items-center gap-4', 'grid-cols-[4fr_repeat(4,1fr)]')}>
          <span className="text-foreground/50 text-base/6 font-semibold uppercase">
            {section.subtotal?.label}
          </span>
          <div className="relative col-span-4 grid grid-cols-4 gap-4">
            {PRICING_PLANS.map((plan) => (
              <div key={plan} className={cn('h-14', activePlan === plan && 'bg-primary/10')} />
            ))}
            <div className="absolute inset-0 flex items-center justify-end pr-4">
              <span className="text-foreground/50 text-sm font-medium">{valueToShow}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('border-t px-6')}>
      <div className={cn('grid items-center gap-4', 'grid-cols-[4fr_repeat(4,1fr)]')}>
        <span className="text-foreground/50 text-base/6 font-semibold uppercase">
          {section.subtotal?.label}
        </span>
        {PRICING_PLANS.map((plan) => (
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
