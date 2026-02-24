import {
  RsBillingCycle,
  type RsServiceOffering,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { calculateTotals } from '../../lib/calculate-totals'
import { getMonths } from '../../lib/utils'
import type {
  PurchaseTotals,
  ServicePurchaseStoreGet,
  ServicePurchaseStoreSet,
  TotalsSlice,
} from '../../types'

function computeTotals(
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

export function createTotalsSlice(
  set: ServicePurchaseStoreSet,
  get: ServicePurchaseStoreGet,
  services: RsServiceOffering,
): TotalsSlice {
  const { tiers, optionGroups, finalConfiguration } = services

  const initialTierId = finalConfiguration?.selectedTierId ?? tiers[0]?.id ?? ''
  const initialCycle = finalConfiguration?.selectedBillingCycle ?? RsBillingCycle.Monthly
  const initialActiveGroupIds = new Set(
    optionGroups
      .filter((g) => {
        if (!g.isAddOn) return true
        return (
          finalConfiguration?.addOnConfigs.some((c) => c.optionGroupId === g.id) ??
          g.defaultSelected
        )
      })
      .map((g) => g.id),
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
