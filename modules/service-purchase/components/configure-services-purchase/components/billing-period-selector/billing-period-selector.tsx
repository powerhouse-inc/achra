'use client'

import {
  RsBillingCycle,
  type RsServiceSubscriptionTier,
} from '@/modules/__generated__/graphql/switchboard-generated'
import {
  useServicePurchaseActions,
  useServicePurchaseState,
} from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { ToggleGroup, ToggleGroupItem } from '@/modules/shared/components/ui/toggle-group'

const PERIOD_ORDER: RsBillingCycle[] = [
  RsBillingCycle.Monthly,
  RsBillingCycle.Quarterly,
  RsBillingCycle.SemiAnnual,
  RsBillingCycle.Annual,
  RsBillingCycle.OneTime,
]

const PERIOD_LABELS: Record<RsBillingCycle, string> = {
  [RsBillingCycle.Monthly]: 'Monthly',
  [RsBillingCycle.Quarterly]: 'Quarterly',
  [RsBillingCycle.SemiAnnual]: 'Semi-Annual',
  [RsBillingCycle.Annual]: 'Annual',
  [RsBillingCycle.OneTime]: 'One-Time',
}

// TODO: replace with real discount data from API once endpoint is stable
const PERIOD_DISCOUNTS: Partial<Record<RsBillingCycle, string>> = {
  [RsBillingCycle.Quarterly]: '5%',
  [RsBillingCycle.SemiAnnual]: '10%',
  [RsBillingCycle.Annual]: '20%',
}

function getAvailableCycles(tiers: RsServiceSubscriptionTier[]): RsBillingCycle[] {
  const cyclesSet = new Set<RsBillingCycle>()

  for (const tier of tiers) {
    if (tier.defaultBillingCycle) {
      cyclesSet.add(tier.defaultBillingCycle)
    }
    for (const { billingCycle } of tier.billingCycleDiscounts) {
      cyclesSet.add(billingCycle)
    }
  }

  return PERIOD_ORDER.filter((cycle) => cyclesSet.has(cycle))
}

interface BillingPeriodSelectorProps {
  // TODO: replace with API data once endpoint is stable — currently using SERVICES_DATA mock
  tiers: RsServiceSubscriptionTier[]
}

export function BillingPeriodSelector({ tiers }: Readonly<BillingPeriodSelectorProps>) {
  const { selectedBillingCycle } = useServicePurchaseState()
  const { setSelectedBillingCycle } = useServicePurchaseActions()
  const availableCycles = getAvailableCycles(tiers)

  if (availableCycles.length === 0) return null

  return (
    <div className="mb-2 flex justify-center">
      <ToggleGroup
        type="single"
        value={selectedBillingCycle}
        onValueChange={(value) => {
          // Prevent deselection — a billing cycle must always be selected
          if (value) setSelectedBillingCycle(value as RsBillingCycle)
        }}
        aria-label="Billing period"
        className="flex w-fit flex-wrap gap-2"
      >
        {availableCycles.map((cycle) => {
          const discount = PERIOD_DISCOUNTS[cycle]

          return (
            <ToggleGroupItem
              key={cycle}
              value={cycle}
              className="border-border data-[state=off]:bg-background data-[state=off]:text-foreground data-[state=on]:bg-accent data-[state=on]:text-foreground h-auto flex-none rounded-md border px-3! py-2.5! text-base font-medium first:rounded-xl last:rounded-xl"
            >
              {PERIOD_LABELS[cycle]}
              {discount && (
                <span className="bg-primary text-primary-foreground border-primary-foreground/30 ml-1.5 rounded-full border px-2 py-0.5 text-xs font-semibold">
                  Save {discount}
                </span>
              )}
            </ToggleGroupItem>
          )
        })}
      </ToggleGroup>
    </div>
  )
}
