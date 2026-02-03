'use client'

import { Badge } from '@/modules/shared/components/ui/badge'
import { cn } from '@/modules/shared/lib/utils'
import { type FeatureValue, type Plan, PRICING_PLANS } from '../types'
import { usePricingCalculatorContext } from './pricing-calculator-context'
import { ServiceCatalogoCell } from './service-catalogo-cell'

interface FeatureRowProps {
  label: string
  sublabel?: string
  values: Record<Plan, FeatureValue>
  activePlan: Plan
}

export function FeatureRow({ label, sublabel, values, activePlan }: Readonly<FeatureRowProps>) {
  const { mobilePlanIndex } = usePricingCalculatorContext()
  const currentMobilePlan = PRICING_PLANS[mobilePlanIndex]

  return (
    <div
      className={cn(
        'group/row grid items-center',
        // Desktop: 5 columns (label + 4 plans)
        'lg:grid-cols-[minmax(0,4fr)_repeat(4,minmax(0,1fr))]',
        // Mobile: 2 columns (sticky label + current plan)
        'grid-cols-[minmax(0,1fr)_minmax(0,1fr)]',
      )}
    >
      {/* Label column - sticky on mobile */}
      <div
        className={cn(
          'border-input bg-background flex min-h-14 flex-col justify-center gap-0.5 border-b px-4 group-last/row:border-b-0 lg:px-6',
          // Sticky positioning for mobile
          'sticky left-0 z-10 lg:static',
        )}
      >
        <div className="flex flex-col md:flex-row md:items-center md:gap-1">
          <span className="text-foreground text-sm font-semibold lg:text-base">{label}</span>
          {sublabel && (
            <span className="text-muted-foreground md:flex-start inline-flex items-center gap-1 text-xs md:items-start">
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
      </div>

      {/* Mobile: Show only current plan */}
      <div
        className={cn(
          'border-input flex h-full min-h-14 min-w-0 items-center justify-center border-b px-4 transition-colors group-last/row:border-b-0 lg:hidden',
          activePlan === currentMobilePlan && 'bg-primary/10 font-bold',
        )}
      >
        <ServiceCatalogoCell
          value={values[currentMobilePlan]}
          isActive={activePlan === currentMobilePlan}
        />
      </div>

      {/* Desktop: Show all plans */}
      {PRICING_PLANS.map((plan) => (
        <div
          key={plan}
          className={cn(
            'border-input hidden min-h-14 min-w-0 items-center justify-center border-b px-6 transition-colors group-last/row:border-b-0 lg:flex',
            activePlan === plan && 'bg-primary/10 font-bold',
          )}
        >
          <ServiceCatalogoCell value={values[plan]} isActive={activePlan === plan} />
        </div>
      ))}
    </div>
  )
}
