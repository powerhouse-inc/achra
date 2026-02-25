import { createStore } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import type { RsBillingCycle } from '@/modules/__generated__/graphql/switchboard-generated'
import { ENVIRONMENT } from '@/modules/shared/config/constants'
import ff from '@/modules/shared/lib/feature-flags'
import { computeApiChecksum } from '../lib/compute-api-checksum'
import { computeTotals } from '../lib/compute-totals'
import { createFacetsSlice } from './slices/facets-store-slice'
import { createOptionGroupsSlice } from './slices/option-groups-slice'
import { createSubmitRequestSlice } from './slices/submit-request-slice'
import { createTiersSlice } from './slices/tiers-slice'
import { createTotalsSlice } from './slices/totals-slice'
import type {
  PersistedServicePurchaseState,
  ServicePurchaseStore,
  ServicePurchaseStoreProps,
} from '../types'

function createServicePurchaseStore({ services }: ServicePurchaseStoreProps) {
  const storageKey = `service-${services.id}`
  const currentApiChecksum = computeApiChecksum(services)

  const innerStore = devtools<ServicePurchaseStore>(
    (set, get) => {
      const submitRequestSlice = createSubmitRequestSlice(set)
      const facetsSlice = createFacetsSlice(set, services.facetTargets)
      const tiersSlice = createTiersSlice(set, get, services)
      const optionGroupsSlice = createOptionGroupsSlice(set, get, services)
      const totalsSlice = createTotalsSlice(set, get, services)

      return {
        ...submitRequestSlice,
        ...facetsSlice,
        ...tiersSlice,
        ...optionGroupsSlice,
        ...totalsSlice,
        services,

        actions: {
          ...submitRequestSlice.actions,
          ...facetsSlice.actions,
          ...tiersSlice.actions,
          ...optionGroupsSlice.actions,
          ...totalsSlice.actions,

          // Override actions that affect totals — atomic: set once per action
          setSelectedTier: (id) => {
            tiersSlice.actions.setSelectedTier(id)
            totalsSlice.actions.recomputeTotals()
          },
          setSelectedBillingCycle: (cycle) => {
            tiersSlice.actions.setSelectedBillingCycle(cycle)
            totalsSlice.actions.recomputeTotals()
          },
          setOptionGroupSelected: (id, isSelected) => {
            optionGroupsSlice.actions.setOptionGroupSelected(id, isSelected)
            totalsSlice.actions.recomputeTotals()
          },
        },
      }
    },
    { name: 'ServicePurchaseStore', enabled: ENVIRONMENT !== 'production' },
  )

  return ff.ENABLE_SERVICE_PURCHASE_STORE_PERSISTENCE
    ? createStore<ServicePurchaseStore>()(
        persist(innerStore, {
          name: storageKey,
          storage: createJSONStorage(() => localStorage),
          // partialize the state to only the fields that we want to persist
          partialize: (state): PersistedServicePurchaseState => ({
            apiChecksum: computeApiChecksum(state.services),
            selectedTierId: state.selectedTier.id,
            selectedBillingCycle: state.selectedBillingCycle,
            selectedFacetOptions: Object.fromEntries(
              state.facets.map((f) => [f.originalFacet.categoryKey, f.selectedOption]),
            ),
            optionGroupSelections: Object.fromEntries(
              state.optionGroups.map((g) => [g.id, g.isSelected]),
            ),
            requestEntityData: state.requestEntityData,
          }),
          // merge the persisted state with the hydrated current state
          merge: (persistedState, currentState) => {
            const persisted = persistedState as
              | Partial<PersistedServicePurchaseState>
              | null
              | undefined
            if (persisted?.apiChecksum !== currentApiChecksum) {
              // ignore the persisted data if the data in the API has changed since the last time the store was persisted
              return currentState
            }
            const selectedTier =
              currentState.tiers.find((t) => t.id === persisted.selectedTierId) ??
              currentState.selectedTier
            const validBillingCycles = new Set(
              selectedTier.billingCycleDiscounts.map((d) => d.billingCycle),
            )
            const selectedBillingCycle: RsBillingCycle =
              persisted.selectedBillingCycle != null &&
              validBillingCycles.has(persisted.selectedBillingCycle)
                ? persisted.selectedBillingCycle
                : currentState.selectedBillingCycle
            const mergedFacets = currentState.facets.map((f) => {
              const persistedVal = persisted.selectedFacetOptions?.[f.originalFacet.categoryKey]
              const isValid =
                persistedVal != null && f.originalFacet.selectedOptions.includes(persistedVal)
              return {
                ...f,
                selectedOption: isValid ? persistedVal : f.selectedOption,
              }
            })
            const mergedOptionGroups = currentState.optionGroups.map((g) => ({
              ...g,
              isSelected: persisted.optionGroupSelections?.[g.id] ?? g.isSelected,
            }))

            // we need to recompute the totals because the option groups may have changed
            const activeGroupIds = new Set(
              mergedOptionGroups.filter((g) => g.isSelected).map((g) => g.id),
            )
            const totals = computeTotals(
              currentState.services,
              selectedTier.id,
              selectedBillingCycle,
              activeGroupIds,
            )

            return {
              ...currentState,
              selectedTier,
              selectedBillingCycle,
              facets: mergedFacets,
              optionGroups: mergedOptionGroups,
              requestEntityData: persisted.requestEntityData ?? currentState.requestEntityData,
              totals,
            }
          },
        }),
      )
    : createStore<ServicePurchaseStore>()(innerStore)
}

export { createServicePurchaseStore }
export type ServicePurchaseStoreApi = ReturnType<typeof createServicePurchaseStore>
