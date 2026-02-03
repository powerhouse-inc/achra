'use client'

import { useCallback, useMemo, useState } from 'react'
import { Card } from '@/modules/shared/components/ui/card'
import { PRICING_DATA } from '../../../../mock/mock-data'
import { Plan, PRICING_PLANS } from '../types'
import { GrandTotalRowCatalog } from './grand-total-row-catalog'
import HeaderCatalogPlan from './header-catalog-plan'
import { PricingCalculatorProvider } from './pricing-calculator-context'
import {
  ServiceCatalogBody,
  ServiceCatalogFooter,
  ServiceCatalogHeader,
  ServiceCatalogRoot,
  ServiceCatalogRow,
} from '.'
import type { SectionId } from '../../../service-purchase-form/service-purchase-form'

export interface PricingCalculatorProps {
  selectedPlan?: Plan
  enabledSections?: Record<SectionId, boolean>
  onPlanChange?: (plan: Plan) => void
  onSectionToggle?: (sectionId: SectionId, enabled: boolean) => void
  readOnly?: boolean
}
/** Default plan index (Team) for mobile carousel */
const DEFAULT_PLAN_INDEX = PRICING_PLANS.indexOf(Plan.Team)

export function PricingCalculator({
  selectedPlan = Plan.Team,
  enabledSections,
  onPlanChange,
  onSectionToggle,
  readOnly = false,
}: PricingCalculatorProps = {}) {
  // Mobile carousel state - track which plan is visible on mobile
  const [mobilePlanIndex, setMobilePlanIndex] = useState(() => {
    const index = PRICING_PLANS.indexOf(selectedPlan)
    return index >= 0 ? index : DEFAULT_PLAN_INDEX
  })

  // Derived state: current plan shown in mobile carousel
  const currentMobilePlan = PRICING_PLANS[mobilePlanIndex]

  const handlePlanChange = useCallback(
    (plan: Plan) => {
      if (readOnly || !onPlanChange) return
      onPlanChange(plan)
      // Sync mobile carousel to selected plan
      const newIndex = PRICING_PLANS.indexOf(plan)
      if (newIndex >= 0) {
        setMobilePlanIndex(newIndex)
      }
    },
    [readOnly, onPlanChange],
  )

  const toggleSection = useCallback(
    (sectionId: SectionId, enabled: boolean) => {
      if (readOnly || !onSectionToggle) return
      onSectionToggle(sectionId, enabled)
    },
    [readOnly, onSectionToggle],
  )

  // Carousel navigation handlers
  const handlePrevPlan = useCallback(() => {
    const newIndex = mobilePlanIndex > 0 ? mobilePlanIndex - 1 : PRICING_PLANS.length - 1
    handlePlanChange(PRICING_PLANS[newIndex])
  }, [handlePlanChange, mobilePlanIndex])

  const handleNextPlan = useCallback(() => {
    const newIndex = mobilePlanIndex < PRICING_PLANS.length - 1 ? mobilePlanIndex + 1 : 0
    handlePlanChange(PRICING_PLANS[newIndex])
  }, [handlePlanChange, mobilePlanIndex])

  const visibleSections = useMemo(
    () =>
      readOnly
        ? PRICING_DATA.sections?.filter((section) => enabledSections?.[section.id as SectionId])
        : PRICING_DATA.sections,
    [readOnly, enabledSections],
  )

  const contextValue = useMemo(
    () => ({
      activePlan: selectedPlan,
      currentMobilePlan,
      mobilePlanIndex,
      onPrevPlan: handlePrevPlan,
      onNextPlan: handleNextPlan,
      readOnly,
    }),
    [selectedPlan, currentMobilePlan, mobilePlanIndex, handlePrevPlan, handleNextPlan, readOnly],
  )

  return (
    <PricingCalculatorProvider value={contextValue}>
      <Card className="flex w-full flex-col gap-6 border-none! py-0!">
        <div className="overflow-hidden rounded-xl">
          {/* Header with Plan Selectors */}
          <HeaderCatalogPlan
            selectedPlan={selectedPlan}
            handlePlanChange={handlePlanChange}
            readOnly={readOnly}
            mobilePlanIndex={mobilePlanIndex}
            onPrevPlan={handlePrevPlan}
            onNextPlan={handleNextPlan}
          />
          {/* Service Sections */}
          <div className="flex flex-col">
            {visibleSections?.map((section) => (
              <ServiceCatalogRoot
                key={section.id}
                activePlan={selectedPlan}
                isEnabled={enabledSections?.[section.id as SectionId] ?? false}
              >
                <ServiceCatalogHeader
                  title={section.title}
                  badge={section.badge}
                  hasToggle={section.hasToggle}
                  toggleLabel={section.toggleLabel}
                  toggleEnabled={enabledSections?.[section.id as SectionId]}
                  onToggleChange={
                    section.hasToggle && !readOnly
                      ? (enabled: boolean) => {
                          toggleSection(section.id as SectionId, enabled)
                        }
                      : undefined
                  }
                  oneTimeFee={section.oneTimeFee}
                  oneTimeFeeVariant={section.oneTimeFeeVariant}
                />

                <ServiceCatalogBody>
                  {section.rows.map((row) => (
                    <ServiceCatalogRow
                      key={row.id}
                      id={row.id}
                      label={row.label}
                      sublabel={row.sublabel}
                      values={row.values}
                    />
                  ))}
                </ServiceCatalogBody>

                <ServiceCatalogFooter section={section} />
              </ServiceCatalogRoot>
            ))}
          </div>
          {/* Grand Total */}
          <GrandTotalRowCatalog selectedPlan={selectedPlan} enabledSections={enabledSections} />
        </div>
      </Card>
    </PricingCalculatorProvider>
  )
}
