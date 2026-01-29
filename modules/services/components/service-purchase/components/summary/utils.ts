import {
  CatalogStatus,
  type FeatureRow,
  type FeatureValue,
  type Plan,
  type PricingData,
  type PricingTier,
} from '../configure-services-purchase/components/types'

export type ValueType = 'price' | 'symbol' | 'label' | 'check' | 'none'

export interface FormattedValue {
  displayValue: string
  valueType: ValueType
}

export interface SummaryGroup {
  id: string
  title: string
  selectedValue: string
  priceLabel: string
  rows: FeatureRow[]
}

export function formatRowValue(
  value: FeatureValue,
  showApproxSymbol?: boolean,
  hasOneTimeFee?: boolean,
  setupFee?: number,
): FormattedValue {
  if (value === true) {
    if (hasOneTimeFee && setupFee) {
      return { displayValue: `$${setupFee.toLocaleString()}`, valueType: 'price' }
    }
    if (showApproxSymbol) {
      return { displayValue: '~', valueType: 'symbol' }
    }
    return { displayValue: '✓', valueType: 'check' }
  }

  if (value === false) {
    return { displayValue: '—', valueType: 'none' }
  }

  if (typeof value === 'string') {
    const upperValue = value.toUpperCase()
    if (['LABEL', 'EXPEDITED', 'CUSTOM', 'PRIORITY'].includes(upperValue)) {
      return { displayValue: value.toUpperCase(), valueType: 'label' }
    }
    return { displayValue: value, valueType: 'label' }
  }

  return { displayValue: String(value), valueType: 'label' }
}

export function buildSummaryGroups(
  pricingData: PricingData,
  currentTier: PricingTier,
  selectedPlan: Plan,
  selectedAddons: string[],
): SummaryGroup[] {
  const groups: SummaryGroup[] = []

  // 1. "Tier" group: merge all Included sections' rows
  const includedSections =
    pricingData.sections?.filter((s) => s.badge === CatalogStatus.Included) ?? []
  const tierRows = includedSections.flatMap((s) => s.rows)

  if (tierRows.length > 0) {
    groups.push({
      id: 'tier',
      title: 'Tier',
      selectedValue: currentTier.name,
      priceLabel: `$${currentTier.monthlyPrice}/mo`,
      rows: tierRows,
    })
  }

  // 2. "Recurring Services" group: one per selected optional addon
  const optionalSections =
    pricingData.sections?.filter(
      (s) => s.badge === CatalogStatus.Optional && selectedAddons.includes(s.id),
    ) ?? []

  for (const section of optionalSections) {
    groups.push({
      id: section.id,
      title: 'Recurring Services',
      selectedValue: section.toggleLabel ?? section.title,
      priceLabel: section.oneTimeFee ?? `+$${section.price ?? 0}`,
      rows: section.rows,
    })
  }

  return groups
}

export function calculateRecurringTotal(
  pricingData: PricingData,
  currentTier: PricingTier,
  selectedAddons: string[],
): number {
  const basePrice = currentTier.monthlyPrice
  const addonsTotal =
    pricingData.sections
      ?.filter(
        (section) =>
          section.badge === CatalogStatus.Optional && selectedAddons.includes(section.id),
      )
      .reduce((sum, section) => sum + (section.price ?? 0), 0) ?? 0
  return basePrice + addonsTotal
}
