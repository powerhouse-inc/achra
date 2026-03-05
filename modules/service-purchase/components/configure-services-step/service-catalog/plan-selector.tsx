'use client'

import type { RsServiceSubscriptionTier } from '@/modules/__generated__/graphql/switchboard-generated'
import { BILLING_CYCLE_LABELS } from '@/modules/service-purchase/config/constants'
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

  return (
    <label
      htmlFor={inputId}
      className="flex h-full w-full cursor-pointer flex-col items-center justify-center"
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
        <div className="flex flex-col items-center gap-0.5">
          <span className={cn('text-foreground/50 text-xs/5.5 font-semibold transition-colors')}>
            Custom
          </span>
          <span className="text-foreground text-xs leading-4.5 font-normal">
            {BILLING_CYCLE_LABELS[selectedBillingCycle]}
          </span>
          {/* TODO:Improve this when api its ready */}
          <span className={cn('text-primary text-xs/4.5 font-semibold transition-colors')}>
            ~$50 <span className="text-foreground/50">per Contributor</span>
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-0.5">
          <div>
            {displayPrice === null ? (
              <span className="text-muted-foreground text-xs/5.5 font-semibold">—</span>
            ) : (
              <>
                <span className={cn('text-primary text-xs/5.5 font-semibold transition-colors')}>
                  ${Math.round(displayPrice).toLocaleString()}
                </span>
                <span className="text-foreground/70 text-xs/5.5 font-semibold transition-colors">
                  /mo
                </span>
              </>
            )}
          </div>
          {/* TODO: add this one its api fixed */}
          {/* <span className="text-status-progress text-xs font-semibold">save {savingsLabel}</span> */}
          <span className="text-foreground text-xs leading-4.5 font-normal">
            {BILLING_CYCLE_LABELS[selectedBillingCycle]}
          </span>
          {/* TODO:Improve this when api its ready */}
          <span className={cn('text-primary text-xs/4.5 font-semibold transition-colors')}>
            ~$50 <span className="text-foreground/50">per Contributor</span>
          </span>
        </div>
      )}
    </label>
  )
}

export { PlanSelectorItem }
