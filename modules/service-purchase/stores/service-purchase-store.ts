import { createStore } from 'zustand'
import { createFacetsSlice } from './facets-store-slice'
import { createSubmitRequestSlice } from './submit-request-slice'
import type { ServicePurchaseStore, ServicePurchaseStoreProps } from '../types'

const DEFAULT_PROPS: ServicePurchaseStoreProps = {
  facets: [],
}

function createServicePurchaseStore(initProps?: Partial<ServicePurchaseStoreProps>) {
  const props = { ...DEFAULT_PROPS, ...initProps }

  return createStore<ServicePurchaseStore>()((set) => {
    const submitRequestSlice = createSubmitRequestSlice(set)
    const facetsSlice = createFacetsSlice(set, props.facets)

    return {
      ...submitRequestSlice,
      ...facetsSlice,

      actions: {
        ...submitRequestSlice.actions,
        ...facetsSlice.actions,
      },
    }
  })
}

export { createServicePurchaseStore }
export type ServicePurchaseStoreApi = ReturnType<typeof createServicePurchaseStore>
