'use client'
import type { RsServiceSubscriptionTier } from '@/modules/__generated__/graphql/switchboard-generated'
import { RadioGroupItem } from '@/modules/shared/components/ui/radio-group'
import { cn } from '@/modules/shared/lib/utils'

interface PlanSelectorItemProps {
  tier: RsServiceSubscriptionTier
}

export function PlanSelectorItem({ tier }: Readonly<PlanSelectorItemProps>) {
  const inputId = tier.id ?? tier.name

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
        <span className={cn('text-foreground/50 text-xs/5.5 font-semibold transition-colors')}>
          ${tier.pricing.amount ?? 0} / mo
        </span>
      )}
    </label>
  )
}
