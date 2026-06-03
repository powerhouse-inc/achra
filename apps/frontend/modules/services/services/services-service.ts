import {
  RsTemplateStatus,
  useBuildersListQuery,
  useResourceTemplatesQuery,
  useServicesListingOfferingsQuery,
} from '@/modules/__generated__/graphql/switchboard-generated'
import type { Service } from '@/modules/shared/types/services'
import { STATUS_PRIORITY } from '../lib/constants'
import { getServiceBadge } from '../lib/utils'
import type { EnrichedService, OfferingPricingSummary } from '../types'

export async function getServices(operatorId?: string): Promise<Service[]> {
  const data = await useResourceTemplatesQuery.fetcher({
    filter: operatorId ? { operatorId } : undefined,
  })()

  return data.resourceTemplates
    .filter(
      (service) =>
        service.operatorId?.trim() &&
        service.status !== RsTemplateStatus.Draft &&
        service.status !== RsTemplateStatus.Deprecated,
    )
    .sort((a, b) => (STATUS_PRIORITY[a.status] ?? 2) - (STATUS_PRIORITY[b.status] ?? 2))
}

export async function getServicesWithOfferings(): Promise<EnrichedService[]> {
  const [services, offeringsData, operatorsData] = await Promise.all([
    getServices(),
    useServicesListingOfferingsQuery.fetcher({})(),
    useBuildersListQuery.fetcher({ filter: { isOperator: true } })(),
  ])

  const offeringsMap = new Map<string, OfferingPricingSummary>()
  for (const offering of offeringsData.serviceOfferings) {
    if (!offering.resourceTemplateId) continue
    const hasFreeTier = offering.tiers.some(
      (tier) => tier.pricing.amount === null || Number(tier.pricing.amount) === 0,
    )
    offeringsMap.set(offering.resourceTemplateId, { hasFreeTier, tierCount: offering.tiers.length })
  }

  const operatorNamesMap = new Map<string, string>()
  for (const operator of operatorsData.builders) {
    if (!operator.id || !operator.name) continue
    operatorNamesMap.set(String(operator.id), operator.name)
  }

  return services.map((service) => {
    const offeringSummary = offeringsMap.get(service.id) ?? null
    const badge = getServiceBadge(service, offeringSummary)
    const operatorName = service.operatorId
      ? (operatorNamesMap.get(service.operatorId) ?? null)
      : null
    return { service, badge, offeringSummary, operatorName }
  })
}
