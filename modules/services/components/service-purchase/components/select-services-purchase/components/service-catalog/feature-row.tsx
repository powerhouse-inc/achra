import { Badge } from '@/modules/shared/components/ui/badge'
import { cn } from '@/modules/shared/lib/utils'
import { ServiceCatalogoCell } from './service-catalogo-cell'
import type { FeatureValue, PricingPlan } from '../types'

interface FeatureRowProps {
  label: string
  sublabel?: string
  values: Record<PricingPlan, FeatureValue>
  activePlan: PricingPlan
}

export function FeatureRow({ label, sublabel, values, activePlan }: Readonly<FeatureRowProps>) {
  return (
    <div
      className={cn(
        'grid items-center gap-4 border-b px-6 last:border-b-0',
        'grid-cols-[4fr_repeat(4,1fr)]',
      )}
    >
      <div className="flex flex-col gap-0.5">
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

      {(['basic', 'team', 'premium', 'enterprise'] as PricingPlan[]).map((plan) => (
        <div
          key={plan}
          className={cn(
            'flex h-14 items-center justify-center transition-colors',
            activePlan === plan && 'bg-primary/10 font-bold',
          )}
        >
          <ServiceCatalogoCell value={values[plan]} isActive={activePlan === plan} />
        </div>
      ))}
    </div>
  )
}
