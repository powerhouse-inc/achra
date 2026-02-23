'use client'
import { useSearchParams } from 'next/navigation'
import type {
  BuilderProfileState,
  RsServiceOffering,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { MarketplaceHeader } from '@/modules/service-purchase/components/configure-services-purchase/components/marketplace-header'
import { PricingCalculator } from '../service-catalog'
import { PricingCalculatorSkeleton } from '../service-catalog/pricing-calculator/pricing-calculator-skeleton'
import { ServicePurchaseSelects } from '../service-purchase-selects'

export interface ConfigureServicesProps {
  selectedPlan?: string
  enabledSections?: Record<string, boolean>
  onPlanChange?: (plan: string) => void
  onSectionToggle?: (sectionId: string, enabled: boolean) => void
  servicesData?: RsServiceOffering
  isLoading?: boolean
  operator: BuilderProfileState
}

export default function ConfigureServices({
  selectedPlan,
  enabledSections,
  onPlanChange,
  onSectionToggle,
  isLoading,
  servicesData,
  operator,
}: Readonly<ConfigureServicesProps>) {
  const searchParams = useSearchParams()

  if (isLoading || !servicesData) {
    return <PricingCalculatorSkeleton />
  }

  const facetTargets = servicesData.facetTargets
  // TODO: This will be needed in the table once the API is ready
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const facetSelections = Object.fromEntries(
    facetTargets.map((facet) => [
      facet.categoryKey,
      searchParams.get(facet.categoryKey) ?? facet.selectedOptions[0],
    ]),
  )

  return (
    <div className="mt-6 flex flex-col gap-6">
      <MarketplaceHeader operator={operator} />
      <ServicePurchaseSelects facetTargets={facetTargets} />
      <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-start">
        <PricingCalculator
          selectedPlan={selectedPlan}
          enabledSections={enabledSections}
          onPlanChange={onPlanChange}
          onSectionToggle={onSectionToggle}
          servicesData={servicesData}
        />
      </div>
    </div>
  )
}
