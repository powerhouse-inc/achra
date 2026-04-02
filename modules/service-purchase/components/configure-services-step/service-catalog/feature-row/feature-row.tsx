'use client'

import { usePricingCalculatorContext } from '@/modules/service-purchase/providers/pricing-calculator-provider'
import { useHoveredTier } from '@/modules/service-purchase/providers/service-purchase-store-provider'
import type { FeatureValue, ServiceMetric } from '@/modules/service-purchase/types'
import { cn } from '@/modules/shared/lib/utils'
import { ServiceCatalogCell } from '../service-catalog-cell'
import { useServiceCatalogEnabled } from '../service-catalog-context'
import { MetricRow } from './metric-row'

interface FeatureRowProps {
  label: string
  sublabel?: string
  values: Record<string, FeatureValue>
  metrics?: ServiceMetric[]
}

function FeatureRow({ label, values, metrics }: Readonly<FeatureRowProps>) {
  const { activePlan, tierNames } = usePricingCalculatorContext()
  const hoveredPlan = useHoveredTier()
  const isGroupEnabled = useServiceCatalogEnabled()
  const hasMetrics = metrics && metrics.length > 0

  return (
    <>
      <div
        className={cn(
          'group/row min-h-full items-center',
          'grid grid-cols-2 lg:grid-cols-(--grid-cols-lg) xl:grid-cols-(--grid-cols-xl)',
        )}
        style={
          {
            '--grid-cols-lg': `4fr repeat(${tierNames.length}, minmax(144px, 1fr))`,
            '--grid-cols-xl': `4fr repeat(${tierNames.length}, minmax(220px, 1fr))`,
          } as React.CSSProperties
        }
      >
        {/* Label column - sticky on mobile */}
        <div
          className={cn(
            'border-input bg-background flex min-h-14 flex-col justify-center gap-0.5 border-b px-4 lg:px-6',
            'sticky left-0 z-10 lg:static',
          )}
        >
          <div className="flex flex-col md:flex-row md:items-center md:gap-1">
            <span
              className={cn(
                'text-sm font-normal',
                isGroupEnabled ? 'text-foreground' : 'text-foreground/50',
              )}
            >
              {label}
            </span>
          </div>
        </div>

        {/* Mobile: Show only current plan */}
        <div
          className={cn(
            'border-input flex h-14 min-h-full min-w-0 items-center justify-center border-b px-4 transition-colors lg:hidden',
            !!activePlan && 'bg-primary/10 font-bold',
          )}
        >
          <ServiceCatalogCell value={values[activePlan ?? '']} isActive={!!activePlan} />
        </div>

        {/* Desktop: Show all plans */}
        {tierNames.map((plan) => (
          <div
            key={plan}
            className={cn(
              'border-input hidden h-14 min-h-full min-w-0 items-center justify-center border-b px-6 transition-colors lg:flex',
              activePlan === plan && 'bg-primary/10 font-bold',
              hoveredPlan === plan && activePlan !== plan && 'bg-accent/80',
            )}
          >
            <ServiceCatalogCell value={values[plan]} isActive={activePlan === plan} />
          </div>
        ))}
      </div>

      {/* Metric sub-rows */}
      {hasMetrics &&
        metrics.map((m, i) => (
          <MetricRow
            key={m.metric}
            label={m.metric}
            values={m.values}
            isLast={i === metrics.length - 1}
            isOneTime={m.isOneTime}
          />
        ))}
    </>
  )
}

export { FeatureRow }
