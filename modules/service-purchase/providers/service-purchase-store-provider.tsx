'use client'

import { createContext, useContext, useState } from 'react'
import { useStore } from 'zustand'
import { useShallow } from 'zustand/react/shallow'
import type {
  RsBillingCycle,
  RsOfferingFacetTarget,
  RsServiceOffering,
  RsServiceSubscriptionTier,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { createServicePurchaseStore } from '../stores/service-purchase-store'
import type {
  PurchaseOptionGroup,
  PurchaseTotals,
  ServicePurchaseActions,
  ServicePurchaseState,
} from '../types'

export const ServicePurchaseStoreContext = createContext<ReturnType<
  typeof createServicePurchaseStore
> | null>(null)

export interface ServicePurchaseStoreProviderProps {
  children: React.ReactNode
  facets?: RsOfferingFacetTarget[]
  services: RsServiceOffering
}

export function ServicePurchaseStoreProvider({
  children,
  facets,
  services,
}: Readonly<ServicePurchaseStoreProviderProps>) {
  const [store] = useState(() => createServicePurchaseStore({ facets, services }))
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

export function useSelectedTier(): RsServiceSubscriptionTier {
  const store = useServicePurchaseStoreContext()
  return useStore(store, (state) => state.selectedTier)
}

export function useSelectedBillingCycle(): RsBillingCycle {
  const store = useServicePurchaseStoreContext()
  return useStore(store, (state) => state.selectedBillingCycle)
}

export function useComputedTiers(): RsServiceSubscriptionTier[] {
  const store = useServicePurchaseStoreContext()
  return useStore(store, (state) => state.tiers)
}

export function useOptionGroups(): PurchaseOptionGroup[] {
  const store = useServicePurchaseStoreContext()
  return useStore(
    store,
    useShallow((state) => state.optionGroups.filter((g) => !g.isAddOn)),
  )
}

export function useSelectedAddOns(): PurchaseOptionGroup[] {
  const store = useServicePurchaseStoreContext()
  return useStore(
    store,
    useShallow((state) => state.optionGroups.filter((g) => g.isAddOn && g.isSelected)),
  )
}

export function useAllOptionGroups(): PurchaseOptionGroup[] {
  const store = useServicePurchaseStoreContext()
  return useStore(
    store,
    useShallow((state) => state.optionGroups),
  )
}

export function usePurchaseTotals(): PurchaseTotals {
  const store = useServicePurchaseStoreContext()
  return useStore(store, (state) => state.totals)
}

export function useServiceOffering(): RsServiceOffering {
  const store = useServicePurchaseStoreContext()
  return useStore(store, (state) => state.services)
}
