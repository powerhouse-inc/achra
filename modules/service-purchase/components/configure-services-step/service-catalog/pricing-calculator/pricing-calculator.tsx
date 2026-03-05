'use client'

import { useCallback, useMemo } from 'react'
import { RsGroupCostType } from '@/modules/__generated__/graphql/switchboard-generated'
import { DEFAULT_PLAN_INDEX } from '@/modules/service-purchase/config/constants'
import {
  computeTierHeaderPriceWithBreakdown,
  getGroupPriceFromBreakdown,
  getPriceBreakdown,
} from '@/modules/service-purchase/lib/price-breakdown-utils'
import {
  buildServiceMetrics,
  buildServiceValues,
  computeOptionGroupHeaderPrices,
  getBillingCycleValue,
  getCostType,
  getCurrency,
  resolveAddOnDisplayPrice,
  sortOptionGroups,
} from '@/modules/service-purchase/lib/utils'
import { PricingCalculatorProvider } from '@/modules/service-purchase/providers/pricing-calculator-provider'
import {
  useAllOptionGroups,
  useComputedTiers,
  useSelectedTier,
  useServiceOffering,
  useServicePurchaseActions,
  useServicePurchaseState,
} from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { CatalogStatus } from '@/modules/service-purchase/types'
import { Card } from '@/modules/shared/components/ui/card'
import { ServiceCatalogBody, ServiceCatalogHeader, ServiceCatalogRoot, ServiceCatalogRow } from '..'
import { HeaderCatalogPlan } from '../header-catalog-plan'

function PricingCalculator() {
  const servicesData = useServiceOffering()
  const tier = useSelectedTier()
  const tiers = useComputedTiers()
  const { setSelectedTier, setOptionGroupSelected } = useServicePurchaseActions()
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

  return (
    <PricingCalculatorProvider value={contextValue}>
      <Card className="flex w-full flex-col border-none! py-0!">
        <div className="overflow-hidden rounded-xl">
          {/* Header with Plan Selectors */}
          <HeaderCatalogPlan
            selectedPlan={selectedPlan}
            handlePlanChange={setSelectedTier}
            mobilePlanIndex={mobilePlanIndex}
            onPrevPlan={handlePrevPlan}
            onNextPlan={handleNextPlan}
            servicesData={servicesData}
          />
          {/* Service Sections */}
          <div className="flex flex-col">
            {sortOptionGroups(servicesData.optionGroups).map((section) => {
              const rowBody = servicesData.services.filter((s) => s.optionGroupId === section.id)

              // For add-ons, resolve both the base price and the discounted price
              // (accounting for billing cycle and discountMode).
              const addOnDisplayPrice = section.isAddOn
                ? resolveAddOnDisplayPrice(section, tier.id, billingPeriod)
                : null

              // For non-add-on recurring groups, show per-tier prices in the header.
              const perTierPrices = computeOptionGroupHeaderPrices(section, tiers, billingPeriod)

              const isAddOnSelected =
                storeOptionGroups.find((og) => og.id === section.id)?.isSelected ?? false

              return (
                <ServiceCatalogRoot
                  key={section.id}
                  isEnabled={!section.isAddOn || isAddOnSelected}
                >
                  <ServiceCatalogHeader
                    title={section.name}
                    badge={section.isAddOn ? CatalogStatus.Optional : CatalogStatus.Included}
                    hasToggle={section.isAddOn}
                    toggleLabel={section.name}
                    toggleEnabled={isAddOnSelected}
                    onToggleChange={
                      section.isAddOn
                        ? (enabled: boolean) => {
                            setOptionGroupSelected(section.id, enabled)
                          }
                        : undefined
                    }
                    groupPrice={
                      section.isAddOn ? addOnDisplayPrice?.basePrice : getBillingCycleValue(section)
                    }
                    groupDiscountedPrice={
                      section.isAddOn
                        ? addOnDisplayPrice?.discountedPrice
                        : section.costType === RsGroupCostType.Setup &&
                            setupDiscountedPrices[section.id] != null &&
                            setupDiscountedPrices[section.id] !== section.price
                          ? setupDiscountedPrices[section.id]
                          : undefined
                    }
                    groupCurrency={getCurrency(section)}
                    groupCostType={getCostType(section)}
                    perTierPrices={perTierPrices}
                  />

                  <ServiceCatalogBody>
                    {rowBody.map((row) => (
                      <ServiceCatalogRow
                        key={row.id}
                        label={row.title}
                        sublabel={row.description ?? undefined}
                        values={buildServiceValues(row.id, tiers)}
                        metrics={buildServiceMetrics(row.id, tiers)}
                      />
                    ))}
                  </ServiceCatalogBody>
                </ServiceCatalogRoot>
              )
            })}
          </div>
        </div>
      </Card>
    </PricingCalculatorProvider>
  )
}

export { PricingCalculator }
