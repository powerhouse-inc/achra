'use client'
import { useSearchParams } from 'next/navigation'
import type {
  BuilderProfileState,
  RsServiceOffering,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { MarketplaceHeader } from '@/modules/service-purchase/components/configure-services-purchase/components/marketplace-header'
import { BillingPeriodSelector } from '../billing-period-selector/billing-period-selector'
import { FacetSelectionSection } from '../facet-selection-section'
import { PricingCalculator } from '../service-catalog'
import { PricingCalculatorSkeleton } from '../service-catalog/pricing-calculator/pricing-calculator-skeleton'

export interface ConfigureServicesProps {
  selectedPlan?: string
  onPlanChange?: (plan: string) => void
  servicesData?: RsServiceOffering
  isLoading?: boolean
  operator: BuilderProfileState
}

export default function ConfigureServices({
  selectedPlan,
  onPlanChange,
  isLoading,
  servicesData,
  operator,
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
      <BillingPeriodSelector tiers={servicesData.tiers} />
      <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-start">
        <PricingCalculator
          selectedPlan={selectedPlan}
          onPlanChange={onPlanChange}
          servicesData={servicesData}
          facetSelections={facetSelections}
        />
      </div>
    </div>
  )
}
