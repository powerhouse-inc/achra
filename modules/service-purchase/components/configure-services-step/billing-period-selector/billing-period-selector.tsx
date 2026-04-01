'use client'

import { useMemo } from 'react'
import type { RsBillingCycle } from '@/modules/__generated__/graphql/switchboard-generated'
import { getAvailableCycles, PERIOD_LABELS } from '@/modules/service-purchase/lib/billing-period'
import {
  computePeriodDiscountLabel,
  resolveDiscountReferenceTierId,
} from '@/modules/service-purchase/lib/price-breakdown-utils'
import {
  useComputedTiers,
  useOptionGroups,
  useSelectedAddOns,
  useSelectedTier,
  useServiceOffering,
  useServicePurchaseActions,
  useServicePurchaseState,
} from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { ToggleGroup, ToggleGroupItem } from '@/modules/shared/components/ui/toggle-group'

function BillingPeriodSelector() {
  const servicesData = useServiceOffering()
  const selectedTier = useSelectedTier()
  const allTiers = useComputedTiers()
  const { selectedBillingCycle } = useServicePurchaseState()
  const { setSelectedBillingCycle } = useServicePurchaseActions()
  const optionGroups = useOptionGroups()
  const selectedAddOns = useSelectedAddOns()
  const availableCycles = getAvailableCycles(servicesData.availableBillingCycles)

  const activeGroupIds = useMemo(
    () => new Set([...optionGroups.map((g) => g.id), ...selectedAddOns.map((a) => a.id)]),
    [optionGroups, selectedAddOns],
  )

  const discountReferenceTierId = useMemo(
    () =>
      resolveDiscountReferenceTierId(
        servicesData,
        selectedTier,
        allTiers,
        selectedBillingCycle,
        activeGroupIds,
      ),
    [servicesData, selectedTier, allTiers, selectedBillingCycle, activeGroupIds],
  )

  if (availableCycles.length === 0) return null

  return (
    <div className="flex justify-center">
      <ToggleGroup
        type="single"
        value={selectedBillingCycle}
        onValueChange={(value) => {
          if (value) setSelectedBillingCycle(value as RsBillingCycle)
        }}
        aria-label="Billing period"
        className="gap-1"
      >
        {availableCycles.map((cycle) => {
          const discountLabel = selectedTier.isCustomPricing
            ? cycle !== availableCycles[0]
              ? 'Custom'
              : null
            : computePeriodDiscountLabel(
                servicesData,
                discountReferenceTierId,
                cycle,
                activeGroupIds,
              )

          return (
            <ToggleGroupItem
              key={cycle}
              value={cycle}
              className="group border-border data-[state=off]:bg-background data-[state=off]:text-foreground data-[state=off]:hover:bg-accent data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary data-[state=on]:hover:bg-primary/90 flex h-9.5 flex-none cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm/5.5 font-normal"
            >
              {PERIOD_LABELS[cycle]}

              {discountLabel && (
                <span className="bg-primary text-primary-foreground group-data-[state=on]:bg-primary-foreground group-data-[state=on]:text-primary rounded-full border border-transparent px-2.5 py-0.5 text-xs font-medium">
                  {discountLabel}
                </span>
              )}
            </ToggleGroupItem>
          )
        })}
      </ToggleGroup>
    </div>
  )
}

export { BillingPeriodSelector }
