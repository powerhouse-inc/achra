'use client'

import { useCallback, useMemo, useState } from 'react'
import type { RsServiceOffering } from '@/modules/__generated__/graphql/switchboard-generated'
import {
  buildServiceMetrics,
  buildServiceValues,
  DEFAULT_PLAN_INDEX,
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

  // Mobile carousel state - track which plan is visible on mobile
  const [mobilePlanIndex, setMobilePlanIndex] = useState(() => {
    const index = tierNames.indexOf(selectedPlan ?? '')
    return index >= 0 ? index : DEFAULT_PLAN_INDEX
  })

  // Derived state: current plan shown in mobile carousel
  const currentMobilePlan = tierNames[mobilePlanIndex]

  const handlePlanChange = useCallback(
    (plan: string) => {
      if (!onPlanChange) return
      onPlanChange(plan)
      // Sync mobile carousel to selected plan
      const newIndex = tierNames.indexOf(plan)
      if (newIndex >= 0) {
        setMobilePlanIndex(newIndex)
      }
    },
    [onPlanChange, tierNames],
  )

  const toggleSection = useCallback(
    (sectionId: string, enabled: boolean) => {
      if (!onSectionToggle) return
      onSectionToggle(sectionId, enabled)
    },
    [onSectionToggle],
  )

  // Carousel navigation handlers
  const handlePrevPlan = useCallback(() => {
    const newIndex = mobilePlanIndex > 0 ? mobilePlanIndex - 1 : tierNames.length - 1
    setMobilePlanIndex(newIndex)
    handlePlanChange(tierNames[newIndex])
  }, [handlePlanChange, mobilePlanIndex, tierNames])

  const handleNextPlan = useCallback(() => {
    const newIndex = mobilePlanIndex < tierNames.length - 1 ? mobilePlanIndex + 1 : 0
    setMobilePlanIndex(newIndex)
    handlePlanChange(tierNames[newIndex])
  }, [handlePlanChange, mobilePlanIndex, tierNames])

  const contextValue = useMemo(
    () => ({
      activePlan: selectedPlan,
      currentMobilePlan,
      mobilePlanIndex,
      onPrevPlan: handlePrevPlan,
      onNextPlan: handleNextPlan,
      tierNames,
      tiers: servicesData.tiers,
    }),
    [
      selectedPlan,
      currentMobilePlan,
      mobilePlanIndex,
      handlePrevPlan,
      handleNextPlan,
      tierNames,
      servicesData.tiers,
    ],
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
                    activePlan={selectedPlan}
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

                    <ServiceCatalogFooter optionGroup={section} tiers={servicesData.tiers} />
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
