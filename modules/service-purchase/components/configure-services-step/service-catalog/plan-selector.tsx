'use client'

import { useMemo } from 'react'
import type { RsServiceSubscriptionTier } from '@/modules/__generated__/graphql/switchboard-generated'
import { BILLING_CYCLE_LABELS } from '@/modules/service-purchase/config/constants'
import {
  formatMetricLabel,
  formatPrice,
  getUnitPriceMetrics,
} from '@/modules/service-purchase/lib/utils'
import { usePricingCalculatorContext } from '@/modules/service-purchase/providers/pricing-calculator-provider'
import { RadioGroupItem } from '@/modules/shared/components/ui/radio-group'
import { cn } from '@/modules/shared/lib/utils'

interface PlanSelectorItemProps {
  tier: RsServiceSubscriptionTier
}

function PlanSelectorItem({ tier }: Readonly<PlanSelectorItemProps>) {
  const inputId = tier.id
  const { selectedBillingCycle, tierHeaderPrices } = usePricingCalculatorContext()

  const displayPrice = tierHeaderPrices[tier.id] ?? null
  const unitPriceMetrics = useMemo(() => getUnitPriceMetrics(tier), [tier])

  return (
    <label
      htmlFor={inputId}
      className="flex h-full w-full min-w-0 cursor-pointer flex-col items-center justify-start px-1"
    >
      <div className="flex cursor-pointer flex-col items-center gap-2">
        <RadioGroupItem
          value={tier.id}
          id={inputId}
          className="border-foreground [&_svg]:fill-foreground text-foreground cursor-pointer"
        />
        <span className={cn('text-foreground text-sm/5.5 font-semibold transition-colors')}>
          {tier.name}
        </span>
      </div>
      {tier.isCustomPricing ? (
        <div className="flex w-full flex-col items-center gap-0.5">
          <span className={cn('text-foreground/50 text-xs/5.5 font-semibold transition-colors')}>
            Custom
          </span>
          <span className="text-foreground text-xs leading-4.5 font-normal">
            {BILLING_CYCLE_LABELS[selectedBillingCycle]}
          </span>
          {unitPriceMetrics.map((metric, index) => (
            <span
              key={`${tier.id}-metric-${index}`}
              className={cn('text-primary text-center text-xs/4.5 font-semibold transition-colors')}
            >
              {metric.freeLimit ? (
                <>
                  up to {metric.freeLimit}{' '}
                  <span className="text-foreground/50">
                    {formatMetricLabel(metric.unitName ?? metric.metric)}
                  </span>
                </>
              ) : (
                <>
                  ~{formatPrice(Number(metric.unitPrice), tier.pricing.currency)}{' '}
                  <span className="text-foreground/50">
                    per {formatMetricLabel(metric.unitName ?? metric.metric)}
                  </span>
                </>
              )}
            </span>
          ))}
        </div>
      ) : (
        <div className="flex w-full flex-col items-center gap-0.5">
          <div>
            {displayPrice === null ? (
              <span className="text-muted-foreground text-xs/5.5 font-semibold">—</span>
            ) : displayPrice === 0 ? (
              <span className={cn('text-primary text-xs/5.5 font-semibold transition-colors')}>
                Free
              </span>
            ) : (
              <>
                <span className={cn('text-primary text-xs/5.5 font-semibold transition-colors')}>
                  {formatPrice(displayPrice, tier.pricing.currency)}
                </span>
                <span className="text-foreground/70 text-xs/5.5 font-semibold transition-colors">
                  /mo
                </span>
              </>
            )}
          </div>
          <span className="text-foreground text-xs leading-4.5 font-normal">
            {BILLING_CYCLE_LABELS[selectedBillingCycle]}
          </span>
          {unitPriceMetrics.map((metric, index) => (
            <span
              key={`${tier.id}-metric-${index}`}
              className={cn('text-primary text-center text-xs/4.5 font-semibold transition-colors')}
            >
              {metric.freeLimit ? (
                <>
                  up to {metric.freeLimit}{' '}
                  <span className="text-foreground/50">
                    {formatMetricLabel(metric.unitName ?? metric.metric)}
                  </span>
                </>
              ) : (
                <>
                  ~{formatPrice(Number(metric.unitPrice), tier.pricing.currency)}{' '}
                  <span className="text-foreground/50">
                    per {formatMetricLabel(metric.unitName ?? metric.metric)}
                  </span>
                </>
              )}
            </span>
          ))}
        </div>
      )}
    </label>
  )
}

export { PlanSelectorItem }
