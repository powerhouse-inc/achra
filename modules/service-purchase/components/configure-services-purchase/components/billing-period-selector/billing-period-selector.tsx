'use client'
import {
  RsBillingCycle,
  type RsServiceSubscriptionTier,
} from '@/modules/__generated__/graphql/switchboard-generated'
import {
  useServicePurchaseActions,
  useServicePurchaseState,
} from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { cn } from '@/modules/shared/lib/utils'

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
    <div className="mb-2">
      <div
        className="flex flex-wrap items-center gap-2"
        role="radiogroup"
        aria-label="Billing period"
      >
        {availableCycles.map((cycle) => {
          const label = PERIOD_LABELS[cycle]
          const isSelected = selectedBillingCycle === cycle

          return (
            <button
              key={cycle}
              role="radio"
              aria-checked={isSelected}
              onClick={() => {
                setSelectedBillingCycle(cycle)
              }}
              className={cn(
                'inline-flex items-center justify-center rounded-xl border px-4 py-2.5 text-base font-medium transition-all',
                'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                isSelected
                  ? 'border-border bg-background text-foreground'
                  : 'border-border bg-accent/50 text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
