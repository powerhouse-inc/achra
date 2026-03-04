import {
  RsBillingCycle,
  type RsServiceOffering,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { computeTotals } from '../../lib/compute-totals'
import type { ServicePurchaseStoreGet, ServicePurchaseStoreSet, TotalsSlice } from '../../types'

export function createTotalsSlice(
  set: ServicePurchaseStoreSet,
  get: ServicePurchaseStoreGet,
  services: RsServiceOffering,
): TotalsSlice {
  const { tiers, optionGroups } = services

  const initialTierId = tiers[0]?.id ?? ''
  const initialCycle = RsBillingCycle.Monthly
  const initialActiveGroupIds = new Set(
    optionGroups.filter((g) => !g.isAddOn || g.defaultSelected).map((g) => g.id),
  )

  const initialTotals = computeTotals(services, initialTierId, initialCycle, initialActiveGroupIds)

  return {
    totals: initialTotals,

    actions: {
      recomputeTotals: () => {
        const state = get()
        const activeGroupIds = new Set(
          state.optionGroups.filter((g) => g.isSelected).map((g) => g.id),
        )
        set({
          totals: computeTotals(
            services,
            state.selectedTier.id,
            state.selectedBillingCycle,
            activeGroupIds,
          ),
        })
      },
    },
  }
}
