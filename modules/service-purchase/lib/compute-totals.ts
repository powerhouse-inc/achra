import type {
  RsBillingCycle,
  RsServiceOffering,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { calculateTotals } from './calculate-totals'
import { getMonths } from './utils'
import type { PurchaseTotals } from '../types'

/**
 * Computes purchase totals from service offering and current selections.
 * Used by the totals slice and by the store's merge function during rehydration.
 */
export function computeTotals(
  services: RsServiceOffering,
  selectedTierId: string,
  selectedBillingCycle: RsBillingCycle,
  activeGroupIds: Set<string>,
): PurchaseTotals {
  const result = calculateTotals({
    offering: services,
    selectedTierId,
    selectedBillingCycle,
    activeGroupIds,
  })
  const months = getMonths(selectedBillingCycle)
  return {
    recurringTotal: result.recurringTotal / months,
    setupTotal: result.setupTotal,
  }
}
