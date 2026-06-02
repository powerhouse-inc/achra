import {
  RsBillingCycle,
  type ServiceOfferingFieldsFragment,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { getAvailableCycles } from '../../lib/billing-period'
import type { ServicePurchaseStoreGet, ServicePurchaseStoreSet, TiersSlice } from '../../types'

// ─── Slice factory ──────────
export function createTiersSlice(
  set: ServicePurchaseStoreSet,
  _get: ServicePurchaseStoreGet,
  services: ServiceOfferingFieldsFragment,
): TiersSlice {
  const { tiers } = services

  const selectedTier = tiers.find((t) => t.mostPopular) ?? tiers[0]

  const availableCycles = getAvailableCycles(services.availableBillingCycles)
  const selectedBillingCycle = availableCycles[0] ?? RsBillingCycle.Monthly

  return {
    tiers,
    selectedTier,
    selectedBillingCycle,
    hoveredTierId: null,

    actions: {
      setSelectedTier: (id) => {
        set((state) => ({
          selectedTier: state.tiers.find((t) => t.id === id) ?? state.selectedTier,
        }))
      },

      setSelectedBillingCycle: (cycle) => {
        set({ selectedBillingCycle: cycle })
      },

      setHoveredTier: (id) => {
        set({ hoveredTierId: id })
      },
    },
  }
}
