'use client'
import { useSearchParams } from 'next/navigation'
import type {
  BuilderProfileState,
  RsBillingCycle,
  RsServiceOffering,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { MarketplaceHeader } from '@/modules/service-purchase/components/configure-services-purchase/components/marketplace-header'
import { BillingPeriodSelector } from '../billing-period-selector/billing-period-selector'
import { FacetSelectionSection } from '../facet-selection-section'
import { PricingCalculator } from '../service-catalog'
import { PricingCalculatorSkeleton } from '../service-catalog/pricing-calculator/pricing-calculator-skeleton'

export interface ConfigureServicesProps {
  selectedPlan?: string
  enabledSections?: Record<string, boolean>
  onPlanChange?: (plan: string) => void
  onSectionToggle?: (sectionId: string, enabled: boolean) => void
  servicesData?: RsServiceOffering
  isLoading?: boolean
  operator: BuilderProfileState
  billingPeriod: RsBillingCycle
  setBillingPeriod: (bP: RsBillingCycle) => void
}

export default function ConfigureServices({
  selectedPlan,
  enabledSections,
  onPlanChange,
  onSectionToggle,
  isLoading,
  servicesData,
  operator,
  billingPeriod,
  setBillingPeriod,
}: Readonly<ConfigureServicesProps>) {
  const searchParams = useSearchParams()

  if (isLoading || !servicesData) {
    return <PricingCalculatorSkeleton />
  }

  const facetTargets = servicesData.facetTargets

  const facetSelections = Object.fromEntries(
    facetTargets.map((facet) => [
      facet.categoryKey,
      searchParams.get(facet.categoryKey) ?? facet.selectedOptions[0],
    ]),
  )

  return (
    <div className="mt-6 flex flex-col gap-6">
      <MarketplaceHeader operator={operator} />
      <FacetSelectionSection />
      <BillingPeriodSelector
        value={billingPeriod}
        onValueChange={setBillingPeriod}
        tiers={servicesData.tiers}
      />
      <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-start">
        <PricingCalculator
          selectedPlan={selectedPlan}
          enabledSections={enabledSections}
          onPlanChange={onPlanChange}
          onSectionToggle={onSectionToggle}
          servicesData={servicesData}
          billingPeriod={billingPeriod}
          facetSelections={facetSelections}
        />
      </div>
    </div>
  )
}
