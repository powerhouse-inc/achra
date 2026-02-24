import type { ServicePurchaseStoreSet, SubmitRequestSlice } from '../types'

function createSubmitRequestSlice(set: ServicePurchaseStoreSet): SubmitRequestSlice {
  return {
    requestEntityData: null,
    actions: {
      setRequestEntityData: (requestEntityData) => {
        set({ requestEntityData })
      },
    },
  }
}

export { createSubmitRequestSlice }
