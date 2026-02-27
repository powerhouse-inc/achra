'use client'
import {
  RsBillingCycle,
  type RsServiceSubscriptionTier,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { usePricingCalculatorContext } from '@/modules/service-purchase/providers/pricing-calculator-provider'
import { RadioGroupItem } from '@/modules/shared/components/ui/radio-group'
import { cn } from '@/modules/shared/lib/utils'

const BILLING_CYCLE_LABELS: Record<RsBillingCycle, string> = {
  [RsBillingCycle.Monthly]: 'Billed Monthly',
  [RsBillingCycle.Quarterly]: 'Billed Quarterly',
  [RsBillingCycle.SemiAnnual]: 'Billed Semi-Annually',
  [RsBillingCycle.Annual]: 'Billed Annually',
  [RsBillingCycle.OneTime]: 'One-time payment',
}

interface PlanSelectorItemProps {
  tier: RsServiceSubscriptionTier
}

function PlanSelectorItem({ tier }: Readonly<PlanSelectorItemProps>) {
  const inputId = tier.id
  const { selectedBillingCycle } = usePricingCalculatorContext()

  const displayPrice = Number(tier.pricing.amount ?? 0)

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
        </div>
      ) : (
        <div className="flex flex-col items-center gap-0.5">
          <span className={cn('text-foreground/50 text-xs/5.5 font-semibold transition-colors')}>
            ${Math.round(displayPrice).toLocaleString()}/mo
          </span>
          {/* TODO: add this one its api fixed */}
          {/* <span className="text-status-progress text-xs font-semibold">save {savingsLabel}</span> */}
          <span className="text-foreground text-xs leading-4.5 font-normal">
            {BILLING_CYCLE_LABELS[selectedBillingCycle]}
          </span>
        </div>
      )}
    </label>
  )
}

export { PlanSelectorItem }
