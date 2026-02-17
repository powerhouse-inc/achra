/**
 * Summary feature item structure
 */
export interface SummaryFeature {
  label: string
  value: string
  sublabel?: string
  sublabelVariant?: 'badge' | 'default'
  hasOneTimeFee?: boolean
  showApproxSymbol?: boolean
}

/**
 * Summary addon structure
 */
export interface SummaryAddon {
  name: string
  price: number
  features: SummaryFeature[]
}

/**
 * Complete summary structure for order summary card
 */
export interface PricingSummary {
  summary: {
    tier_name: string
    total_monthly_price: number
    one_time_fee: number
    currency: string
    main_features: SummaryFeature[]
    addons: SummaryAddon[]
  }
}
