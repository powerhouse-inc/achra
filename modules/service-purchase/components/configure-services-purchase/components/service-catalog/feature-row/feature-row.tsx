'use client'

import { cn } from '@/modules/shared/lib/utils'
import { usePricingCalculatorContext } from '../pricing-calculator-context'
import { ServiceCatalogoCell } from '../service-catalogo-cell'
import { MetricRow } from './metric-row'
import type { FeatureValue, ServiceMetric } from '../../types'

interface FeatureRowProps {
  label: string
  sublabel?: string
  values: Record<string, FeatureValue>
  metrics?: ServiceMetric[]
}

export function FeatureRow({ label, values, metrics }: Readonly<FeatureRowProps>) {
  const { activePlan, currentMobilePlan, tierNames } = usePricingCalculatorContext()
  const hasMetrics = metrics && metrics.length > 0

  return (
    <>
      <div
        className={cn(
          'group/row min-h-full items-center',
          'grid grid-cols-2 lg:grid-cols-[var(--grid-cols)]',
        )}
        style={
          {
            '--grid-cols': `4fr repeat(${tierNames.length}, 1fr)`,
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
            <span className="text-foreground text-sm font-semibold lg:text-base">{label}</span>
          </div>
        </div>

        {/* Mobile: Show only current plan */}
        <div
          className={cn(
            'border-input flex h-14 min-h-full min-w-0 items-center justify-center border-b px-4 transition-colors lg:hidden',
            activePlan === currentMobilePlan && 'bg-primary/10 font-bold',
          )}
        >
          <ServiceCatalogoCell
            value={values[currentMobilePlan]}
            isActive={activePlan === currentMobilePlan}
          />
        </div>

        {/* Desktop: Show all plans */}
        {tierNames.map((plan) => (
          <div
            key={plan}
            className={cn(
              'border-input hidden h-14 min-h-full min-w-0 items-center justify-center border-b px-6 transition-colors lg:flex',
              activePlan === plan && 'bg-primary/10 font-bold',
            )}
          >
            <ServiceCatalogoCell value={values[plan]} isActive={activePlan === plan} />
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
