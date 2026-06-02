'use client'

import { useMemo } from 'react'
import type {
  ServiceOfferingFieldsFragment,
  ServiceTierFieldsFragment,
} from '@/modules/__generated__/graphql/switchboard-generated'
import {
  computeGrandSetupTotal,
  computeTierHeaderPriceWithBreakdown,
  getPriceBreakdown,
} from '@/modules/service-purchase/lib/price-breakdown-utils'
import { formatPrice } from '@/modules/service-purchase/lib/utils'
import { usePricingCalculatorContext } from '@/modules/service-purchase/providers/pricing-calculator-provider'
import {
  useAllOptionGroups,
  useHoveredTier,
} from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { cn } from '@/modules/shared/lib/utils'

const CUSTOM_PRICING_LABEL = 'Custom'

interface GrandTotalRowCatalogProps {
  selectedPlan?: string
  tiers: ServiceTierFieldsFragment[]
  offering: ServiceOfferingFieldsFragment
}

function GrandTotalRowCatalog({
  selectedPlan,
  tiers,
  offering,
}: Readonly<GrandTotalRowCatalogProps>) {
  const { tierNames, selectedBillingCycle } = usePricingCalculatorContext()
  const hoveredPlan = useHoveredTier()
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

  const setupTotals = useMemo(() => {
    const totals: Record<string, { amount: number; label: string }> = {}
    for (const tier of tiers) {
      const breakdown = getPriceBreakdown(offering, tier.id, selectedBillingCycle, activeGroupIds)
      const setupAmount = computeGrandSetupTotal(breakdown)
      totals[tier.id] = {
        amount: setupAmount,
        label: formatPrice(setupAmount, tier.pricing.currency),
      }
    }
    return totals
  }, [tiers, offering, selectedBillingCycle, activeGroupIds])

  const hasSetupFees = useMemo(
    () => Object.values(setupTotals).some((t) => t.amount > 0),
    [setupTotals],
  )

  const gridStyle = {
    '--grid-cols-lg': `4fr repeat(${tierNames.length}, minmax(144px, 1fr))`,
    '--grid-cols-xl': `4fr repeat(${tierNames.length}, minmax(220px, 1fr))`,
  } as React.CSSProperties

  return (
    <div
      className={cn(
        'bg-background border-primary/30 rounded-xl border shadow-[0px_2px_10px_2px_rgba(122,58,255,0.2)]',
        'overflow-hidden',
      )}
    >
      {/* Setup & formation row */}
      {hasSetupFees && (
        <div
          className={cn(
            'border-border grid min-h-12 grid-cols-2 items-center border-b',
            'lg:grid-cols-(--grid-cols-lg) xl:grid-cols-(--grid-cols-xl)',
          )}
          style={gridStyle}
        >
          <span
            className={cn(
              'bg-background text-foreground flex items-center px-4 text-lg/6 font-bold lg:px-6',
              'sticky left-0 z-10 lg:static',
            )}
          >
            Setup & formation
          </span>

          {/* Mobile: Show only current plan */}
          <div
            className={cn(
              'flex h-full min-w-0 items-center justify-center gap-2 px-4 transition-colors lg:hidden',
              selectedPlan ? 'bg-primary/30' : 'bg-background',
            )}
          >
            {selectedPlan && setupTotals[selectedPlan].amount > 0 && (
              <span className="text-primary dark:text-primary-foreground text-lg/6 font-bold whitespace-nowrap">
                One-time: <span className="font-semibold">{setupTotals[selectedPlan].label}</span>
              </span>
            )}
          </div>

          {/* Desktop: Show all plans — value only in the selected tier */}
          {tierNames.map((plan) => {
            const isActive = selectedPlan === plan
            const setup = setupTotals[plan]

            return (
              <div
                key={plan}
                className={cn(
                  'hidden h-full min-w-0 items-center justify-center px-6 transition-colors lg:flex',
                  isActive ? 'bg-primary/30' : 'bg-background',
                  hoveredPlan === plan && !isActive && 'bg-accent/80',
                )}
              >
                {isActive && setup.amount > 0 && (
                  <span className="text-primary dark:text-primary-foreground flex min-w-0 flex-wrap items-center justify-center gap-x-2 text-center">
                    <span className="text-sm/5 font-bold xl:text-lg/6">One-time:</span>
                    <span className="text-sm/5 font-semibold xl:text-lg/6">{setup.label}</span>
                  </span>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Grand Total (Recurring) row */}
      <div
        className={cn(
          'grid h-12 grid-cols-2 items-center',
          'lg:grid-cols-(--grid-cols-lg) xl:grid-cols-(--grid-cols-xl)',
        )}
        style={gridStyle}
      >
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
            className={cn(
              'text-xl font-bold',
              selectedPlan ? 'text-primary dark:text-primary-foreground' : 'text-foreground',
            )}
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
                hoveredPlan === plan && !isActive && 'bg-accent/80',
              )}
            >
              <span
                className={cn(
                  'text-lg/6 font-bold',
                  isActive ? 'text-primary dark:text-primary-foreground' : 'text-foreground',
                )}
              >
                {planTotals[plan]}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { GrandTotalRowCatalog }
