'use client'

import { useCallback, useMemo } from 'react'
import { Card } from '@/modules/shared/components/ui/card'
import { PRICING_DATA } from '../mock/mock-data'
import HeaderCatalogPlan from './header-catalog-plan'
import { PricingSection } from './pricing-section'

import type { PricingPlan } from '../types'

export interface PricingCalculatorProps {
  selectedPlan?: PricingPlan
  enabledSections?: Record<string, boolean>
  onPlanChange?: (plan: PricingPlan) => void
  onSectionToggle?: (sectionId: string, enabled: boolean) => void
  readOnly?: boolean
  showAllPlans?: boolean
}

export function PricingCalculator({
  selectedPlan = 'team',
  enabledSections = {},
  onPlanChange,
  onSectionToggle,
  readOnly = false,
  showAllPlans = true,
}: PricingCalculatorProps = {}) {
  const handlePlanChange = useCallback(
    (plan: PricingPlan) => {
      if (readOnly || !onPlanChange) return
      onPlanChange(plan)
    },
    [readOnly, onPlanChange],
  )

  const toggleSection = useCallback(
    (sectionId: string, enabled: boolean) => {
      if (readOnly || !onSectionToggle) return
      onSectionToggle(sectionId, enabled)
    },
    [readOnly, onSectionToggle],
  )

  const visibleSections = useMemo(
    () =>
      readOnly
        ? PRICING_DATA.sections?.filter((section) => enabledSections[section.id])
        : PRICING_DATA.sections,
    [readOnly, enabledSections],
  )

  return (
    <Card className="flex flex-col gap-6 border-none! py-0!">
      <div>
        <HeaderCatalogPlan
          selectedPlan={selectedPlan}
          handlePlanChange={handlePlanChange}
          readOnly={readOnly}
          showAllPlans={showAllPlans}
        />

        <div className="flex flex-col">
          {visibleSections?.map((section) => (
            <PricingSection
              key={section.id}
              section={section}
              activePlan={selectedPlan}
              isEnabled={enabledSections[section.id]}
              showAllPlans={showAllPlans}
              readOnly={readOnly}
              onToggle={toggleSection}
            />
          ))}
        </div>
      </div>
    </Card>
  )
}
