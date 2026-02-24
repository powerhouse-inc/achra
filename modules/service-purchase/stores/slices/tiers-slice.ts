import {
  RsBillingCycle,
  type RsServiceOffering,
} from '@/modules/__generated__/graphql/switchboard-generated'
import type { ServicePurchaseStoreGet, ServicePurchaseStoreSet, TiersSlice } from '../../types'

// ─── Slice factory ──────────
export function createTiersSlice(
  set: ServicePurchaseStoreSet,
  _get: ServicePurchaseStoreGet,
  services: RsServiceOffering,
): TiersSlice {
  const { tiers, finalConfiguration } = services

  const selectedTier = tiers.find((t) => t.id === finalConfiguration?.selectedTierId) ?? tiers[0]

  const selectedBillingCycle = finalConfiguration?.selectedBillingCycle ?? RsBillingCycle.Monthly

  return {
    tiers,
    selectedTier,
    selectedBillingCycle,

    actions: {
      setSelectedTier: (id) => {
        set((state) => ({
          selectedTier: state.tiers.find((t) => t.id === id) ?? state.selectedTier,
        }))
      },

      setSelectedBillingCycle: (cycle) => {
        set({ selectedBillingCycle: cycle })
      },
    },
  }
}
