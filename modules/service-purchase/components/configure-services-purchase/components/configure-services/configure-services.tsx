'use client'
import { useSearchParams } from 'next/navigation'
import type { BuilderProfileState } from '@/modules/__generated__/graphql/switchboard-generated'
import { MarketplaceHeader } from '@/modules/service-purchase/components/configure-services-purchase/components/marketplace-header'
import { useServiceOffering } from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { BillingPeriodSelector } from '../billing-period-selector/billing-period-selector'
import { FacetSelectionSection } from '../facet-selection-section'
import { PricingCalculator } from '../service-catalog'

export interface ConfigureServicesProps {
  selectedPlan?: string
  onPlanChange?: (plan: string) => void
  operator: BuilderProfileState
}

function ConfigureServices({
  selectedPlan,
  onPlanChange,
  operator,
}: Readonly<ConfigureServicesProps>) {
  const servicesData = useServiceOffering()
  const searchParams = useSearchParams()

  const facetSelections = Object.fromEntries(
    servicesData.facetTargets.map((facet) => [
      facet.categoryKey,
      searchParams.get(facet.categoryKey) ?? facet.selectedOptions[0],
    ]),
  )

  return (
    <div className="mt-6 flex flex-col gap-6">
      <MarketplaceHeader operator={operator} />
      <FacetSelectionSection />
      <BillingPeriodSelector />
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

export { ConfigureServices }
