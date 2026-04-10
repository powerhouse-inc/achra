import debounce from 'lodash/debounce'
import { toast } from 'sonner'
import { createStore } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import type { RsBillingCycle } from '@/modules/__generated__/graphql/switchboard-generated'
import { ENVIRONMENT } from '@/modules/shared/lib/constants'
import ff from '@/modules/shared/lib/feature-flags'
import { getAvailableCycles } from '../lib/billing-period'
import { computeApiChecksum } from '../lib/compute-api-checksum'
import { computeTotals } from '../lib/compute-totals'
import { SERVICE_PURCHASE_STEP_VALUES } from '../lib/constants'
import { mergeStateWithUrlStepIfPresent } from '../lib/merge-state-with-url-step'
import {
  clearServicePurchasePersistedState,
  getServicePurchaseStorageKey,
} from '../lib/persistence-utils'
import {
  type PersistedServicePurchaseState,
  ServicePurchaseStep,
  type ServicePurchaseStore,
  type ServicePurchaseStoreProps,
} from '../types'
import { createFacetsSlice } from './slices/facets-store-slice'
import { computeOptionGroups, createOptionGroupsSlice } from './slices/option-groups-slice'
import { createStepSlice } from './slices/step-slice'
import { createSubmitRequestSlice } from './slices/submit-request-slice'
import { createTiersSlice } from './slices/tiers-slice'
import { createTotalsSlice } from './slices/totals-slice'

const showRestorationToast = debounce((result: 'restored' | 'discarded') => {
  if (result === 'restored') {
    toast.success('Your previous configuration was restored.')
  } else {
    toast.info(
      "We couldn't restore your previous configuration because the service options have changed.",
    )
  }
}, 1000)

function createServicePurchaseStore({ services }: ServicePurchaseStoreProps) {
  const storageKey = getServicePurchaseStorageKey(services.id)
  const currentApiChecksum = computeApiChecksum(services)

  /**
   * Tracks the result of the restoration process.
   * null: not restored yet
   * 'restored': restored successfully
   * 'discarded': discarded because the data in the API has changed since the last time the store was persisted
   */
  let restorationResult: 'restored' | 'discarded' | null = null

  const innerStore = devtools<ServicePurchaseStore>(
    (set, get) => {
      const submitRequestSlice = createSubmitRequestSlice(set)
      const facetsSlice = createFacetsSlice(set, services.facetTargets)
      const tiersSlice = createTiersSlice(set, get, services)
      const optionGroupsSlice = createOptionGroupsSlice(set, get, services)
      const totalsSlice = createTotalsSlice(set, get, services)
      const stepSlice = createStepSlice(set, get)

      return {
        ...submitRequestSlice,
        ...facetsSlice,
        ...tiersSlice,
        ...optionGroupsSlice,
        ...totalsSlice,
        ...stepSlice,
        services,

        actions: {
          ...submitRequestSlice.actions,
          ...facetsSlice.actions,
          ...tiersSlice.actions,
          ...optionGroupsSlice.actions,
          ...totalsSlice.actions,
          ...stepSlice.actions,

          // Override actions that affect totals — atomic: set once per action
          setSelectedTier: (id) => {
            if (get().selectedTier.id !== id) {
              stepSlice.actions.resetPostConfigureSteps()
            }
            tiersSlice.actions.setSelectedTier(id)
            optionGroupsSlice.actions.recomputeOptionGroups()
            totalsSlice.actions.recomputeTotals()
          },
          setSelectedBillingCycle: (cycle) => {
            if (get().selectedBillingCycle !== cycle) {
              stepSlice.actions.resetPostConfigureSteps()
            }
            tiersSlice.actions.setSelectedBillingCycle(cycle)
            totalsSlice.actions.recomputeTotals()
          },
          setOptionGroupSelected: (id, isSelected) => {
            stepSlice.actions.resetPostConfigureSteps()
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
            activeStep: state.activeStep,
            visitedSteps: state.visitedSteps,
            disabledSteps: state.disabledSteps,
          }),
          // merge the persisted state with the hydrated current state
          merge: (persistedState, currentState) => {
            const persisted = persistedState as
              | Partial<PersistedServicePurchaseState>
              | null
              | undefined
            if (persisted == null) {
              restorationResult = null
              return mergeStateWithUrlStepIfPresent(currentState)
            }
            if (persisted.activeStep === ServicePurchaseStep.Confirmation) {
              restorationResult = null
              clearServicePurchasePersistedState(services.id)
              return mergeStateWithUrlStepIfPresent(currentState)
            }
            if (persisted.apiChecksum !== currentApiChecksum) {
              restorationResult = 'discarded'
              // remove the obsolete persisted data
              clearServicePurchasePersistedState(services.id)
              // ignore the persisted data if the data in the API has changed since the last time the store was persisted
              return mergeStateWithUrlStepIfPresent(currentState)
            }
            restorationResult = 'restored'

            const selectedTier =
              currentState.tiers.find((t) => t.id === persisted.selectedTierId) ??
              currentState.selectedTier
            const validBillingCycles = new Set(
              getAvailableCycles(currentState.services.availableBillingCycles),
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
            const freshOptionGroups = computeOptionGroups(currentState.services, selectedTier)
            const mergedOptionGroups = freshOptionGroups.map((g) => ({
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

            const isValidStep =
              persisted.activeStep != null &&
              SERVICE_PURCHASE_STEP_VALUES.includes(persisted.activeStep)
            const activeStep: (typeof currentState)['activeStep'] = isValidStep
              ? (persisted.activeStep as (typeof currentState)['activeStep'])
              : currentState.activeStep
            const visitedSteps =
              Array.isArray(persisted.visitedSteps) && persisted.visitedSteps.length > 0
                ? persisted.visitedSteps.filter((s) => SERVICE_PURCHASE_STEP_VALUES.includes(s))
                : currentState.visitedSteps
            const disabledSteps =
              Array.isArray(persisted.disabledSteps) && persisted.disabledSteps.length > 0
                ? persisted.disabledSteps.filter((s) => SERVICE_PURCHASE_STEP_VALUES.includes(s))
                : currentState.disabledSteps

            return mergeStateWithUrlStepIfPresent({
              ...currentState,
              selectedTier,
              selectedBillingCycle,
              facets: mergedFacets,
              optionGroups: mergedOptionGroups,
              requestEntityData: persisted.requestEntityData ?? currentState.requestEntityData,
              totals,
              activeStep,
              visitedSteps,
              disabledSteps,
            })
          },
          onRehydrateStorage: () => (_state, error) => {
            if (error) return
            if (restorationResult === null) return
            showRestorationToast(restorationResult)
          },
        }),
      )
    : createStore<ServicePurchaseStore>()(innerStore)
}

export { createServicePurchaseStore }
export type ServicePurchaseStoreApi = ReturnType<typeof createServicePurchaseStore>
