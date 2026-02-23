'use client'
import {
  RsBillingCycle,
  RsDiscountType,
  type RsServiceSubscriptionTier,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { RadioGroupItem } from '@/modules/shared/components/ui/radio-group'
import { cn } from '@/modules/shared/lib/utils'
import { usePricingCalculatorContext } from './pricing-calculator-context'

const CYCLE_SUFFIX: Record<RsBillingCycle, string> = {
  [RsBillingCycle.Monthly]: '/mo',
  [RsBillingCycle.Quarterly]: '/qtr',
  [RsBillingCycle.SemiAnnual]: '/6mo',
  [RsBillingCycle.Annual]: '/yr',
  [RsBillingCycle.OneTime]: '',
}

interface PlanSelectorItemProps {
  tier: RsServiceSubscriptionTier
}

export function PlanSelectorItem({ tier }: Readonly<PlanSelectorItemProps>) {
  const inputId = tier.id ?? tier.name
  const { selectedBillingCycle } = usePricingCalculatorContext()

  const baseAmount = tier.pricing.amount ?? 0
  const cycleDiscount = (tier.billingCycleDiscounts ?? []).find(
    (d) => d.billingCycle === selectedBillingCycle,
  )

  let displayPrice = baseAmount
  if (cycleDiscount) {
    const { discountType, discountValue } = cycleDiscount.discountRule
    if (discountType === RsDiscountType.Percentage) {
      displayPrice = baseAmount * (1 - discountValue / 100)
    } else if (discountType === RsDiscountType.FlatAmount) {
      displayPrice = Math.max(0, baseAmount - discountValue)
    }
  }

  const suffix = CYCLE_SUFFIX[selectedBillingCycle] ?? '/mo'
  const hasDiscount = cycleDiscount && displayPrice < baseAmount

  return (
    <label
      htmlFor={inputId}
      className="flex h-full w-full cursor-pointer flex-col items-center justify-center"
    >
      <div className="flex cursor-pointer flex-col items-center gap-2">
        <RadioGroupItem
          value={tier.name}
          id={inputId}
          className="border-foreground [&_svg]:fill-foreground text-foreground cursor-pointer"
        />
        <span className={cn('text-foreground text-sm/5.5 font-semibold transition-colors')}>
          {tier.name}
        </span>
      </div>
      {tier.isCustomPricing ? (
        <span className={cn('text-foreground/50 text-xs/5.5 font-semibold transition-colors')}>
          Custom
        </span>
      ) : (
        <div className="flex flex-col items-center gap-0.5">
          <span className={cn('text-foreground/50 text-xs/5.5 font-semibold transition-colors')}>
            ${Math.round(displayPrice).toLocaleString()}
            {suffix}
          </span>
          {hasDiscount && (
            <span className="text-status-progress text-[10px] font-semibold">
              {cycleDiscount.discountRule.discountType === RsDiscountType.Percentage
                ? `-${cycleDiscount.discountRule.discountValue}%`
                : `-$${cycleDiscount.discountRule.discountValue}`}
            </span>
          )}
        </div>
      )}
    </label>
  )
}
