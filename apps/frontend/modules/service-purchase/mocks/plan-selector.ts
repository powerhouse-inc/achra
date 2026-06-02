import type { ServiceTierFieldsFragment } from '@/modules/__generated__/graphql/switchboard-generated'

export const mockPlanSelectorTier: ServiceTierFieldsFragment = {
  description: '',
  id: '1',
  name: 'Pro Plan',
  mostPopular: false,
  isCustomPricing: false,
  excludeFromSetupFee: false,
  billingCycleDiscounts: [],
  pricing: {
    amount: 59,
    currency: 'USD',
  },
  usageLimits: [
    {
      id: 'ul-1',
      serviceId: 's-1',
      metric: 'Contributor',
      unitName: 'Contributor',
      freeLimit: null,
      paidLimit: null,
      notes: null,
      unitPrice: 50,
      unitPriceCurrency: 'USD',
    },
  ],
  serviceLevels: [],
}
