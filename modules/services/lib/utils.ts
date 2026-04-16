import { RsTemplateStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import { type Service, ServiceEntityEnum } from '@/modules/shared/types/services'
import {
  MOST_POPULAR_SERVICE_IDS,
  NEW_SERVICE_THRESHOLD_MS,
  RECOMMENDED_SERVICE_IDS,
} from './constants'
import type { OfferingPricingSummary, ServiceBadge } from '../types'

/**
 * Maps targetAudience label to ServiceEntityEnum
 * TODO: [API Integration] Consider using dynamic colors from API instead of enum-based approach
 */
function mapLabelToEntity(label: string): ServiceEntityEnum | null {
  const mapping: Record<string, ServiceEntityEnum> = {
    Builders: ServiceEntityEnum.Builders,
    Networks: ServiceEntityEnum.Networks,
    Operators: ServiceEntityEnum.Operators,
    Founders: ServiceEntityEnum.Founders,
    'SNO Governors': ServiceEntityEnum['SNO Governors'],
  }
  return mapping[label] ?? null
}

export { mapLabelToEntity }

/**
 * Generates 2-letter initials from a service title.
 * Takes the first letter of the first two words, or first two letters if single word.
 */
export function getServiceInitials(title: string): string {
  const words = title.trim().split(/\s+/)
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase()
  }
  return title.slice(0, 2).toUpperCase()
}

export function filterBySearch(services: Service[], search: string): Service[] {
  if (!search) return services

  const query = search.toLowerCase()
  return services.filter((service) => service.title.toLowerCase().includes(query))
}

/**
 * Determines the single badge to display on a service card.
 * Priority: Coming Soon > Recommended > Most Popular > New > Free trial > Pro only.
 */
export function getServiceBadge(
  service: Service,
  offeringSummary: OfferingPricingSummary | null,
): ServiceBadge | null {
  if (service.status === RsTemplateStatus.ComingSoon) return 'coming-soon'
  if (RECOMMENDED_SERVICE_IDS.includes(service.id)) return 'recommended'
  if (MOST_POPULAR_SERVICE_IDS.includes(service.id)) return 'most-popular'

  const lastModified = new Date(service.lastModified).getTime()
  if (Date.now() - lastModified < NEW_SERVICE_THRESHOLD_MS) return 'new'

  if (offeringSummary) {
    return offeringSummary.hasFreeTier ? 'free-trial' : 'pro-only'
  }

  return null
}
