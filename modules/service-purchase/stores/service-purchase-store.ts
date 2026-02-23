import { create } from 'zustand'
import { createSubmitRequestSlice } from './submit-request-slice'
import type { ServicePurchaseActions, ServicePurchaseState, ServicePurchaseStore } from '../types'

const useServicePurchaseStore = create<ServicePurchaseStore>((set) => {
  const submitRequestSlice = createSubmitRequestSlice(set)
  return {
    ...submitRequestSlice,

    actions: {
      ...submitRequestSlice.actions,
    },
  }
})

function useServicePurchaseState(): ServicePurchaseState {
  const { actions: _, ...state } = useServicePurchaseStore((state) => state)
  return state
}

function useServicePurchaseActions(): ServicePurchaseActions {
  return useServicePurchaseStore((state) => state.actions)
}

export { useServicePurchaseState, useServicePurchaseActions }
