'use client'

import type { RsGroupCostType } from '@/modules/__generated__/graphql/switchboard-generated'
import { usePricingCalculatorContext } from '@/modules/service-purchase/providers/pricing-calculator-provider'
import { SectionHeader } from './section-header'

export interface ServiceCatalogHeaderProps {
  title: string
  hasToggle?: boolean
  toggleLabel?: string
  toggleEnabled?: boolean
  onToggleChange?: (enabled: boolean) => void
  groupPrice?: number | null
  groupDiscountedPrice?: number | null
  groupCurrency?: string | null
  groupCostType?: RsGroupCostType | null
  perTierPrices?: Record<string, string | null> | null
}

function ServiceCatalogHeader({
  title,
  hasToggle,
  toggleLabel,
  toggleEnabled = false,
  onToggleChange,
  groupPrice,
  groupDiscountedPrice,
  groupCurrency,
  groupCostType,
  perTierPrices,
}: Readonly<ServiceCatalogHeaderProps>) {
  const { activePlan } = usePricingCalculatorContext()

  return (
    <SectionHeader
      title={title}
      hasToggle={hasToggle}
      toggleLabel={toggleLabel}
      toggleEnabled={toggleEnabled}
      onToggleChange={onToggleChange}
      activePlan={activePlan}
      groupPrice={groupPrice}
      groupDiscountedPrice={groupDiscountedPrice}
      groupCurrency={groupCurrency}
      groupCostType={groupCostType}
      perTierPrices={perTierPrices}
    />
  )
}

export { ServiceCatalogHeader }
