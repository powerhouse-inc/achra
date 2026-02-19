import {
  RsGroupCostType,
  type RsOfferingOptionGroup,
  RsServiceLevel,
  type RsServiceOffering,
  type RsServiceSubscriptionTier,
} from '@/modules/__generated__/graphql/switchboard-generated'

export type ValueType = 'price' | 'symbol' | 'label' | 'check' | 'none'

export interface SummaryServiceRow {
  id: string
  label: string
  sublabel?: string
  displayValue: string
  valueType: ValueType
}

export interface SummaryGroup {
  id: string
  title: string
  selectedValue: string
  priceLabel: string
  rows: SummaryServiceRow[]
}

function formatGroupPrice(group: RsOfferingOptionGroup): string {
  if (group.price == null) return ''
  if (group.costType === RsGroupCostType.Setup) {
    return `$${group.price.toLocaleString()} one-time`
  }
  return `$${group.price}/mo`
}

export function buildSummaryGroups(
  data: RsServiceOffering,
  currentTier: RsServiceSubscriptionTier,
  selectedAddons: string[],
): SummaryGroup[] {
  const groups: SummaryGroup[] = []

  // Build lookup: serviceId → service level for the selected tier
  const serviceLevelMap = new Map(currentTier.serviceLevels.map((sl) => [sl.serviceId, sl.level]))

  // Build lookup: serviceId → usage limit for the selected tier
  const usageLimitMap = new Map(currentTier.usageLimits.map((ul) => [ul.serviceId, ul]))

  // Group services by optionGroupId
  const servicesByGroup = new Map<string, typeof data.services>()
  for (const service of data.services) {
    if (service.optionGroupId) {
      const existing = servicesByGroup.get(service.optionGroupId) ?? []
      existing.push(service)
      servicesByGroup.set(service.optionGroupId, existing)
    }
  }

  // Process non-add-on option groups (always included)
  for (const group of data.optionGroups.filter((g) => !g.isAddOn)) {
    const groupServices = servicesByGroup.get(group.id) ?? []
    const includedServices = groupServices.filter(
      (s) => serviceLevelMap.get(s.id) === RsServiceLevel.Included,
    )

    if (includedServices.length === 0) continue

    const rows: SummaryServiceRow[] = includedServices.map((service) => {
      const usageLimit = usageLimitMap.get(service.id)

      if (usageLimit?.notes) {
        return {
          id: service.id,
          label: service.title,
          sublabel: usageLimit.notes,
          displayValue: '✓',
          valueType: 'check' as ValueType,
        }
      }

      return {
        id: service.id,
        label: service.title,
        displayValue: '✓',
        valueType: 'check' as ValueType,
      }
    })

    groups.push({
      id: group.id,
      title: group.name,
      selectedValue: currentTier.name,
      priceLabel: formatGroupPrice(group),
      rows,
    })
  }

  // Process add-on option groups
  for (const group of data.optionGroups.filter((g) => g.isAddOn)) {
    if (!selectedAddons.includes(group.id)) continue

    // Add-on services are not listed in tier serviceLevels — show all services in the group
    const groupServices = servicesByGroup.get(group.id) ?? []

    if (groupServices.length === 0) continue

    const rows: SummaryServiceRow[] = groupServices.map((service) => {
      const usageLimit = usageLimitMap.get(service.id)
      const price = usageLimit?.unitPrice

      if (price != null) {
        return {
          id: service.id,
          label: service.title,
          sublabel: usageLimit?.notes ?? undefined,
          displayValue: `$${price.toLocaleString()}`,
          valueType: 'price' as ValueType,
        }
      }

      return {
        id: service.id,
        label: service.title,
        displayValue: '✓',
        valueType: 'check' as ValueType,
      }
    })

    groups.push({
      id: group.id,
      title: group.name,
      selectedValue: currentTier.name,
      priceLabel: formatGroupPrice(group),
      rows,
    })
  }

  return groups
}

export function calculateRecurringTotal(
  currentTier: RsServiceSubscriptionTier,
  optionGroups: RsOfferingOptionGroup[],
  selectedAddons: string[],
): number {
  const base = currentTier.pricing.amount ?? 0
  const addonTotal = optionGroups
    .filter(
      (g) =>
        g.isAddOn &&
        g.costType === RsGroupCostType.Recurring &&
        selectedAddons.includes(g.id) &&
        g.price != null,
    )
    .reduce((sum, g) => sum + (g.price ?? 0), 0)
  return base + addonTotal
}

export function getSetupFee(data: RsServiceOffering): number {
  return data.optionGroups
    .filter((g) => g.costType === RsGroupCostType.Setup)
    .reduce((sum, g) => sum + (g.price ?? 0), 0)
}
