'use client'

import { useMemo } from 'react'
import type {
  RsServiceOffering,
  RsServiceSubscriptionTier,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { computeTierHeaderPriceWithBreakdown } from '@/modules/service-purchase/lib/price-breakdown-utils'
import { formatPrice } from '@/modules/service-purchase/lib/utils'
import { usePricingCalculatorContext } from '@/modules/service-purchase/providers/pricing-calculator-provider'
import { useAllOptionGroups } from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { cn } from '@/modules/shared/lib/utils'

const CUSTOM_PRICING_LABEL = 'Custom'

interface GrandTotalRowCatalogProps {
  selectedPlan?: string
  tiers: RsServiceSubscriptionTier[]
  offering: RsServiceOffering
}

function GrandTotalRowCatalog({
  selectedPlan,
  tiers,
  offering,
}: Readonly<GrandTotalRowCatalogProps>) {
  const { tierNames, selectedBillingCycle } = usePricingCalculatorContext()
  const storeOptionGroups = useAllOptionGroups()

  const activeGroupIds = useMemo(
    () => new Set(storeOptionGroups.filter((g) => g.isSelected).map((g) => g.id)),
    [storeOptionGroups],
  )

  const planTotals = useMemo(() => {
    const totals: Record<string, string> = {}
    for (const tier of tiers) {
      if (tier.isCustomPricing) {
        totals[tier.id] = CUSTOM_PRICING_LABEL
        continue
      }
      const monthlyTotal = computeTierHeaderPriceWithBreakdown(
        offering,
        tier.id,
        selectedBillingCycle,
        activeGroupIds,
      )
      totals[tier.id] = `${formatPrice(monthlyTotal, tier.pricing.currency)}/mo`
    }
    return totals
  }, [tiers, offering, selectedBillingCycle, activeGroupIds])

  return (
    <div
      className={cn(
        'bg-background border-primary/30 h-12 items-center rounded-xl border shadow-[0px_2px_10px_2px_rgba(122,58,255,0.2)]',
        'grid grid-cols-2 lg:grid-cols-[var(--grid-cols-lg)] xl:grid-cols-[var(--grid-cols-xl)]',
        'overflow-hidden',
      )}
      style={
        {
          '--grid-cols-lg': `4fr repeat(${tierNames.length}, minmax(144px, 1fr))`,
          '--grid-cols-xl': `4fr repeat(${tierNames.length}, minmax(220px, 1fr))`,
        } as React.CSSProperties
      }
    >
      {/* Label column - sticky on mobile */}
      <span
        className={cn(
          'bg-background text-foreground flex items-center px-4 text-lg/6 font-bold lg:px-6',
          'sticky left-0 z-10 lg:static',
        )}
      >
        Grand Total (Recurring)
      </span>

      {/* Mobile: Show only current plan */}
      <div
        className={cn(
          'flex h-full min-w-0 items-center justify-center px-4 transition-colors lg:hidden',
          selectedPlan ? 'bg-primary/30' : 'bg-background',
        )}
      >
        <span
          className={cn('text-xl font-bold', selectedPlan ? 'text-primary' : 'text-foreground')}
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
              'hidden h-full min-w-0 items-center justify-center px-6 transition-colors lg:flex',
              isActive ? 'bg-primary/30' : 'bg-background',
            )}
          >
            <span
              className={cn('text-lg/6 font-bold', isActive ? 'text-primary' : 'text-foreground')}
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
