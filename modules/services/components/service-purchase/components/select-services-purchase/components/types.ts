// Plan

export enum Plan {
  Basic = 'basic',
  Team = 'team',
  Premium = 'premium',
  Enterprise = 'enterprise',
}

export type FeatureValue = boolean | string | CatalogStatus

export interface PricingTier {
  id: Plan
  name: string
  price: string
  monthlyPrice: number
  setupFee: number
  isPopular?: boolean
}

export interface FeatureRow {
  id: string
  label: string
  sublabel?: string
  hasOneTimeFee?: boolean
  values: Record<Plan, FeatureValue>
}

export interface ServiceSectionCatalog {
  id: string
  title: string
  badge?: CatalogStatus
  hasToggle?: boolean
  toggleLabel?: string
  oneTimeFee?: string
  price?: number
  oneTimeFeeVariant?: 'primary' | 'muted'
  rows: FeatureRow[]
  subtotal?: {
    label: string
    values: Record<Plan, string>
  }
}

export interface PricingData {
  tiers: PricingTier[]
  sections?: ServiceSectionCatalog[]
  grandTotal?: {
    label: string
    values: Record<Plan, string>
  }
}

export enum CatalogStatus {
  Included = 'Included',
  Optional = 'Optional',
  Excluded = 'Excluded',
}

// Improve this when UI its ready
export const TEAM_STRUCTURE_OPTIONS = ['Remote Team', 'Hybrid Team', 'Local Team'] as const
export const ANONYMITY_LEVEL_OPTIONS = ['High (Standard)', 'Higher'] as const

export interface ServiceRequestFormState {
  message?: string
  errors?: {
    email?: string[]
    name?: string[]
    [key: string]: string[] | undefined
  }
}
