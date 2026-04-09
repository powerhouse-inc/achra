'use client'

import { useMemo } from 'react'
import { type Maybe, RsGroupCostType } from '@/modules/__generated__/graphql/switchboard-generated'
import { BILLING_CYCLE_SUFFIXES } from '@/modules/service-purchase/config/constants'
import {
  getGroupPriceFromBreakdown,
  getPriceBreakdown,
} from '@/modules/service-purchase/lib/price-breakdown-utils'
import { sortOptionGroups } from '@/modules/service-purchase/lib/utils'
import {
  useAllOptionGroups,
  useFacets,
  usePurchaseTotals,
  useSelectedBillingCycle,
  useSelectedTier,
  useServiceOffering,
} from '@/modules/service-purchase/providers/service-purchase-store-provider'
import type { PurchaseOptionGroup } from '@/modules/service-purchase/types'
import { Card, CardContent } from '@/modules/shared/components/ui/card'
import { SelectedFacets } from './selected-facets'
import { SummaryCardHeader } from './summary-card-header'
import { Summary } from './summary-section'

interface SummaryCardProps {
  templateTitle?: string
  templateSubtitle?: Maybe<string>
}

function SummaryCard({ templateTitle, templateSubtitle }: SummaryCardProps) {
  const facets = useFacets()
  const totals = usePurchaseTotals()
  const optionGroups = useAllOptionGroups()
  const offering = useServiceOffering()
  const selectedTier = useSelectedTier()
  const selectedBillingCycle = useSelectedBillingCycle()

  const {
    recurringGroups,
    setupGroups,
    recurringGroupPrices,
    setupGroupPrices,
    originalRecurringTotal,
  } = useMemo(() => {
    const selected = optionGroups.filter((g) => g.isSelected)
    const activeGroupIds = new Set(selected.map((g) => g.id))
    const breakdown = getPriceBreakdown(
      offering,
      selectedTier.id,
      selectedBillingCycle,
      activeGroupIds,
    )

    const hasServicesForTier = (group: PurchaseOptionGroup): boolean => group.services.length > 0

    const recurring = sortOptionGroups(
      selected.filter(
        (group) => group.costType === RsGroupCostType.Recurring && hasServicesForTier(group),
      ),
    )
    const setup = sortOptionGroups(
      selected.filter((group) => {
        if (group.costType === RsGroupCostType.Setup) {
          return hasServicesForTier(group) || group.resolvedPrice > 0
        }
        // Add-ons with both setup and recurring appear in addOnBreakdowns with setupCost
        if (group.costType === RsGroupCostType.Recurring && group.isAddOn) {
          const setupPrice = getGroupPriceFromBreakdown(breakdown, group.id, true)
          return setupPrice != null && setupPrice.amount > 0
        }
        return false
      }),
    )

    const recurringPrices = new Map<
      string,
      { amount: number; originalAmount: number; discountPercent: number | null }
    >()
    let origRecurringSum = 0
    for (const g of recurring) {
      const price = getGroupPriceFromBreakdown(breakdown, g.id, false)
      if (price) {
        recurringPrices.set(g.id, {
          amount: price.amount,
          originalAmount: price.originalAmount,
          discountPercent: price.discountPercent,
        })
        origRecurringSum += price.originalAmount
      }
    }
    const setupPrices = new Map<
      string,
      { amount: number; originalAmount: number; discountPercent: number | null }
    >()
    for (const g of setup) {
      const price = getGroupPriceFromBreakdown(breakdown, g.id, true)
      if (price)
        setupPrices.set(g.id, {
          amount: price.amount,
          originalAmount: price.originalAmount,
          discountPercent: price.discountPercent,
        })
    }

    return {
      recurringGroups: recurring,
      setupGroups: setup,
      recurringGroupPrices: recurringPrices,
      setupGroupPrices: setupPrices,
      originalRecurringTotal: origRecurringSum,
    }
  }, [optionGroups, offering, selectedTier.id, selectedBillingCycle])

  return (
    <Card className="mx-auto w-full max-w-218.5 border-none p-0!">
      <SummaryCardHeader templateTitle={templateTitle} templateSubtitle={templateSubtitle} />

      <CardContent className="flex flex-col gap-6 p-0! pb-3! lg:pb-6!">
        {facets.length > 0 && <SelectedFacets />}

        <div className="flex flex-col gap-4 px-3 lg:px-6">
          {recurringGroups.length > 0 && (
            <Summary.Provider
              sectionLabel="Recurring"
              totalSuffix={BILLING_CYCLE_SUFFIXES[selectedBillingCycle]}
              groupPrices={recurringGroupPrices}
              isCustomPricing={selectedTier.isCustomPricing}
              currency={selectedTier.pricing.currency}
            >
              <Summary.Card>
                <Summary.Header />
                <Summary.Content>
                  {recurringGroups.map((group) => (
                    <Summary.Group key={group.id} group={group} />
                  ))}
                </Summary.Content>
                <Summary.Total
                  totalAmount={totals.recurringTotal}
                  originalTotalAmount={originalRecurringTotal}
                />
              </Summary.Card>
            </Summary.Provider>
          )}

          {setupGroups.length > 0 && (
            <Summary.Provider
              sectionLabel="ONE-TIME FEE"
              totalSuffix=""
              groupPrices={setupGroupPrices}
              currency={selectedTier.pricing.currency}
            >
              <Summary.Card>
                <Summary.Header />
                <Summary.Content>
                  {setupGroups.map((group) => (
                    <Summary.Group key={group.id} group={group} />
                  ))}
                </Summary.Content>
                {setupGroups.length > 1 && <Summary.Total totalAmount={totals.setupTotal} />}
              </Summary.Card>
            </Summary.Provider>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export { SummaryCard }
