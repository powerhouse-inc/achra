'use client'
import { MarketplaceHeader } from '@/modules/services/components/service-purchase/components/select-services-purchase/components/marketplace-header'
import { Button } from '@/modules/shared/components/ui/button'
import { PricingCalculator } from '../service-catalog'
import { ServicePurchaseSelects } from '../service-purchase-selects'
import { PricingDetailCard } from '../summary/pricing-detail-card'
import type { SectionId } from '../../../service-purchase-form/service-purchase-form'
import type { PricingPlan } from '../types'

export interface SelectServicesProps {
  selectedPlan?: PricingPlan
  enabledSections?: Record<SectionId, boolean>
  onPlanChange?: (plan: PricingPlan) => void
  onSectionToggle?: (sectionId: SectionId, enabled: boolean) => void
  onBack?: () => void
  onContinue?: () => void
}

export default function SelectServices({
  selectedPlan,
  enabledSections,
  onPlanChange,
  onSectionToggle,
  onBack,
  onContinue,
}: Readonly<SelectServicesProps>) {
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
            selectedPlan={selectedPlan ?? 'team'}
            enabledSections={enabledSections ?? {}}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button variant="default" onClick={onContinue}>
          Continue
        </Button>
      </div>
    </div>
  )
}
