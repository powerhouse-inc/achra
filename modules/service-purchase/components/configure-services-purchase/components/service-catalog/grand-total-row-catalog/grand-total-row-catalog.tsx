'use client'

import { useMemo } from 'react'
import type {
  RsOfferingOptionGroup,
  RsServiceSubscriptionTier,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { computeGrandTotals } from '@/modules/service-purchase/lib/utils'
import { useAllOptionGroups } from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { cn } from '@/modules/shared/lib/utils'
import { usePricingCalculatorContext } from '@/modules/service-purchase/providers/pricing-calculator-provider'

interface GrandTotalRowCatalogProps {
  selectedPlan?: string
  /** Tier list from the service offering */
  tiers: RsServiceSubscriptionTier[]
  /** Pre-filtered option groups (facet-invisible groups must already be excluded) */
  optionGroups: RsOfferingOptionGroup[]
}

function GrandTotalRowCatalog({
  selectedPlan,
  tiers,
  optionGroups,
}: Readonly<GrandTotalRowCatalogProps>) {
  const { tierNames, selectedBillingCycle } = usePricingCalculatorContext()
  const storeOptionGroups = useAllOptionGroups()

  const enabledSections = useMemo(
    () => Object.fromEntries(storeOptionGroups.map((g) => [g.id, g.isSelected])),
    [storeOptionGroups],
  )

  const planTotals = useMemo(
    () => computeGrandTotals(tiers, optionGroups, enabledSections, selectedBillingCycle),
    [tiers, optionGroups, enabledSections, selectedBillingCycle],
  )

  return (
    <div
      className={cn('items-center', 'grid grid-cols-2 lg:grid-cols-[var(--grid-cols)]')}
      style={
        {
          '--grid-cols': `4fr repeat(${tierNames.length}, 1fr)`,
        } as React.CSSProperties
      }
    >
      {/* Label column - sticky on mobile */}
      <span
        className={cn(
          'bg-background text-foreground flex min-h-14 items-center px-4 text-xs font-bold uppercase lg:px-6 lg:text-sm',
          'sticky left-0 z-10 lg:static',
        )}
      >
        Grand Total (Recurring)
      </span>

      {/* Mobile: Show only current plan */}
      <div
        className={cn(
          'flex min-h-14 min-w-0 items-center justify-center px-4 transition-colors lg:hidden',
          !!selectedPlan && 'bg-primary/10',
        )}
      >
        <span
          className={cn('text-sm font-bold', selectedPlan ? 'text-primary' : 'text-foreground')}
        >
          {(selectedPlan && planTotals[selectedPlan]) ?? '—'}
        </span>
      </div>

      {/* Desktop: Show all plans */}
      {tierNames.map((plan) => {
        const isActive = selectedPlan === plan

        return (
          <div
            key={plan}
            className={cn(
              'hidden min-h-14 min-w-0 items-center justify-center px-6 transition-colors lg:flex',
              isActive && 'bg-primary/10',
            )}
          >
            <span
              className={cn('text-sm font-bold', isActive ? 'text-primary' : 'text-foreground')}
            >
              {planTotals[plan]}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export { GrandTotalRowCatalog }
