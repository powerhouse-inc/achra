import { create } from 'zustand'
import type { ServicePurchaseActions, ServicePurchaseState, ServicePurchaseStore } from '../types'

const useServicePurchaseStore = create<ServicePurchaseStore>((set) => ({
  requestEntityData: null,

  actions: {
    setRequestEntityData: (requestEntityData) => {
      set({ requestEntityData })
    },
  },
}))

function useServicePurchaseState(): ServicePurchaseState {
  const { actions: _, ...state } = useServicePurchaseStore((state) => state)
  return state
}

function useServicePurchaseActions(): ServicePurchaseActions {
  return useServicePurchaseStore((state) => state.actions)
}

export { useServicePurchaseState, useServicePurchaseActions }
