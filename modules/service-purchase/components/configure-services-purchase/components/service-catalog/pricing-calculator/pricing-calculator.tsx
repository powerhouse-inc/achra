'use client'

import { useCallback, useMemo } from 'react'
import type { RsServiceOffering } from '@/modules/__generated__/graphql/switchboard-generated'
import {
  buildServiceMetrics,
  buildServiceValues,
  DEFAULT_PLAN_INDEX,
  getBillingCycleValue,
  getConstTpe,
  getCurrency,
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
}

export function PricingCalculator({
  selectedPlan,
  enabledSections,
  onPlanChange,
  onSectionToggle,
  servicesData,
}: Readonly<PricingCalculatorProps>) {
  /** Tier names derived from API data, used for column iteration and carousel */
  const tierNames = useMemo(() => servicesData.tiers.map((t) => t.name), [servicesData.tiers])

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
    }),
    [selectedPlan, handlePrevPlan, handleNextPlan, tierNames, servicesData.tiers],
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
            {[...servicesData.optionGroups]
              .sort((a, b) => Number(a.isAddOn) - Number(b.isAddOn))
              .map((section) => {
                const rowBody = servicesData.services.filter((s) => s.optionGroupId === section.id)

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
                      groupPrice={getBillingCycleValue(section)}
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
          {/* Grand Total */}
          <GrandTotalRowCatalog
            selectedPlan={selectedPlan}
            enabledSections={enabledSections}
            servicesData={servicesData}
          />
        </div>
      </Card>
    </PricingCalculatorProvider>
  )
}
