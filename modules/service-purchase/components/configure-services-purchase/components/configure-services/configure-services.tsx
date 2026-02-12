'use client'
import { useSearchParams } from 'next/navigation'
import { use } from 'react'
import { MarketplaceHeader } from '@/modules/service-purchase/components/configure-services-purchase/components/marketplace-header'
import { SERVICES_DATA } from '../../../../mock/mock-data'
import { type Plan, PricingCalculator } from '../service-catalog'
import { ServicePurchaseSelects } from '../service-purchase-selects'
import type { SectionId } from '../../../service-purchase-form/service-purchase-form'

// TODO: Remove once the api is ready
const delay = async (ms: number) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve('Data loaded')
    }, ms),
  )
const mockApiPromise = delay(2000)
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
  use(mockApiPromise)
  const searchParams = useSearchParams()

  const facetTargets = SERVICES_DATA.facetTargets

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
      <MarketplaceHeader />
      <ServicePurchaseSelects facetTargets={facetTargets} />
      <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-start">
        <PricingCalculator
          selectedPlan={selectedPlan}
          enabledSections={enabledSections}
          onPlanChange={onPlanChange}
          onSectionToggle={onSectionToggle}
          servicesData={SERVICES_DATA}
        />
      </div>
    </div>
  )
}
