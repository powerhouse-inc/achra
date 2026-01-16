'use client'
import { MarketplaceHeader } from '@/modules/services/components/service-purchase/components/select-services-purchase/marketplace-header'
import { PricingCalculator } from '../service-catalog'
import { ServicePurchaseSelects } from '../service-purchase-selects'
import type { PricingPlan } from '../types'

export interface SelectServicesProps {
  selectedPlan?: PricingPlan
  enabledSections?: Record<string, boolean>
  onPlanChange?: (plan: PricingPlan) => void
  onSectionToggle?: (sectionId: string, enabled: boolean) => void
}

export default function SelectServices({
  selectedPlan,
  enabledSections,
  onPlanChange,
  onSectionToggle,
}: Readonly<SelectServicesProps>) {
  return (
    <div className="mt-6 flex flex-col gap-6">
      <MarketplaceHeader />
      <ServicePurchaseSelects />
      <PricingCalculator
        selectedPlan={selectedPlan}
        enabledSections={enabledSections}
        onPlanChange={onPlanChange}
        onSectionToggle={onSectionToggle}
      />
    </div>
  )
}
