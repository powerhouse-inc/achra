export type PricingPlan = 'basic' | 'team' | 'premium' | 'enterprise'
export interface PricingTier {
  id: PricingPlan
  name: string
  price: string
  isPopular?: boolean
}

export interface PricingData {
  tiers: PricingTier[]
}
