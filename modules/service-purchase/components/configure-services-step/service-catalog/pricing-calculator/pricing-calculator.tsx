'use client'

import { useCallback, useMemo } from 'react'
import { RsGroupCostType } from '@/modules/__generated__/graphql/switchboard-generated'
import { DEFAULT_PLAN_INDEX } from '@/modules/service-purchase/config/constants'
import {
  computeTierHeaderPriceWithBreakdown,
  getGroupPriceFromBreakdown,
  getPriceBreakdown,
} from '@/modules/service-purchase/lib/price-breakdown-utils'
import { sortOptionGroups } from '@/modules/service-purchase/lib/utils'
import { PricingCalculatorProvider } from '@/modules/service-purchase/providers/pricing-calculator-provider'
import {
  useAllOptionGroups,
  useComputedTiers,
  useSelectedTier,
  useServiceOffering,
  useServicePurchaseActions,
  useServicePurchaseState,
} from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { Card } from '@/modules/shared/components/ui/card'
import { HeaderCatalogPlan } from '../header-catalog-plan'
import { OptionGroupSection } from './option-group-section'

function PricingCalculator() {
  const servicesData = useServiceOffering()
  const tier = useSelectedTier()
  const tiers = useComputedTiers()
  const { setSelectedTier } = useServicePurchaseActions()
  const selectedPlan = tier.id

  const storeOptionGroups = useAllOptionGroups()
  const { selectedBillingCycle: billingPeriod } = useServicePurchaseState()
  /** Tier names derived from API data, used for column iteration and carousel */
  const tierNames = useMemo(() => tiers.map((t) => t.id), [tiers])

  // Carousel index is always derived from selectedPlan — single source of truth
  const mobilePlanIndex = useMemo(() => {
    const idx = tierNames.indexOf(selectedPlan)
    return idx >= 0 ? idx : DEFAULT_PLAN_INDEX
  }, [selectedPlan, tierNames])

  // Carousel navigation: compute next index from current, then select that plan
  const handlePrevPlan = useCallback(() => {
    const newIndex = mobilePlanIndex > 0 ? mobilePlanIndex - 1 : tierNames.length - 1
    setSelectedTier(tierNames[newIndex])
  }, [mobilePlanIndex, tierNames, setSelectedTier])

  const handleNextPlan = useCallback(() => {
    const newIndex = mobilePlanIndex < tierNames.length - 1 ? mobilePlanIndex + 1 : 0
    setSelectedTier(tierNames[newIndex])
  }, [mobilePlanIndex, tierNames, setSelectedTier])

  const tierHeaderPrices = useMemo(() => {
    const activeGroupIds = new Set(storeOptionGroups.filter((g) => g.isSelected).map((g) => g.id))
    const prices: Record<string, number | null> = {}
    for (const t of tiers) {
      prices[t.id] = computeTierHeaderPriceWithBreakdown(
        servicesData,
        t.id,
        billingPeriod,
        activeGroupIds,
      )
    }
    return prices
  }, [tiers, storeOptionGroups, billingPeriod, servicesData])

  // Compute discounted setup costs from the breakdown for the selected tier.
  // The breakdown's setupCost already reflects billing-cycle discounts.
  const setupDiscountedPrices = useMemo(() => {
    const activeGroupIds = new Set(storeOptionGroups.filter((g) => g.isSelected).map((g) => g.id))
    const breakdown = getPriceBreakdown(servicesData, tier.id, billingPeriod, activeGroupIds)
    const prices: Record<string, number | null> = {}
    for (const section of servicesData.optionGroups) {
      if (section.isAddOn || section.costType !== RsGroupCostType.Setup) continue
      const result = getGroupPriceFromBreakdown(breakdown, section.id, true)
      prices[section.id] = result?.amount ?? null
    }
    return prices
  }, [servicesData, tier.id, billingPeriod, storeOptionGroups])

  const contextValue = useMemo(
    () => ({
      activePlan: selectedPlan,
      onPrevPlan: handlePrevPlan,
      onNextPlan: handleNextPlan,
      tierNames,
      tiers,
      selectedBillingCycle: billingPeriod,
      tierHeaderPrices,
    }),
    [
      selectedPlan,
      handlePrevPlan,
      handleNextPlan,
      tierNames,
      tiers,
      billingPeriod,
      tierHeaderPrices,
    ],
  )

  const sortedGroups = sortOptionGroups(servicesData.optionGroups)
  const setupGroups = sortedGroups.filter((g) => g.costType === RsGroupCostType.Setup)
  const recurringGroups = sortedGroups.filter((g) => g.costType !== RsGroupCostType.Setup)

  return (
    <PricingCalculatorProvider value={contextValue}>
      <div className="flex w-full flex-col gap-8">
        <div className="flex flex-col">
          {/* Setup & Formation */}
          <h2 className="text-muted-foreground mb-3 text-xs font-bold tracking-wide uppercase">
            Setup & Formation
          </h2>
          <HeaderCatalogPlan
            selectedPlan={selectedPlan}
            handlePlanChange={setSelectedTier}
            mobilePlanIndex={mobilePlanIndex}
            onPrevPlan={handlePrevPlan}
            onNextPlan={handleNextPlan}
            servicesData={servicesData}
          />
          {/* -mt-px fusiona el borde superior con el borde inferior del header */}
          <div className="-mt-px mb-8 rounded-b-xl border-x border-b shadow-sm">
            <Card className="flex w-full flex-col border-none! py-0! shadow-none!">
              <div className="overflow-clip rounded-b-xl">
                <div className="flex flex-col">
                  {setupGroups.map((section) => (
                    <OptionGroupSection
                      key={section.id}
                      section={section}
                      setupDiscountedPrices={setupDiscountedPrices}
                    />
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Recurring Services — separate visual block */}
          <h2 className="text-muted-foreground mb-3 text-xs font-bold tracking-wide uppercase">
            Recurring Services
          </h2>
          <div className="rounded-xl border shadow-sm">
            <Card className="flex w-full flex-col border-none! py-0! shadow-none!">
              <div className="overflow-clip rounded-xl">
                <div className="flex flex-col">
                  {recurringGroups.map((section) => (
                    <OptionGroupSection
                      key={section.id}
                      section={section}
                      setupDiscountedPrices={setupDiscountedPrices}
                    />
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* TODO:Remove this is not necesary in the next itaration  */}
        {/* <GrandTotalRowCatalog selectedPlan={selectedPlan} tiers={tiers} offering={servicesData} /> */}
      </div>
    </PricingCalculatorProvider>
  )
}

export { PricingCalculator }
