'use client'

import { BillingPeriodSelector } from '../billing-period-selector/billing-period-selector'
import { FacetSelectionSection } from '../facet-selection-section'
import { PricingCalculator } from '../service-catalog'

function ConfigureServices() {
  return (
    <div className="mt-6 flex flex-col gap-6">
      <FacetSelectionSection />
      <BillingPeriodSelector />
      <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-start">
        <PricingCalculator />
      </div>
    </div>
  )
}

export { ConfigureServices }
