import { cn } from '@/modules/shared/lib/utils'
import { type Plan, PRICING_PLANS } from '../../types'

interface SingleColumnSubtotalProps {
  value: string
  activePlan: Plan
}

export function SingleColumnSubtotal({ value, activePlan }: Readonly<SingleColumnSubtotalProps>) {
  return (
    <div className="relative col-span-4 grid grid-cols-4 gap-4">
      {PRICING_PLANS.map((plan) => (
        <div key={plan} className={cn('h-14', activePlan === plan && 'bg-primary/10')} />
      ))}
      <div className="absolute inset-0 flex items-center justify-end pr-4">
        <span className="text-foreground/50 text-sm font-medium">{value}</span>
      </div>
    </div>
  )
}
