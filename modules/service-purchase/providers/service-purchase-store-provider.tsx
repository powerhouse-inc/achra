'use client'

import { createContext, useContext, useState } from 'react'
import { useStore } from 'zustand'
import { useShallow } from 'zustand/react/shallow'
import type { RsOfferingFacetTarget } from '@/modules/__generated__/graphql/switchboard-generated'
import { createServicePurchaseStore } from '../stores/service-purchase-store'
import type { ServicePurchaseActions, ServicePurchaseState } from '../types'

export const ServicePurchaseStoreContext = createContext<ReturnType<
  typeof createServicePurchaseStore
> | null>(null)

export interface ServicePurchaseStoreProviderProps {
  children: React.ReactNode
  facets?: RsOfferingFacetTarget[]
}

export function ServicePurchaseStoreProvider({
  children,
  facets,
}: Readonly<ServicePurchaseStoreProviderProps>) {
  const [store] = useState(() => createServicePurchaseStore({ facets }))
  return (
    <ServicePurchaseStoreContext.Provider value={store}>
      {children}
    </ServicePurchaseStoreContext.Provider>
  )
}

function useServicePurchaseStoreContext() {
  const store = useContext(ServicePurchaseStoreContext)
  if (!store) {
    throw new Error(
      'useServicePurchaseStoreContext must be used within a ServicePurchaseStoreProvider',
    )
  }
  return store
}

export function useServicePurchaseState(): ServicePurchaseState {
  const store = useServicePurchaseStoreContext()
  return useStore(
    store,
    useShallow((state) => {
      const { actions: _, ...rest } = state
      return rest
    }),
  )
}

export function useServicePurchaseActions(): ServicePurchaseActions {
  const store = useServicePurchaseStoreContext()
  return useStore(store, (state) => state.actions)
}
