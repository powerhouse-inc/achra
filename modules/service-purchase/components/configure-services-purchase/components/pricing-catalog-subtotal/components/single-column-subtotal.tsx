import { cn } from '@/modules/shared/lib/utils'
import { type Plan, PRICING_PLANS } from '../../types'

interface SingleColumnSubtotalProps {
  value: string
  activePlan: Plan
}

export function SingleColumnSubtotal({ value, activePlan }: Readonly<SingleColumnSubtotalProps>) {
  return (
    <>
      {PRICING_PLANS.slice(0, 3).map((plan) => (
        <div
          key={plan}
          className={cn(
            'border-input hidden min-h-14 min-w-0 border-y px-6 lg:block',
            activePlan === plan && 'bg-primary/10',
          )}
        />
      ))}
      <div
        className={cn(
          'border-input relative hidden min-h-14 min-w-0 items-center justify-end border-y lg:flex',
          activePlan === 'enterprise' && 'bg-primary/10',
        )}
      >
        <span className="text-foreground/50 absolute right-6 min-w-0 text-sm font-medium whitespace-nowrap">
          {value}
        </span>
      </div>
    </>
  )
}
