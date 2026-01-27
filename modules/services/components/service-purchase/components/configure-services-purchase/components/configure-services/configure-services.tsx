'use client'
import { MarketplaceHeader } from '@/modules/services/components/service-purchase/components/configure-services-purchase/components/marketplace-header'
import { PricingCalculator } from '../service-catalog'
import { ServicePurchaseSelects } from '../service-purchase-selects'
import { PricingDetailCard } from '../summary/pricing-detail-card'
import { Plan } from '../types'
import type { SectionId } from '../../../service-purchase-form/service-purchase-form'

export interface ConfigureServicesProps {
  selectedPlan?: Plan
  enabledSections?: Record<SectionId, boolean>
  onPlanChange?: (plan: Plan) => void
  onSectionToggle?: (sectionId: SectionId, enabled: boolean) => void
}

export default function ConfigureServices({
  selectedPlan,
  enabledSections,
  onPlanChange,
  onSectionToggle,
}: Readonly<ConfigureServicesProps>) {
  return (
    <div className="mt-6 flex flex-col gap-6">
      <MarketplaceHeader />
      <ServicePurchaseSelects />
      <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-start">
        <PricingCalculator
          selectedPlan={selectedPlan}
          enabledSections={enabledSections}
          onPlanChange={onPlanChange}
          onSectionToggle={onSectionToggle}
        />

        <div className="w-full shrink-0 lg:w-102.75">
          <PricingDetailCard
            selectedPlan={selectedPlan ?? Plan.Team}
            enabledSections={enabledSections ?? {}}
          />
        </div>
      </div>
    </div>
  )
}
