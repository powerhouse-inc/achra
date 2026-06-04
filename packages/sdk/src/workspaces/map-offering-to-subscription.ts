import { generateId } from 'document-model/core'
import type {
  OptionGroupBreakdown,
  PriceBreakdown,
  ServiceOfferingState,
  ServiceSubscriptionTier,
  ServiceUsageLimit,
  Service as SOService,
} from '@powerhousedao/op-hub/document-models/service-offering'
import type {
  AccrualCycle,
  DiscountInfoInitInput,
  DiscountType,
  InitializeMetricInput,
  InitializeServiceGroupInput,
  InitializeServiceInput,
  InitializeSubscriptionInput,
  MetricType,
  BillingCycle as SIBillingCycle,
} from '@powerhousedao/op-hub/document-models/subscription-instance'

export interface MapOfferingOptions {
  offering: ServiceOfferingState
  tierId: string
  selectedBillingCycle: SIBillingCycle
  customerId?: string
  customerName?: string
  customerEmail?: string
  createdAt: string
  priceBreakdown: PriceBreakdown
  serviceOfferingDocumentId?: string
}

/**
 * Port of op-hub `editors/subscription-instance-editor/components/mapOfferingToSubscription.ts`.
 * Pure transformation — no server deps. Keeps the SI snapshot semantics: the
 * subscription lives independently of the offering after creation.
 */
export function mapOfferingToSubscription(
  options: MapOfferingOptions,
): InitializeSubscriptionInput {
  const {
    offering,
    tierId,
    selectedBillingCycle,
    customerId,
    customerName,
    customerEmail,
    createdAt,
    priceBreakdown,
  } = options

  const tier = offering.tiers.find((t) => t.id === tierId)
  if (!tier) {
    throw new Error(`Tier ${tierId} not found in offering`)
  }

  const currency = priceBreakdown.tierCurrency || tier.pricing.currency
  const pricingMode = tier.pricingMode || 'MANUAL_OVERRIDE'

  const groupedServiceIds = new Set<string>()

  const serviceGroups: InitializeServiceGroupInput[] = []
  mapBreakdownGroups(offering, tier, priceBreakdown, currency, groupedServiceIds, serviceGroups)

  const breakdownGroupIds = new Set<string>([
    ...priceBreakdown.optionGroupBreakdowns.map((b) => b.optionGroupId),
    ...priceBreakdown.setupGroupBreakdowns.map((b) => b.optionGroupId),
    ...priceBreakdown.addOnBreakdowns.map((b) => b.optionGroupId),
  ])

  const standaloneServices = offering.services
    .filter((s) => !groupedServiceIds.has(s.id))
    .filter((s) => !s.optionGroupId || breakdownGroupIds.has(s.optionGroupId))
    .filter((svc) => {
      const level = tier.serviceLevels.find((sl) => sl.serviceId === svc.id)
      return level && level.level !== 'NOT_INCLUDED' && level.level !== 'NOT_APPLICABLE'
    })
    .map((svc) => mapServiceToInput(svc, tier, currency, selectedBillingCycle))

  let tierPrice: number | undefined
  if (pricingMode === 'CALCULATED') {
    tierPrice = serviceGroups.reduce((sum, grp) => sum + (grp.recurringAmount ?? 0), 0)
  } else {
    tierPrice = priceBreakdown.tierCycleTotal || tier.pricing.amount || undefined
  }

  return {
    customerId: customerId ?? undefined,
    customerName: customerName ?? undefined,
    customerEmail: customerEmail ?? undefined,
    serviceOfferingId: options.serviceOfferingDocumentId ?? offering.id ?? undefined,
    tierName: tier.name,
    tierPricingOptionId: tier.id,
    tierPrice,
    tierCurrency: currency,
    tierPricingMode: pricingMode,
    selectedBillingCycle,
    globalCurrency: currency,
    autoRenew: true,
    createdAt,
    services: standaloneServices,
    serviceGroups,
  }
}

function mapBreakdownGroups(
  offering: ServiceOfferingState,
  tier: ServiceSubscriptionTier,
  breakdown: PriceBreakdown,
  globalCurrency: string,
  groupedServiceIds: Set<string>,
  serviceGroups: InitializeServiceGroupInput[],
): void {
  const allOptionGroupBreakdowns: OptionGroupBreakdown[] = [
    ...breakdown.optionGroupBreakdowns,
    ...breakdown.setupGroupBreakdowns,
  ]

  for (const ogBreakdown of allOptionGroupBreakdowns) {
    const og = offering.optionGroups.find((g) => g.id === ogBreakdown.optionGroupId)
    if (!og || og.isAddOn) continue

    const services = offering.services
      .filter((s) => s.optionGroupId === og.id)
      .filter((s) => {
        const level = tier.serviceLevels.find((sl) => sl.serviceId === s.id)
        return level && level.level !== 'NOT_INCLUDED' && level.level !== 'NOT_APPLICABLE'
      })
    if (services.length === 0) continue
    services.forEach((s) => groupedServiceIds.add(s.id))

    serviceGroups.push({
      id: generateId(),
      name: og.name,
      optional: false,
      costType: og.costType ?? undefined,
      recurringAmount: ogBreakdown.recurringAmount || undefined,
      recurringCurrency: ogBreakdown.currency || globalCurrency,
      recurringBillingCycle: ogBreakdown.effectiveBillingCycle,
      recurringDiscount: mapBreakdownDiscount(
        ogBreakdown.discount,
        og.discountMode === 'INHERIT_TIER' ? 'TIER_INHERITED' : 'GROUP_INDEPENDENT',
      ),
      setupAmount: ogBreakdown.setupCost ?? undefined,
      setupCurrency: ogBreakdown.setupCostCurrency ?? undefined,
      services: services.map((svc) =>
        mapServiceToInput(svc, tier, globalCurrency, ogBreakdown.effectiveBillingCycle),
      ),
    })
  }

  for (const aoBreakdown of breakdown.addOnBreakdowns) {
    const og = offering.optionGroups.find((g) => g.id === aoBreakdown.optionGroupId)
    if (!og) continue

    const services = offering.services
      .filter((s) => s.optionGroupId === og.id)
      .filter((s) => {
        const level = tier.serviceLevels.find((sl) => sl.serviceId === s.id)
        return level && level.level !== 'NOT_INCLUDED' && level.level !== 'NOT_APPLICABLE'
      })
    if (services.length === 0) continue
    services.forEach((s) => groupedServiceIds.add(s.id))

    serviceGroups.push({
      id: generateId(),
      name: og.name,
      optional: true,
      costType: og.costType ?? undefined,
      recurringAmount: aoBreakdown.recurringAmount || undefined,
      recurringCurrency: aoBreakdown.currency || globalCurrency,
      recurringBillingCycle: aoBreakdown.selectedBillingCycle,
      recurringDiscount: mapBreakdownDiscount(
        aoBreakdown.discount,
        og.discountMode === 'INHERIT_TIER' ? 'TIER_INHERITED' : 'GROUP_INDEPENDENT',
      ),
      setupAmount: aoBreakdown.setupCost ?? undefined,
      setupCurrency: aoBreakdown.setupCostCurrency ?? undefined,
      services: services.map((svc) =>
        mapServiceToInput(svc, tier, globalCurrency, aoBreakdown.selectedBillingCycle),
      ),
    })
  }
}

function mapServiceToInput(
  svc: SOService,
  tier: ServiceSubscriptionTier,
  globalCurrency: string,
  billingCycle: SIBillingCycle,
): InitializeServiceInput {
  const level = tier.serviceLevels.find((sl) => sl.serviceId === svc.id)
  const metrics = mapUsageLimits(svc.id, tier.usageLimits, globalCurrency)

  return {
    id: generateId(),
    name: svc.title,
    description: svc.description ?? null,
    customValue: level?.customValue ?? null,
    recurringBillingCycle: billingCycle,
    metrics,
  }
}

function mapBreakdownDiscount(
  discount: {
    discountType: string
    discountValue: number
    originalAmount: number
    discountedAmount: number
  } | null,
  source: 'TIER_INHERITED' | 'GROUP_INDEPENDENT',
): DiscountInfoInitInput | undefined {
  if (!discount) return undefined
  return {
    originalAmount: discount.originalAmount,
    discountType: discount.discountType as DiscountType,
    discountValue: discount.discountValue,
    source,
  }
}

function mapUsageLimits(
  serviceId: string,
  usageLimits: ServiceUsageLimit[],
  globalCurrency: string,
): InitializeMetricInput[] {
  const limits = usageLimits.filter((ul) => ul.serviceId === serviceId)

  return limits.map((ul) => {
    // Legacy fallback: older SO docs may lack accrualCycle/metricType. The
    // published types mark these as required but historical data may not
    // satisfy that — defend at runtime.
    const legacyReset = (ul as { resetCycle?: string | null }).resetCycle
    const accrualCycle: AccrualCycle =
      ul.accrualCycle ??
      (legacyReset && legacyReset !== 'NONE' ? (legacyReset as AccrualCycle) : 'MONTHLY')

    const metricType: MetricType = ul.metricType ?? 'NON_CUMULATIVE'

    return {
      id: generateId(),
      name: ul.metric,
      unitName: ul.unitName ?? 'units',
      freeLimit: ul.freeLimit ?? null,
      paidLimit: ul.paidLimit ?? null,
      currentUsage: 0,
      metricType,
      accrualCycle,
      unitCostAmount: ul.unitPrice ?? undefined,
      unitCostCurrency: ul.unitPriceCurrency ?? globalCurrency,
      unitCostBillingCycle: 'MONTHLY' as const,
    }
  })
}
