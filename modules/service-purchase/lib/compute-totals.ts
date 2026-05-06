import type {
  RsBillingCycle,
  ServiceOfferingFieldsFragment,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { computeTotalsFromBreakdown, getPriceBreakdown } from './price-breakdown-utils'
import type { PurchaseTotals } from '../types'

/**
 * Computes purchase totals from service offering and current selections.
 * Uses getUserSelectionPriceBreakdown from @powerhousedao/service-offering as single source of truth.
 * Used by the totals slice and by the store's merge function during rehydration.
 */
export function computeTotals(
  services: ServiceOfferingFieldsFragment,
  selectedTierId: string,
  selectedBillingCycle: RsBillingCycle,
  activeGroupIds: Set<string>,
): PurchaseTotals {
  const breakdown = getPriceBreakdown(
    services,
    selectedTierId,
    selectedBillingCycle,
    activeGroupIds,
  )
  return computeTotalsFromBreakdown(breakdown)
}
