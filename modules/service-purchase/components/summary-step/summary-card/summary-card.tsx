'use client'

import { Landmark } from 'lucide-react'
import { useMemo } from 'react'
import { RsGroupCostType } from '@/modules/__generated__/graphql/switchboard-generated'
import { BILLING_CYCLE_LABELS } from '@/modules/service-purchase/config/constants'
import {
  getGroupPriceFromBreakdown,
  getPriceBreakdown,
} from '@/modules/service-purchase/lib/price-breakdown-utils'
import { sortOptionGroups } from '@/modules/service-purchase/lib/utils'
import {
  useAllOptionGroups,
  usePurchaseTotals,
  useSelectedBillingCycle,
  useSelectedTier,
  useServiceOffering,
  useServicePurchaseState,
} from '@/modules/service-purchase/providers/service-purchase-store-provider'
import type { PurchaseOptionGroup } from '@/modules/service-purchase/types'
import { Card, CardContent, CardHeader } from '@/modules/shared/components/ui/card'
import { SelectedFacets } from './selected-facets'
import { Summary } from './summary-section'

interface SummaryCardProps {
  templateTitle?: string
}

function SummaryCard({ templateTitle }: SummaryCardProps) {
  const { facets } = useServicePurchaseState()
  const totals = usePurchaseTotals()
  const optionGroups = useAllOptionGroups()
  const offering = useServiceOffering()
  const selectedTier = useSelectedTier()
  const selectedBillingCycle = useSelectedBillingCycle()

  const { recurringGroups, setupGroups, recurringGroupPrices, setupGroupPrices } = useMemo(() => {
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
      selected.filter(
        (group) =>
          group.costType === RsGroupCostType.Setup &&
          (hasServicesForTier(group) || group.resolvedPrice > 0),
      ),
    )

    const recurringPrices = new Map<string, number>()
    for (const g of recurring) {
      const price = getGroupPriceFromBreakdown(breakdown, g.id, false)
      if (price) recurringPrices.set(g.id, price.amount)
    }
    const setupPrices = new Map<string, number>()
    for (const g of setup) {
      const price = getGroupPriceFromBreakdown(breakdown, g.id, true)
      if (price) setupPrices.set(g.id, price.amount)
    }

    return {
      recurringGroups: recurring,
      setupGroups: setup,
      recurringGroupPrices: recurringPrices,
      setupGroupPrices: setupPrices,
    }
  }, [optionGroups, offering, selectedTier.id, selectedBillingCycle])

  return (
    <Card className="mx-auto w-full max-w-218.5 overflow-hidden border-none p-0!">
      <CardHeader className="flex flex-row items-start justify-between gap-4 px-3 pt-3 lg:px-6 lg:pt-6">
        <div className="flex items-start gap-2">
          <div className="bg-primary flex size-12 shrink-0 items-center justify-center rounded-2xl">
            <Landmark className="text-primary-foreground size-6" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col justify-center gap-1 self-stretch">
            <h2 className="text-foreground text-sm/5.5 leading-tight font-bold lg:text-lg lg:leading-[120%]">
              {templateTitle}
            </h2>
            <span className="text-foreground/70 text-xs font-medium uppercase lg:text-sm/5.5">
              Resource Template
            </span>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <div className="flex flex-col items-end sm:flex-row sm:items-baseline sm:gap-2">
            {!(selectedTier.name === 'Custom' && selectedTier.isCustomPricing) && (
              <span className="text-foreground text-sm/5.5 font-bold lg:text-base/6">
                {selectedTier.name}
              </span>
            )}
            <span className="text-primary text-base/6 font-semibold lg:leading-7">
              {selectedTier.isCustomPricing ? 'Custom' : `$${totals.recurringTotal}/mo`}
            </span>
          </div>
          <span className="text-foreground text-xs/4.5 font-medium">
            {BILLING_CYCLE_LABELS[selectedBillingCycle]}
          </span>
          {totals.setupTotal > 0 && (
            <span className="text-foreground/70 text-xs/4.5 font-medium">
              + ${totals.setupTotal} Setup
            </span>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 p-0! pb-3! lg:pb-6!">
        {facets.length > 0 && <SelectedFacets />}

        <div className="flex flex-col gap-4 px-3 lg:px-6">
          {recurringGroups.length > 0 && (
            <Summary.Provider
              sectionLabel="Recurring"
              totalSuffix="/mo"
              groupPrices={recurringGroupPrices}
              isCustomPricing={selectedTier.isCustomPricing}
            >
              <Summary.Card>
                <Summary.Header />
                <Summary.Content>
                  {recurringGroups.map((group) => (
                    <Summary.Group key={group.id} group={group} />
                  ))}
                </Summary.Content>
                <Summary.Total totalAmount={totals.recurringTotal} />
              </Summary.Card>
            </Summary.Provider>
          )}

          {setupGroups.length > 0 && (
            <Summary.Provider
              sectionLabel="ONE-TIME FEE"
              totalSuffix=""
              groupPrices={setupGroupPrices}
            >
              <Summary.Card>
                <Summary.Header />
                <Summary.Content>
                  {setupGroups.map((group) => (
                    <Summary.Group key={group.id} group={group} />
                  ))}
                </Summary.Content>
              </Summary.Card>
            </Summary.Provider>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export { SummaryCard }
