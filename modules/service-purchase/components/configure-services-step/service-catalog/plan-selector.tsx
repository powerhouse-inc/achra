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
  isSelected?: boolean
}

function PlanSelectorItem({ tier, isSelected = false }: Readonly<PlanSelectorItemProps>) {
  const inputId = tier.id
  const { selectedBillingCycle, tierHeaderPrices } = usePricingCalculatorContext()

  const displayPrice = tierHeaderPrices[tier.id] ?? null
  const unitPriceMetrics = useMemo(() => getUnitPriceMetrics(tier), [tier])

  return (
    <label
      htmlFor={inputId}
      className={cn(
        'flex h-full w-full min-w-0 flex-col items-center justify-start px-0 sm:px-1',
        isSelected ? 'cursor-default' : 'cursor-pointer',
      )}
    >
      <div className="flex flex-col items-center gap-2">
        <RadioGroupItem
          value={tier.id}
          id={inputId}
          className="border-foreground [&_svg]:fill-foreground text-foreground"
        />
        <span className="text-foreground text-sm/5.5 font-semibold">{tier.name}</span>
      </div>
      {tier.mostPopular && (
        <span className="bg-primary text-primary-foreground inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-bold tracking-wide whitespace-nowrap uppercase lg:px-2.5 lg:tracking-widest">
          Most popular
        </span>
      )}
      {tier.isCustomPricing ? (
        <div className="flex w-full flex-col items-center gap-0.5">
          <span className="text-foreground/50 text-xs/5.5 font-semibold">Custom</span>
          {unitPriceMetrics.map((metric, index) => (
            <span
              // order does not matter here as it doesn't change the UI
              // eslint-disable-next-line react/no-array-index-key
              key={`${tier.id}-metric-${index}`}
              className="text-primary dark:text-primary-foreground text-center text-xs/4.5 font-semibold"
            >
              {metric.freeLimit ? (
                <>
                  {metric.freeLimit}{' '}
                  <span className="text-foreground/50">
                    {formatMetricLabel(metric.unitName ?? metric.metric)}/mo
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
          <span className="text-foreground text-xs leading-4.5 font-normal">
            {BILLING_CYCLE_LABELS[selectedBillingCycle]}
          </span>
        </div>
      ) : (
        <div className="flex w-full flex-col items-center gap-0.5">
          <div>
            {displayPrice === null ? (
              <span className="text-muted-foreground text-xs/5.5 font-semibold">—</span>
            ) : displayPrice === 0 ? (
              <span className="text-primary dark:text-primary-foreground text-xs/5.5 font-semibold">
                Free
              </span>
            ) : (
              <>
                <span className="text-primary dark:text-primary-foreground text-xs/5.5 font-semibold">
                  {formatPrice(displayPrice, tier.pricing.currency)}
                </span>
                <span className="text-foreground/70 text-xs/5.5 font-semibold">/mo</span>
              </>
            )}
          </div>
          {unitPriceMetrics.map((metric, index) => (
            <span
              // order does not matter here as it doesn't change the UI
              // eslint-disable-next-line react/no-array-index-key
              key={`${tier.id}-metric-${index}`}
              className="text-primary dark:text-primary-foreground text-center text-xs/4.5 font-semibold"
            >
              {metric.freeLimit ? (
                <>
                  {metric.freeLimit}{' '}
                  <span className="text-foreground/50">
                    {formatMetricLabel(metric.unitName ?? metric.metric)}/mo
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
          <span className="text-foreground text-center text-xs leading-4.5 font-normal">
            {BILLING_CYCLE_LABELS[selectedBillingCycle]}
          </span>
        </div>
      )}
    </label>
  )
}

export { PlanSelectorItem }
