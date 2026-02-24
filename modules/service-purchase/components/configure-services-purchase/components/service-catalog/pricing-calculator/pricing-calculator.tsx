'use client'

import { useCallback, useMemo } from 'react'
import type {
  RsBillingCycle,
  RsServiceOffering,
} from '@/modules/__generated__/graphql/switchboard-generated'
import {
  buildServiceMetrics,
  buildServiceValues,
  DEFAULT_PLAN_INDEX,
  getBillingCycleValue,
  getConstTpe,
  getCurrency,
  isServiceVisibleForFacets,
  resolveAddOnDisplayPrice,
} from '@/modules/service-purchase/lib/utils'
import { Card } from '@/modules/shared/components/ui/card'
import {
  CatalogStatus,
  ServiceCatalogBody,
  ServiceCatalogFooter,
  ServiceCatalogHeader,
  ServiceCatalogRoot,
  ServiceCatalogRow,
} from '..'
import { GrandTotalRowCatalog } from '../grand-total-row-catalog'
import { HeaderCatalogPlan } from '../header-catalog-plan'
import { PricingCalculatorProvider } from '../pricing-calculator-context'
export interface PricingCalculatorProps {
  selectedPlan?: string
  enabledSections?: Record<string, boolean>
  onPlanChange?: (plan: string) => void
  onSectionToggle?: (sectionId: string, enabled: boolean) => void
  servicesData: RsServiceOffering
  billingPeriod: RsBillingCycle
  /** Current facet selections: categoryKey → selected option value */
  facetSelections?: Record<string, string>
}

export function PricingCalculator({
  selectedPlan,
  enabledSections,
  onPlanChange,
  onSectionToggle,
  servicesData,
  billingPeriod,
  facetSelections,
}: Readonly<PricingCalculatorProps>) {
  /** Tier names derived from API data, used for column iteration and carousel */
  const tierNames = useMemo(() => servicesData.tiers.map((t) => t.name), [servicesData.tiers])

  /**
   * Services that pass the current facet filter.
   * When no facetSelections are provided, all services are visible.
   */
  const visibleServices = useMemo(() => {
    if (!facetSelections) return servicesData.services
    return servicesData.services.filter((service) =>
      isServiceVisibleForFacets(service, facetSelections, servicesData.facetTargets),
    )
  }, [facetSelections, servicesData.services, servicesData.facetTargets])

  /**
   * Option groups that still have at least one visible service.
   * Groups with no services assigned are always shown (not affected by facet filter).
   * Hidden groups are also excluded from grand-total calculations.
   */
  const visibleOptionGroups = useMemo(() => {
    if (!facetSelections) return servicesData.optionGroups

    const visibleServiceIds = new Set(visibleServices.map((s) => s.optionGroupId).filter(Boolean))

    return servicesData.optionGroups.filter((group) => {
      const groupHasServices = servicesData.services.some((s) => s.optionGroupId === group.id)
      if (!groupHasServices) return true // no services → always visible
      return visibleServiceIds.has(group.id)
    })
  }, [facetSelections, visibleServices, servicesData.optionGroups, servicesData.services])

  /** Currently selected tier object, used to resolve add-on display prices */
  const selectedTier = useMemo(
    () => servicesData.tiers.find((t) => t.name === (selectedPlan ?? '')) ?? null,
    [servicesData.tiers, selectedPlan],
  )

  // Carousel index is always derived from selectedPlan — single source of truth
  const mobilePlanIndex = useMemo(() => {
    const idx = tierNames.indexOf(selectedPlan ?? '')
    return idx >= 0 ? idx : DEFAULT_PLAN_INDEX
  }, [selectedPlan, tierNames])

  const handlePlanChange = useCallback(
    (plan: string) => {
      if (!onPlanChange) return
      onPlanChange(plan)
    },
    [onPlanChange],
  )

  const toggleSection = useCallback(
    (sectionId: string, enabled: boolean) => {
      if (!onSectionToggle) return
      onSectionToggle(sectionId, enabled)
    },
    [onSectionToggle],
  )

  // Carousel navigation: compute next index from current, then select that plan
  const handlePrevPlan = useCallback(() => {
    const newIndex = mobilePlanIndex > 0 ? mobilePlanIndex - 1 : tierNames.length - 1
    handlePlanChange(tierNames[newIndex])
  }, [handlePlanChange, mobilePlanIndex, tierNames])

  const handleNextPlan = useCallback(() => {
    const newIndex = mobilePlanIndex < tierNames.length - 1 ? mobilePlanIndex + 1 : 0
    handlePlanChange(tierNames[newIndex])
  }, [handlePlanChange, mobilePlanIndex, tierNames])

  const contextValue = useMemo(
    () => ({
      activePlan: selectedPlan,
      onPrevPlan: handlePrevPlan,
      onNextPlan: handleNextPlan,
      tierNames,
      tiers: servicesData.tiers,
      selectedBillingCycle: billingPeriod,
    }),
    [selectedPlan, handlePrevPlan, handleNextPlan, tierNames, servicesData.tiers, billingPeriod],
  )

  return (
    <PricingCalculatorProvider value={contextValue}>
      <Card className="flex w-full flex-col border-none! py-0!">
        <div className="overflow-hidden rounded-xl">
          {/* Header with Plan Selectors */}
          <HeaderCatalogPlan
            selectedPlan={selectedPlan}
            handlePlanChange={handlePlanChange}
            mobilePlanIndex={mobilePlanIndex}
            onPrevPlan={handlePrevPlan}
            onNextPlan={handleNextPlan}
            servicesData={servicesData}
          />
          {/* Service Sections */}
          <div className="flex flex-col">
            {[...visibleOptionGroups]
              .sort((a, b) => Number(a.isAddOn) - Number(b.isAddOn))
              .map((section) => {
                const rowBody = visibleServices.filter((s) => s.optionGroupId === section.id)

                // For add-ons, resolve both the base price and the discounted price
                // (accounting for billing cycle and discountMode).
                const addOnDisplayPrice = section.isAddOn
                  ? resolveAddOnDisplayPrice(
                      section,
                      selectedTier?.id ?? '',
                      billingPeriod,
                      selectedTier?.billingCycleDiscounts ?? [],
                    )
                  : null

                return (
                  <ServiceCatalogRoot
                    key={section.id}
                    isEnabled={!section.isAddOn || (enabledSections?.[section.id] ?? false)}
                  >
                    <ServiceCatalogHeader
                      title={section.name}
                      badge={section.isAddOn ? CatalogStatus.Optional : CatalogStatus.Included}
                      hasToggle={section.isAddOn}
                      toggleLabel={section.name}
                      toggleEnabled={enabledSections?.[section.id]}
                      onToggleChange={
                        section.isAddOn
                          ? (enabled: boolean) => {
                              toggleSection(section.id, enabled)
                            }
                          : undefined
                      }
                      groupPrice={
                        section.isAddOn
                          ? addOnDisplayPrice?.basePrice
                          : getBillingCycleValue(section)
                      }
                      groupDiscountedPrice={
                        section.isAddOn ? addOnDisplayPrice?.discountedPrice : undefined
                      }
                      groupCurrency={getCurrency(section)}
                      groupCostType={getConstTpe(section)}
                    />

                    <ServiceCatalogBody>
                      {rowBody.map((row) => (
                        <ServiceCatalogRow
                          key={row.id}
                          label={row.title}
                          sublabel={row.description ?? undefined}
                          values={buildServiceValues(row.id, servicesData.tiers)}
                          metrics={buildServiceMetrics(row.id, servicesData.tiers)}
                        />
                      ))}
                    </ServiceCatalogBody>

                    <ServiceCatalogFooter
                      optionGroup={section}
                      tiers={servicesData.tiers}
                      services={servicesData.services}
                    />
                  </ServiceCatalogRoot>
                )
              })}
          </div>
          {/* Grand Total — receives only the facet-visible option groups */}
          <GrandTotalRowCatalog
            selectedPlan={selectedPlan}
            enabledSections={enabledSections}
            tiers={servicesData.tiers}
            optionGroups={visibleOptionGroups}
          />
        </div>
      </Card>
    </PricingCalculatorProvider>
  )
}
