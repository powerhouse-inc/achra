'use client'

import { ServiceCatalogBody, ServiceCatalogHeader, ServiceCatalogRoot, ServiceCatalogRow } from '.'
import type { Plan, ServiceSectionCatalog } from '../types'

interface PricingSectionProps {
  readonly section: ServiceSectionCatalog
  readonly activePlan: Plan
  readonly isEnabled: boolean
  readonly readOnly: boolean
  readonly onToggle: (sectionId: string, enabled: boolean) => void
}

export function PricingSection({
  section,
  activePlan,
  isEnabled,
  readOnly,
  onToggle,
}: PricingSectionProps) {
  const handleToggleChange =
    section.hasToggle && !readOnly
      ? (enabled: boolean) => {
          onToggle(section.id, enabled)
        }
      : undefined

  return (
    <ServiceCatalogRoot activePlan={activePlan} isEnabled={isEnabled}>
      <ServiceCatalogHeader
        title={section.title}
        badge={section.badge}
        hasToggle={section.hasToggle}
        toggleLabel={section.toggleLabel}
        toggleEnabled={isEnabled}
        onToggleChange={handleToggleChange}
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
    </ServiceCatalogRoot>
  )
}
