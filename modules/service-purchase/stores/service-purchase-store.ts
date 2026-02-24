import { createStore } from 'zustand'
import { createFacetsSlice } from './facets-store-slice'
import { createOptionGroupsSlice } from './slices/option-groups-slice'
import { createTiersSlice } from './slices/tiers-slice'
import { createTotalsSlice } from './slices/totals-slice'
import { createSubmitRequestSlice } from './submit-request-slice'
import type { ServicePurchaseStore, ServicePurchaseStoreProps } from '../types'

function createServicePurchaseStore(initProps: ServicePurchaseStoreProps) {
  return createStore<ServicePurchaseStore>()((set, get) => {
    const submitRequestSlice = createSubmitRequestSlice(set)
    const facetsSlice = createFacetsSlice(set, initProps.facets)
    const tiersSlice = createTiersSlice(set, get, initProps.services)
    const optionGroupsSlice = createOptionGroupsSlice(set, get, initProps.services)
    const totalsSlice = createTotalsSlice(set, get, initProps.services)

    return {
      ...submitRequestSlice,
      ...facetsSlice,
      ...tiersSlice,
      ...optionGroupsSlice,
      ...totalsSlice,

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
  })
}

export { createServicePurchaseStore }
export type ServicePurchaseStoreApi = ReturnType<typeof createServicePurchaseStore>
