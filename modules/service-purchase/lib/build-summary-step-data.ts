import {
  RsGroupCostType,
  type RsOfferingOptionGroup,
  RsServiceLevel,
  type RsServiceOffering,
  type RsServiceSubscriptionTier,
} from '@/modules/__generated__/graphql/switchboard-generated'

import { computeAddonSubtotals, computeRecurringSubtotals, formatPrice } from './utils'

export interface SummaryRow {
  id: string
  label: string
  /** Secondary line shown below the label, e.g. "One-time fee". */
  sublabel?: string
  value: string | boolean
  isOneTime: boolean
}
export interface SummarySection {
  id: string
  title: string
  /** Distinguishes one-time setup groups from recurring groups. */
  isSetup: boolean
  badge: 'included' | 'selected'
  /** Present only on add-on sections, e.g. "+$50/mo". */
  price?: string
  features: SummaryRow[]
  subtotal?: string
  setupFee?: string
}
export interface PricingBreakdownItem {
  label: string
  price: string
  sublabel?: string
  isSetup?: boolean
}
export interface SummaryStepData {
  tierName: string
  tierBasePrice: string
  sections: SummarySection[]
  addons: SummarySection[]
  pricingBreakdown: {
    recurringItems: PricingBreakdownItem[]
    totalRecurring: string
    setupItems: PricingBreakdownItem[]
    totalSetup: string
  }
}

type UsageLimit = RsServiceSubscriptionTier['usageLimits'][number]
type ServiceLevelEntry = RsServiceSubscriptionTier['serviceLevels'][number]
type ServiceEntry = RsServiceOffering['services'][number]
interface RawSetupItem {
  label: string
  amount: number
  currency: string
}

/** Groups all services by their `optionGroupId` for O(1) lookup. */
function buildServicesByGroupMap(services: readonly ServiceEntry[]): Map<string, ServiceEntry[]> {
  const map = new Map<string, ServiceEntry[]>()
  for (const service of services) {
    if (!service.optionGroupId) continue
    const existing = map.get(service.optionGroupId) ?? []
    existing.push(service)
    map.set(service.optionGroupId, existing)
  }
  return map
}

/** Maps each serviceId to its `serviceLevels` entry for the given tier. */
function buildServiceLevelMapInTier(
  tier: RsServiceSubscriptionTier,
): Map<string, ServiceLevelEntry> {
  return new Map(tier.serviceLevels.map((sl) => [sl.serviceId, sl]))
}

/** Groups all usage-limit entries by serviceId for the given tier. */
function buildUsageLimitsByServiceMapInTier(
  tier: RsServiceSubscriptionTier,
): Map<string, UsageLimit[]> {
  const map = new Map<string, UsageLimit[]>()
  for (const ul of tier.usageLimits) {
    const existing = map.get(ul.serviceId) ?? []
    existing.push(ul)
    map.set(ul.serviceId, existing)
  }
  return map
}

/**
 * Converts an `RsServiceLevel` enum value into the display value used by
 * `SummaryRow.value`. Levels with no custom text fall back to the enum name.
 */
export function mapLevel(level: RsServiceLevel, customValue?: string | null): string | boolean {
  switch (level) {
    case RsServiceLevel.Included:
      return true
    case RsServiceLevel.NotIncluded:
    case RsServiceLevel.NotApplicable:
      return false
    case RsServiceLevel.Custom:
      return customValue ?? 'Custom'
    case RsServiceLevel.Optional:
      return customValue ?? 'Optional'
    case RsServiceLevel.Variable:
      return customValue ?? 'Variable'
  }
}

/**
 * Derives the display value from a single usage-limit entry.
 * Priority: notes + price → price-only → notes-only → null (skip).
 */
export function getUsageLimitValue(ul: UsageLimit): string | null {
  if (ul.notes && ul.unitPrice != null) {
    return `${formatPrice(ul.unitPrice, ul.unitPriceCurrency)} (${ul.notes})`
  }
  if (ul.notes) return ul.notes
  if (ul.unitPrice != null) return formatPrice(ul.unitPrice, ul.unitPriceCurrency)
  return null
}

/**
 * Builds the display rows for a service inside a base (non-add-on) section.
 * Returns one row for the service level plus zero-or-more metric sub-rows
 * sourced from `usageLimits` (e.g. a one-time setup fee line).
 */
export function buildBaseServiceRows(
  service: ServiceEntry,
  serviceLevelMap: Map<string, ServiceLevelEntry>,
  usageLimitsByService: Map<string, UsageLimit[]>,
): SummaryRow[] {
  const sl = serviceLevelMap.get(service.id)
  const level = sl?.level ?? RsServiceLevel.NotApplicable

  const serviceRow: SummaryRow = {
    id: service.id,
    label: service.title,
    value: mapLevel(level, sl?.customValue),
    isOneTime: false,
  }

  const limits = usageLimitsByService.get(service.id) ?? []
  const metricRows = limits.reduce<SummaryRow[]>((acc, ul) => {
    const value = getUsageLimitValue(ul)
    if (value === null) return acc
    const isOneTime = ul.unitName === 'setup'
    acc.push({
      id: `${service.id}-${ul.metric}`,
      label: ul.metric,
      sublabel: isOneTime ? 'One-time fee' : (ul.unitName ?? ''),
      value,
      isOneTime,
    })
    return acc
  }, [])

  return [serviceRow, ...metricRows]
}

/**
 * Builds a single display row for a service inside an add-on section.
 * Resolution priority: usage-limit notes/price → serviceLevels customValue → checkmark (true).
 * Defaults to a checkmark since the add-on is explicitly enabled by the user.
 */
export function buildAddonServiceRow(
  service: ServiceEntry,
  serviceLevelMap: Map<string, ServiceLevelEntry>,
  usageLimitsByService: Map<string, UsageLimit[]>,
): SummaryRow {
  // Default to included since the user has enabled this add-on
  let value: string | boolean = true

  // Service-level custom text (e.g. "Per seat", "Up to 10 nodes")
  const sl = serviceLevelMap.get(service.id)
  if (sl?.customValue) value = sl.customValue

  // Usage limits take precedence — they carry the most specific display data
  const limit = usageLimitsByService.get(service.id)?.[0]
  if (limit) {
    if (limit.notes) value = limit.notes
    else if (limit.unitPrice != null) value = formatPrice(limit.unitPrice, limit.unitPriceCurrency)
  }

  return { id: service.id, label: service.title, value, isOneTime: false }
}

/**
 * Computes the footer values for a base section.
 * Setup groups expose a one-time `setupFee`; recurring groups expose a `subtotal`.
 * Falls back to the tier base price when the group has no explicit price.
 */
export function buildBaseSectionFooter(
  group: RsOfferingOptionGroup,
  tiers: readonly RsServiceSubscriptionTier[],
  tier: RsServiceSubscriptionTier,
): { subtotal?: string; setupFee?: string } {
  if (group.costType === RsGroupCostType.Setup) {
    return { setupFee: group.price == null ? undefined : formatPrice(group.price, group.currency) }
  }

  const recurringValue = computeRecurringSubtotals(group, tiers)[tier.name]
  if (recurringValue != null) return { subtotal: `${recurringValue}/mo` }

  if (tier.pricing.amount != null) {
    return { subtotal: `${formatPrice(tier.pricing.amount, tier.pricing.currency)}/mo` }
  }

  return {}
}

/** Builds a `SummarySection` for a non-add-on option group. */
export function buildBaseSection(
  group: RsOfferingOptionGroup,
  servicesByGroup: Map<string, ServiceEntry[]>,
  serviceLevelMap: Map<string, ServiceLevelEntry>,
  usageLimitsByService: Map<string, UsageLimit[]>,
  tiers: readonly RsServiceSubscriptionTier[],
  tier: RsServiceSubscriptionTier,
): SummarySection {
  const groupServices = servicesByGroup.get(group.id) ?? []
  const features = groupServices.flatMap((s) =>
    buildBaseServiceRows(s, serviceLevelMap, usageLimitsByService),
  )
  const footer = buildBaseSectionFooter(group, tiers, tier)

  return {
    id: group.id,
    title: group.name,
    isSetup: group.costType === RsGroupCostType.Setup,
    badge: 'included',
    features,
    ...footer,
  }
}

/** Builds a `SummarySection` for an enabled add-on option group. */
export function buildAddonSection(
  group: RsOfferingOptionGroup,
  servicesByGroup: Map<string, ServiceEntry[]>,
  serviceLevelMap: Map<string, ServiceLevelEntry>,
  usageLimitsByService: Map<string, UsageLimit[]>,
  services: readonly ServiceEntry[],
  tiers: readonly RsServiceSubscriptionTier[],
  tierName: string,
): SummarySection {
  const groupServices = servicesByGroup.get(group.id) ?? []
  const features = groupServices.map((s) =>
    buildAddonServiceRow(s, serviceLevelMap, usageLimitsByService),
  )

  const price = group.price == null ? undefined : `+${formatPrice(group.price, group.currency)}/mo`

  const rawSubtotal = computeAddonSubtotals(group, services, tiers)[tierName]
  const suffix = group.costType === RsGroupCostType.Recurring ? '/mo' : ''
  const subtotal = rawSubtotal == null ? undefined : `+${rawSubtotal}${suffix}`

  return {
    id: group.id,
    title: group.name,
    isSetup: false,
    badge: 'selected',
    price,
    features,
    subtotal,
  }
}

/** Builds the recurring line items: tier row first, then each enabled add-on. */
export function buildRecurringItems(
  tierName: string,
  tierPrice: string,
  enabledRecurringAddons: readonly RsOfferingOptionGroup[],
): PricingBreakdownItem[] {
  return [
    { label: `Tier (${tierName})`, price: tierPrice },
    ...enabledRecurringAddons.map((g) => ({
      label: g.name,
      price: g.price == null ? '—' : `${formatPrice(g.price, g.currency)}/mo`,
    })),
  ]
}

/** Computes and formats the total recurring price (tier + enabled add-ons). */
export function buildTotalRecurring(
  tierAmount: number,
  enabledRecurringAddons: readonly RsOfferingOptionGroup[],
  currency: string,
): string {
  const total = tierAmount + enabledRecurringAddons.reduce((sum, g) => sum + (g.price ?? 0), 0)
  const symbol = currency === 'USD' || !currency ? '$' : currency
  return `${symbol}${Math.round(total).toLocaleString()}/mo`
}

/**
 * Collects raw setup fee amounts, preferring service-level usageLimits
 * (`unitName === 'setup'`) and falling back to option-group–level prices.
 */
export function collectSetupItemsRaw(
  services: readonly ServiceEntry[],
  optionGroups: readonly RsOfferingOptionGroup[],
  usageLimitsByService: Map<string, UsageLimit[]>,
): RawSetupItem[] {
  const fromUsageLimits = services.flatMap((service) =>
    (usageLimitsByService.get(service.id) ?? [])
      .filter((ul) => ul.unitName === 'setup' && ul.unitPrice != null)
      .map((ul) => ({
        label: service.title,
        amount: ul.unitPrice!,
        currency: ul.unitPriceCurrency ?? 'USD',
      })),
  )

  if (fromUsageLimits.length > 0) return fromUsageLimits

  return optionGroups
    .filter((g) => g.costType === RsGroupCostType.Setup && g.price != null)
    .map((g) => ({ label: g.name, amount: g.price!, currency: g.currency ?? 'USD' }))
}

/** Formats raw setup items into `PricingBreakdownItem` entries. */
export function buildSetupItems(raw: RawSetupItem[]): PricingBreakdownItem[] {
  return raw.map((item) => ({
    label: item.label,
    sublabel: 'One-time fee',
    price: formatPrice(item.amount, item.currency),
    isSetup: true,
  }))
}

/** Computes and formats the total one-time setup cost. */
export function buildTotalSetup(raw: RawSetupItem[]): string {
  const total = raw.reduce((sum, item) => sum + item.amount, 0)
  const currency = raw[0]?.currency ?? 'USD'
  const symbol = currency === 'USD' || !currency ? '$' : currency
  return `${symbol}${Math.round(total).toLocaleString()}`
}

/**
 * Derives all display-ready data for `SummaryStep` from raw API data and the
 * user's current selections. Returns `null` when the offering has no tiers.
 *
 * @param servicesData    Full `RsServiceOffering` from the API.
 * @param selectedPlan    Tier name the user selected (e.g. "Team").
 *                        Falls back to the first tier when undefined.
 * @param enabledSections Map of optionGroup id → boolean for add-on toggles.
 */
export function buildSummaryStepData(
  servicesData: RsServiceOffering,
  selectedPlan: string | undefined,
  enabledSections: Record<string, boolean>,
): SummaryStepData | null {
  const tier =
    (selectedPlan ? servicesData.tiers.find((t) => t.name === selectedPlan) : undefined) ??
    servicesData.tiers[0]

  const servicesByGroup = buildServicesByGroupMap(servicesData.services)
  const serviceLevelMapInTiers = buildServiceLevelMapInTier(tier)
  const usageLimitsByService = buildUsageLimitsByServiceMapInTier(tier)

  const sections = servicesData.optionGroups
    .filter((g) => !g.isAddOn)
    .map((g) =>
      buildBaseSection(
        g,
        servicesByGroup,
        serviceLevelMapInTiers,
        usageLimitsByService,
        servicesData.tiers,
        tier,
      ),
    )

  const addons = servicesData.optionGroups
    .filter((g) => g.isAddOn && enabledSections[g.id])
    .map((g) =>
      buildAddonSection(
        g,
        servicesByGroup,
        serviceLevelMapInTiers,
        usageLimitsByService,
        servicesData.services,
        servicesData.tiers,
        tier.name,
      ),
    )

  const tierAmount = tier.pricing.amount ?? 0
  const pricingCurrency = tier.pricing.currency ?? 'USD'
  const tierPrice = `${formatPrice(tierAmount, pricingCurrency)}/mo`

  const enabledRecurringAddons = servicesData.optionGroups.filter(
    (g) => g.isAddOn && enabledSections[g.id] && g.costType === RsGroupCostType.Recurring,
  )

  const setupItemsRaw = collectSetupItemsRaw(
    servicesData.services,
    servicesData.optionGroups,
    usageLimitsByService,
  )

  return {
    tierName: tier.name,
    tierBasePrice: tierPrice,
    sections,
    addons,
    pricingBreakdown: {
      recurringItems: buildRecurringItems(tier.name, tierPrice, enabledRecurringAddons),
      totalRecurring: buildTotalRecurring(tierAmount, enabledRecurringAddons, pricingCurrency),
      setupItems: buildSetupItems(setupItemsRaw),
      totalSetup: buildTotalSetup(setupItemsRaw),
    },
  }
}
