import { Badge } from '@/modules/shared/components/ui/badge'
import { cn } from '@/modules/shared/lib/utils'
import { ServiceCatalogoCell } from './service-catalogo-cell'
import type { FeatureValue, PricingPlan } from '../types'

interface FeatureRowProps {
  label: string
  sublabel?: string
  values: Record<PricingPlan, FeatureValue>
  activePlan: PricingPlan
  showAllPlans?: boolean
}

export function FeatureRow({
  label,
  sublabel,
  values,
  activePlan,
  showAllPlans = true,
}: Readonly<FeatureRowProps>) {
  return (
    <div
      className={cn(
        'grid items-center gap-4 border-b px-6 last:border-b-0',
        showAllPlans ? 'grid-cols-[2fr_repeat(4,1fr)]' : 'grid-cols-[2fr_1fr]',
      )}
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-foreground text-sm font-medium">{label}</span>
        {sublabel && (
          <span className="text-muted-foreground inline-flex items-center gap-1 text-xs">
            <Badge
              variant="outline"
              className={cn(
                'px-2 py-0.5 text-sm font-medium',

                'bg-primary/20 text-primary border-primary/30',
              )}
            >
              {label}
            </Badge>
          </span>
        )}
      </div>

      {showAllPlans ? (
        (['basic', 'team', 'premium', 'enterprise'] as PricingPlan[]).map((plan) => (
          <div
            key={plan}
            className={cn(
              'flex h-14 items-center justify-center transition-colors',
              activePlan === plan && 'bg-border/10',
            )}
          >
            <ServiceCatalogoCell value={values[plan]} isActive={activePlan === plan} />
          </div>
        ))
      ) : (
        <div className="bg-border/10 flex h-14 items-center justify-center">
          <ServiceCatalogoCell value={values[activePlan]} isActive={true} />
        </div>
      )}
    </div>
  )
}
