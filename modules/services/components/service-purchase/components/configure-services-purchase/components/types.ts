import type { RsOfferingFacetTarget } from '@/modules/__generated__/graphql/switchboard-generated'

export enum Plan {
  Basic = 'basic',
  Team = 'team',
  Premium = 'premium',
  Enterprise = 'enterprise',
}

export const PRICING_PLANS = [Plan.Basic, Plan.Team, Plan.Premium, Plan.Enterprise] as const

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
  sublabelVariant?: 'badge' | 'default'
  hasOneTimeFee?: boolean
  showApproxSymbol?: boolean
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
  facetTargets: RsOfferingFacetTarget[]
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

export interface ServiceRequestFormState {
  message?: string
  errors?: {
    email?: string[]
    name?: string[]
    [key: string]: string[] | undefined
  }
}
