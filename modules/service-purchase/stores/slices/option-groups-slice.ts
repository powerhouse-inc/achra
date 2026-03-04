import {
  RsBillingCycle,
  type RsOfferingOptionGroup,
  RsServiceLevel,
  type RsServiceOffering,
  type RsServiceSubscriptionTier,
} from '@/modules/__generated__/graphql/switchboard-generated'
import type {
  OptionGroupsSlice,
  PurchaseOptionGroup,
  PurchaseOptionGroupService,
  PurchaseOptionGroupServiceMetric,
  ServicePurchaseStoreGet,
  ServicePurchaseStoreSet,
} from '../../types'

function toAmount(raw: unknown): number {
  const n = Number(raw)
  return Number.isNaN(n) ? 0 : n
}

function resolveServiceValue(serviceId: string, tier: RsServiceSubscriptionTier): string | null {
  const binding = tier.serviceLevels.find((sl) => sl.serviceId === serviceId)
  if (!binding) return null
  if (binding.level === RsServiceLevel.NotApplicable) return null
  if (binding.level === RsServiceLevel.Custom || binding.level === RsServiceLevel.Variable) {
    return binding.customValue ?? binding.level
  }
  return binding.level
}

function resolveMetrics(
  serviceId: string,
  tier: RsServiceSubscriptionTier,
): PurchaseOptionGroupServiceMetric[] {
  return tier.usageLimits
    .filter((ul) => ul.serviceId === serviceId)
    .map((ul) => ({
      label: ul.metric,
      value:
        ul.notes ??
        (ul.freeLimit == null
          ? 'Unlimited'
          : `${ul.freeLimit}${ul.unitName ? ` ${ul.unitName}` : ''}`),
    }))
}

function resolveOriginalPrice(
  group: RsOfferingOptionGroup,
  tierId: string,
  billingCycle: RsBillingCycle,
): number {
  const tierPricing = group.tierDependentPricing?.find((tp) => tp.tierId === tierId)
  if (tierPricing) {
    const recurring = tierPricing.recurringPricing.find((rp) => rp.billingCycle === billingCycle)
    if (recurring) return toAmount(recurring.amount)
    if (tierPricing.setupCost) return toAmount(tierPricing.setupCost.amount)
  }
  return toAmount(group.price)
}

function isGroupSelected(group: RsOfferingOptionGroup): boolean {
  if (!group.isAddOn) return true
  return group.defaultSelected
}

export function computeOptionGroups(
  services: RsServiceOffering,
  selectedTier: RsServiceSubscriptionTier,
): PurchaseOptionGroup[] {
  const { optionGroups, services: offeringServices } = services
  const billingCycle = RsBillingCycle.Monthly

  return optionGroups.map((group) => {
    const groupServices: PurchaseOptionGroupService[] = offeringServices
      .filter((s) => s.optionGroupId === group.id)
      .map((s) => ({
        id: s.id,
        title: s.title,
        resolvedValue: resolveServiceValue(s.id, selectedTier),
        metrics: resolveMetrics(s.id, selectedTier),
      }))

    return {
      id: group.id,
      name: group.name,
      costType: group.costType ?? null,
      isAddOn: group.isAddOn,
      isSelected: isGroupSelected(group),
      originalPrice: resolveOriginalPrice(group, selectedTier.id, billingCycle),
      resolvedPrice: resolveOriginalPrice(group, selectedTier.id, billingCycle),
      services: groupServices,
    }
  })
}

export function createOptionGroupsSlice(
  set: ServicePurchaseStoreSet,
  _get: ServicePurchaseStoreGet,
  services: RsServiceOffering,
): OptionGroupsSlice {
  const selectedTier = services.tiers[0]

  const optionGroups = computeOptionGroups(services, selectedTier)

  return {
    optionGroups,

    actions: {
      setOptionGroupSelected: (id, isSelected) => {
        set((state) => ({
          optionGroups: state.optionGroups.map((g) => (g.id === id ? { ...g, isSelected } : g)),
        }))
      },
    },
  }
}
