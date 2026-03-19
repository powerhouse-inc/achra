import {
  RsBillingCycle,
  type RsServiceSubscriptionTier,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { SERVICES_DATA } from '@/modules/service-purchase/mocks/mock-data'
import { PricingCalculatorProvider } from '@/modules/service-purchase/providers/pricing-calculator-provider'
import { ServicePurchaseStoreProvider } from '@/modules/service-purchase/providers/service-purchase-store-provider'
import type { ComponentType } from 'react'

const optionGroupSectionStoryPricingValue = {
  activePlan: '',
  onPrevPlan: () => {},
  onNextPlan: () => {},
  tierNames: [] as string[],
  tiers: [] as RsServiceSubscriptionTier[],
  selectedBillingCycle: RsBillingCycle.Monthly,
  tierHeaderPrices: {} as Record<string, number | null>,
}

/** Storybook decorator for option-group-section stories and similar configure-services UI using purchase flow mocks. */
export const withOptionGroupSectionStoryProviders = (Story: ComponentType) => (
  <ServicePurchaseStoreProvider services={SERVICES_DATA[0]}>
    <PricingCalculatorProvider value={optionGroupSectionStoryPricingValue}>
      <Story />
    </PricingCalculatorProvider>
  </ServicePurchaseStoreProvider>
)
