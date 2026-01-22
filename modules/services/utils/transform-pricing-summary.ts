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

/**
 *
 * Takes the full pricing catalog and extracts only what the user selected,
 * returning a clean, flat structure optimized for display in the summary card.
 *
 * @param pricingData
 * @param selectedTierId
 * @param activeAddons
 * @returns PricingSummary pricing summary object ready for display
 */
export function transformPricingSummary(
  pricingData: PricingData,
  selectedTierId: Plan,
  activeAddons: string[] = [],
): PricingSummary {
  const selectedTier = pricingData.tiers.find((t) => t.id === selectedTierId)

  if (!selectedTier) {
    throw new Error(`Tier "${selectedTierId}" not found in pricing data`)
  }

  const monthlyBasePrice = selectedTier.monthlyPrice
  const oneTimeFee = selectedTier.setupFee

  const mainFeatures: SummaryFeature[] = []
  const addons: SummaryAddon[] = []
  let totalMonthlyPrice = monthlyBasePrice

  pricingData.sections?.forEach((section) => {
    if (section.hasToggle) {
      if (activeAddons.includes(section.id)) {
        const addonFeatures: SummaryFeature[] = []

        section.rows.forEach((row) => {
          const feature = processFeatureRow(
            row.label,
            row.values[selectedTierId],
            row.sublabel,
            row.sublabelVariant,
            row.hasOneTimeFee,
            row.showApproxSymbol,
          )
          if (feature) {
            addonFeatures.push(feature)
          }
        })

        addons.push({
          name: section.title,
          price: section.price ?? 0,
          features: addonFeatures,
        })

        totalMonthlyPrice += section.price ?? 0
      }
    } else {
      section.rows.forEach((row) => {
        const feature = processFeatureRow(
          row.label,
          row.values[selectedTierId],
          row.sublabel,
          row.sublabelVariant,
          row.hasOneTimeFee,
          row.showApproxSymbol,
        )
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
 *
 * Filters out unavailable features and normalizes values for display.
 * Returns null for features not available in the selected tier.
 *
 * @param label - Feature label (e.g., "Users", "Storage")
 * @param value - Feature value from the tier (can be boolean, string, or number)
 * @param sublabel - Optional sublabel text
 * @param sublabelVariant - Optional sublabel styling variant
 * @param hasOneTimeFee - Whether the feature has a one-time fee
 * @param showApproxSymbol - Whether to show "~" for approximate values
 * @returns SummaryFeature object or null if feature is unavailable
 */
function processFeatureRow(
  label: string,
  value: FeatureValue,
  sublabel?: string,
  sublabelVariant?: 'badge' | 'default',
  hasOneTimeFee?: boolean,
  showApproxSymbol?: boolean,
): SummaryFeature | null {
  // Skip features that aren't available (false, empty, or dash means "not included")
  if (value === false || value === '' || value === '—') {
    return null
  }

  // Convert boolean true to the display text "Included"
  if (value === true) {
    return {
      label,
      value: 'Included',
      ...(sublabel && { sublabel }),
      ...(sublabelVariant && { sublabelVariant }),
      ...(hasOneTimeFee && { hasOneTimeFee }),
      ...(showApproxSymbol && { showApproxSymbol }),
    }
  }

  // For all other values (numbers, strings), convert to string and pass through
  return {
    label,
    value: String(value),
    ...(sublabel && { sublabel }),
    ...(sublabelVariant && { sublabelVariant }),
    ...(hasOneTimeFee && { hasOneTimeFee }),
    ...(showApproxSymbol && { showApproxSymbol }),
  }
}
