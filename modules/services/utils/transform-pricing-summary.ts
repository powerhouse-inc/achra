import type {
  FeatureValue,
  Plan,
  PricingData,
} from '../components/service-purchase/components/select-services-purchase/components/types'

/**
 * Summary feature item structure
 */
export interface SummaryFeature {
  label: string
  value: string
  sublabel?: string
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

/**
 * BFF (Backend for Frontend) transformation function
 * Converts complex PRICING_DATA into a clean, simplified JSON for rendering summary cards
 *
 * @param pricingData - The raw pricing configuration data
 * @param selectedTierId - The selected tier ID (e.g., "team")
 * @param activeAddons - Array of active addon section IDs (e.g., ["finance-pack"])
 * @returns Simplified pricing summary object
 */
export function transformPricingSummary(
  pricingData: PricingData,
  selectedTierId: Plan,
  activeAddons: string[] = [],
): PricingSummary {
  // Find selected tier
  const selectedTier = pricingData.tiers.find((t) => t.id === selectedTierId)

  if (!selectedTier) {
    throw new Error(`Tier "${selectedTierId}" not found in pricing data`)
  }

  // Extract base pricing
  const monthlyBasePrice = selectedTier.monthlyPrice
  const oneTimeFee = selectedTier.setupFee

  // Initialize result arrays
  const mainFeatures: SummaryFeature[] = []
  const addons: SummaryAddon[] = []
  let totalMonthlyPrice = monthlyBasePrice

  // Process sections
  pricingData.sections?.forEach((section) => {
    // Check if section is a toggle (addon)
    if (section.hasToggle) {
      // Only process if this addon is active
      if (activeAddons.includes(section.id)) {
        const addonFeatures: SummaryFeature[] = []

        // Process addon rows
        section.rows.forEach((row) => {
          const feature = processFeatureRow(row.label, row.values[selectedTierId], row.sublabel)
          if (feature) {
            addonFeatures.push(feature)
          }
        })

        // Add addon to list
        addons.push({
          name: section.title,
          price: section.price ?? 0,
          features: addonFeatures,
        })

        // Add addon price to total
        totalMonthlyPrice += section.price ?? 0
      }
    } else {
      // Fixed section - flatten rows directly into main features
      section.rows.forEach((row) => {
        const feature = processFeatureRow(row.label, row.values[selectedTierId], row.sublabel)
        if (feature) {
          mainFeatures.push(feature)
        }
      })
    }
  })

  return {
    summary: {
      tier_name: selectedTier.name,
      total_monthly_price: totalMonthlyPrice,
      one_time_fee: oneTimeFee,
      currency: 'USD',
      main_features: mainFeatures,
      addons,
    },
  }
}

/**
 * Helper function to process a single feature row
 * Filters out excluded values and transforms boolean/string values
 *
 * @param label - Feature label
 * @param value - Feature value from the tier
 * @param sublabel - Optional sublabel
 * @returns SummaryFeature or null if value should be excluded
 */
function processFeatureRow(
  label: string,
  value: FeatureValue,
  sublabel?: string,
): SummaryFeature | null {
  // Exclude falsy values, empty strings, and dashes
  if (value === false || value === '' || value === '—') {
    return null
  }

  // Transform boolean true to "Included"
  if (value === true) {
    return {
      label,
      value: 'Included',
      ...(sublabel && { sublabel }),
    }
  }

  // Keep text/number values as-is
  return {
    label,
    value: String(value),
    ...(sublabel && { sublabel }),
  }
}
