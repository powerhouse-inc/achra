export type PricingPlan = 'basic' | 'team' | 'premium' | 'enterprise'

export type FeatureValue = boolean | string | CatalogStatus

export interface PricingTier {
  id: PricingPlan
  name: string
  price: string
  isPopular?: boolean
}

export interface FeatureRow {
  id: string
  label: string
  sublabel?: string
  values: Record<PricingPlan, FeatureValue>
}

export interface ServiceSectionCatalog {
  id: string
  title: string
  badge?: CatalogStatus
  hasToggle?: boolean
  toggleLabel?: string
  oneTimeFee?: string
  oneTimeFeeVariant?: 'primary' | 'muted'
  rows: FeatureRow[]
  subtotal?: {
    label: string
    values: Record<PricingPlan, string>
  }
}

export interface PricingData {
  tiers: PricingTier[]
  sections?: ServiceSectionCatalog[]
  grandTotal?: {
    label: string
    values: Record<PricingPlan, string>
  }
}

export enum CatalogStatus {
  Included = 'Included',
  Optional = 'Optional',
  Excluded = 'Excluded',
}
