'use client'

import type { RsGroupCostType } from '@/modules/__generated__/graphql/switchboard-generated'
import type { CatalogStatus } from '@/modules/service-purchase/types'
import { usePricingCalculatorContext } from './pricing-calculator-context'
import { SectionHeader } from './section-header'

export interface ServiceCatalogHeaderProps {
  title: string
  badge?: CatalogStatus
  hasToggle?: boolean
  toggleLabel?: string
  toggleEnabled?: boolean
  onToggleChange?: (enabled: boolean) => void
  groupPrice?: number | null
  groupDiscountedPrice?: number | null
  groupCurrency?: string | null
  groupCostType?: RsGroupCostType | null
}

export function ServiceCatalogHeader({
  title,
  badge,
  hasToggle,
  toggleLabel,
  toggleEnabled = false,
  onToggleChange,
  groupPrice,
  groupDiscountedPrice,
  groupCurrency,
  groupCostType,
}: Readonly<ServiceCatalogHeaderProps>) {
  const { activePlan } = usePricingCalculatorContext()

  return (
    <SectionHeader
      title={title}
      badge={badge}
      hasToggle={hasToggle}
      toggleLabel={toggleLabel}
      toggleEnabled={toggleEnabled}
      onToggleChange={onToggleChange}
      activePlan={activePlan}
      groupPrice={groupPrice}
      groupDiscountedPrice={groupDiscountedPrice}
      groupCurrency={groupCurrency}
      groupCostType={groupCostType}
    />
  )
}
