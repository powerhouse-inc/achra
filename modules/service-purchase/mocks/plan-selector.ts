import type { RsServiceSubscriptionTier } from '@/modules/__generated__/graphql/switchboard-generated'

export const mockPlanSelectorTier: RsServiceSubscriptionTier = {
  description: '',
  id: '1',
  name: 'Pro Plan',
  isCustomPricing: false,
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
      resetCycle: null,
      notes: null,
      unitPrice: 50,
      unitPriceCurrency: 'USD',
    },
  ],
  serviceLevels: [],
}
