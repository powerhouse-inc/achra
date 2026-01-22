import { cn } from '@/modules/shared/lib/utils'
import { type Plan, PRICING_PLANS, type ServiceSectionCatalog } from '../../types'

interface MultiColumnSubtotalProps {
  subtotal: NonNullable<ServiceSectionCatalog['subtotal']>
  activePlan: Plan
}

export function MultiColumnSubtotal({ subtotal, activePlan }: Readonly<MultiColumnSubtotalProps>) {
  return (
    <>
      {PRICING_PLANS.map((plan) => {
        const isActive = activePlan === plan

        return (
          <div
            key={plan}
            className={cn('flex h-14 items-center justify-center', isActive && 'bg-primary/10')}
          >
            <span
              className={cn(
                'text-sm',
                isActive ? 'text-primary font-bold' : 'text-foreground font-medium',
              )}
            >
              {subtotal.values[plan]}
            </span>
          </div>
        )
      })}
    </>
  )
}
