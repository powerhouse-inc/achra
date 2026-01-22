import { Badge } from '@/modules/shared/components/ui/badge'
import { cn } from '@/modules/shared/lib/utils'
import { type FeatureValue, type Plan, PRICING_PLANS } from '../types'
import { ServiceCatalogoCell } from './service-catalogo-cell'

interface FeatureRowProps {
  label: string
  sublabel?: string
  values: Record<Plan, FeatureValue>
  activePlan: Plan
}

export function FeatureRow({ label, sublabel, values, activePlan }: Readonly<FeatureRowProps>) {
  return (
    <div
      className={cn(
        'grid items-center gap-4 border-b pl-6 last:border-b-0',
        'grid-cols-[minmax(0,4fr)_repeat(4,minmax(0,1fr))]',
      )}
    >
      <div className="flex min-h-14 flex-col justify-center gap-0.5">
        <span className="text-foreground text-base font-semibold">{label}</span>
        {sublabel && (
          <span className="text-muted-foreground inline-flex items-center gap-1 text-xs">
            <Badge
              variant="outline"
              className={cn(
                'rounded-md border-2 px-1 py-0 text-sm/5.5 font-semibold',
                'bg-purple/30 text-primary border-purple',
              )}
            >
              {sublabel}
            </Badge>
          </span>
        )}
      </div>

      {PRICING_PLANS.map((plan) => (
        <div
          key={plan}
          className={cn(
            'flex h-14 min-w-0 items-center justify-center transition-colors',
            activePlan === plan && 'bg-primary/10 font-bold',
            plan === 'enterprise' && 'pr-6',
          )}
        >
          <ServiceCatalogoCell value={values[plan]} isActive={activePlan === plan} />
        </div>
      ))}
    </div>
  )
}
