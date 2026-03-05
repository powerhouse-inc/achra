'use client'

import { usePricingCalculatorContext } from '@/modules/service-purchase/providers/pricing-calculator-provider'
import type { FeatureValue } from '@/modules/service-purchase/types'
import { cn } from '@/modules/shared/lib/utils'
import { ServiceCatalogCell } from '../service-catalog-cell'

export interface MetricRowProps {
  label: string
  values: Record<string, FeatureValue>
  isLast?: boolean
  isOneTime?: boolean
}

function MetricRow({ label, values, isLast, isOneTime }: Readonly<MetricRowProps>) {
  const { activePlan, tierNames } = usePricingCalculatorContext()
  const lastTierName = tierNames[tierNames.length - 1]
  // For one-time metrics, find the value from any tier (may not exist on the last tier)
  const oneTimeValue = isOneTime
    ? (Object.values(values).find((v): v is string => typeof v === 'string') ?? null)
    : null

  return (
    <div
      className={cn(
        'items-center',
        'grid grid-cols-2 lg:grid-cols-[var(--grid-cols-lg)] xl:grid-cols-[var(--grid-cols-xl)]',
      )}
      style={
        {
          '--grid-cols-lg': `4fr repeat(${tierNames.length}, minmax(144px, 1fr))`,
          '--grid-cols-xl': `4fr repeat(${tierNames.length}, minmax(220px, 1fr))`,
        } as React.CSSProperties
      }
    >
      {/* Metric label with tree connector */}
      <div
        className={cn(
          'bg-background relative flex h-full min-h-10 items-center gap-1.5 pr-4 pl-10 lg:gap-2 lg:pr-6 lg:pl-12',
          'sticky left-0 z-10 lg:relative',
          isLast && 'border-input border-b',
        )}
      >
        {/* Vertical line — full height, with rounded bottom-left on last item */}
        <div
          className={cn(
            'bg-border absolute top-0 left-6 w-px lg:left-8',
            isLast ? 'h-1/2 rounded-bl-md' : 'h-full',
          )}
        />
        {/* Horizontal connector */}
        <div
          className={cn(
            'bg-border absolute top-1/2 left-6 h-px w-4 -translate-y-px lg:left-8',
            isLast && 'rounded-bl-md',
          )}
        />
        {/* Circle dot */}
        <span className="bg-border z-10 size-1.5 shrink-0 rounded-full" />

        <span className="text-muted-foreground text-xs lg:text-sm">{label}</span>
      </div>

      {/* Mobile: Show only current plan */}
      <div
        className={cn(
          'flex h-full min-h-10 min-w-0 items-center justify-center px-4 transition-colors lg:hidden',
          isLast && 'border-input border-b',
          !!activePlan && 'bg-primary/10',
        )}
      >
        {isOneTime ? (
          oneTimeValue ? (
            <span className="text-primary min-w-0 truncate text-xs font-bold uppercase">
              {oneTimeValue}
            </span>
          ) : null
        ) : (
          <ServiceCatalogCell value={values[activePlan ?? '']} isActive={!!activePlan} />
        )}
      </div>

      {/* Desktop: Show all plans */}
      {tierNames.map((plan) => (
        <div
          key={plan}
          className={cn(
            'relative hidden min-h-full min-w-0 items-center px-6 transition-colors lg:flex',
            isOneTime ? '' : 'justify-center',
            isLast && 'border-input border-b',
            activePlan === plan && 'bg-primary/10',
          )}
        >
          {isOneTime ? (
            plan === lastTierName && oneTimeValue ? (
              <span className="text-primary absolute right-6 min-w-0 text-xs font-bold whitespace-nowrap uppercase">
                {oneTimeValue}
              </span>
            ) : null
          ) : (
            <ServiceCatalogCell value={values[plan]} isActive={activePlan === plan} />
          )}
        </div>
      ))}
    </div>
  )
}

export { MetricRow }
