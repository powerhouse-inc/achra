'use client'

import type { RsBillingCycle } from '@/modules/__generated__/graphql/switchboard-generated'
import { getAvailableCycles, PERIOD_LABELS } from '@/modules/service-purchase/lib/billing-period'
import {
  useServiceOffering,
  useServicePurchaseActions,
  useServicePurchaseState,
} from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { ToggleGroup, ToggleGroupItem } from '@/modules/shared/components/ui/toggle-group'

function BillingPeriodSelector() {
  const servicesData = useServiceOffering()
  // TODO: ADD this once api tis ready
  // const selectedTier = useSelectedTier()
  const { selectedBillingCycle } = useServicePurchaseState()
  const { setSelectedBillingCycle } = useServicePurchaseActions()
  const availableCycles = getAvailableCycles(servicesData.optionGroups)

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
          // TODO: ADD this once api tis ready
          // const discount = computePeriodDiscountLabel(selectedTier, cycle)
          const discount = 10

          return (
            <ToggleGroupItem
              key={cycle}
              value={cycle}
              className="border-border data-[state=off]:bg-background data-[state=off]:text-foreground data-[state=off]:hover:bg-accent data-[state=on]:bg-accent data-[state=on]:text-foreground data-[state=on]:hover:bg-accent/80 flex h-9.5 flex-none cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm/5.5 font-normal"
            >
              {PERIOD_LABELS[cycle]}

              <span className="bg-primary text-primary-foreground border-accent rounded-full border px-2.5 py-0.5 text-xs font-medium">
                Save {discount} %
              </span>
            </ToggleGroupItem>
          )
        })}
      </ToggleGroup>
    </div>
  )
}

export { BillingPeriodSelector }
