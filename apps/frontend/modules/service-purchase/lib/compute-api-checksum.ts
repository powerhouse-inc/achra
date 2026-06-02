import type { ServiceOfferingFieldsFragment } from '@/modules/__generated__/graphql/switchboard-generated'
import { djb2Hash } from '@/shared/lib/hash'

/**
 * Computes a checksum of API data (services, including facetTargets) at init time.
 * When the stored checksum differs from the current checksum, persisted
 * user selections are ignored and fresh API-derived state is used.
 */
export function computeApiChecksum(services: ServiceOfferingFieldsFragment): string {
  const payload = {
    serviceId: services.id,
    lastModified: services.lastModified,
    tierIds: services.tiers.map((t) => t.id).sort((a, b) => a.localeCompare(b)),
    optionGroupIds: services.optionGroups.map((g) => g.id).sort((a, b) => a.localeCompare(b)),
    facetKeys: services.facetTargets.map((f) => f.categoryKey).sort((a, b) => a.localeCompare(b)),
  }
  return djb2Hash(JSON.stringify(payload))
}
