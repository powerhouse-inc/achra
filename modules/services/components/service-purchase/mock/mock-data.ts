import type { PricingData } from '../components/service-catalog/types'

export const PRICING_DATA: PricingData = {
  tiers: [
    { id: 'basic', name: 'Basic', price: '$200/mo' },
    { id: 'team', name: 'Team', price: '$300/mo', isPopular: true },
    { id: 'premium', name: 'Premium', price: '$500/mo' },
    { id: 'enterprise', name: 'Enterprise', price: 'Custom' },
  ],
}
