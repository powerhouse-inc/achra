'use client'

import { useCallback, useMemo } from 'react'
import { Card } from '@/modules/shared/components/ui/card'
import { PRICING_DATA } from '../../../../mock/mock-data'
import { Plan } from '../types'
import { GrandTotalRowCatalog } from './grand-total-row-catalog'
import HeaderCatalogPlan from './header-catalog-plan'
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
export function PricingCalculator({
  selectedPlan = Plan.Team,
  enabledSections,
  onPlanChange,
  onSectionToggle,
  readOnly = false,
}: PricingCalculatorProps = {}) {
  const handlePlanChange = useCallback(
    (plan: Plan) => {
      if (readOnly || !onPlanChange) return
      onPlanChange(plan)
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

  const visibleSections = useMemo(
    () =>
      readOnly
        ? PRICING_DATA.sections?.filter((section) => enabledSections?.[section.id as SectionId])
        : PRICING_DATA.sections,
    [readOnly, enabledSections],
  )

  return (
    <Card className="flex w-full flex-col gap-6 border-none! py-0!">
      <div>
        {/* Header with Plan Selectors */}
        <HeaderCatalogPlan
          selectedPlan={selectedPlan}
          handlePlanChange={handlePlanChange}
          readOnly={readOnly}
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
  )
}
