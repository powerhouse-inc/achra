'use client'

import type { BuilderProfileState } from '@/modules/__generated__/graphql/switchboard-generated'
import { MarketplaceHeader } from '@/modules/service-purchase/components/configure-services-step/marketplace-header'
import { BillingPeriodSelector } from '../billing-period-selector/billing-period-selector'
import { FacetSelectionSection } from '../facet-selection-section'
import { PricingCalculator } from '../service-catalog'

export interface ConfigureServicesProps {
  operator: BuilderProfileState
}

function ConfigureServices({ operator }: Readonly<ConfigureServicesProps>) {
  return (
    <div className="mt-6 flex flex-col gap-6">
      <MarketplaceHeader operator={operator} />
      <FacetSelectionSection />
      <BillingPeriodSelector />
      <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-start">
        <PricingCalculator />
      </div>
    </div>
  )
}

export { ConfigureServices }
