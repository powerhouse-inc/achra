'use client'

import { createContext, useContext, useState } from 'react'
import { useStore } from 'zustand'
import { useShallow } from 'zustand/react/shallow'
import type {
  RsBillingCycle,
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
  services: RsServiceOffering
}

function ServicePurchaseStoreProvider({
  children,
  services,
}: Readonly<ServicePurchaseStoreProviderProps>) {
  const [store] = useState(() => createServicePurchaseStore({ services }))

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

function useServicePurchaseState(): ServicePurchaseState {
  const store = useServicePurchaseStoreContext()
  return useStore(
    store,
    useShallow((state) => {
      const { actions: _, ...rest } = state
      return rest
    }),
  )
}

function useServicePurchaseActions(): ServicePurchaseActions {
  const store = useServicePurchaseStoreContext()
  return useStore(store, (state) => state.actions)
}

function useSelectedTier(): RsServiceSubscriptionTier {
  const store = useServicePurchaseStoreContext()
  return useStore(store, (state) => state.selectedTier)
}

function useSelectedBillingCycle(): RsBillingCycle {
  const store = useServicePurchaseStoreContext()
  return useStore(store, (state) => state.selectedBillingCycle)
}

function useComputedTiers(): RsServiceSubscriptionTier[] {
  const store = useServicePurchaseStoreContext()
  return useStore(store, (state) => state.tiers)
}

function useOptionGroups(): PurchaseOptionGroup[] {
  const store = useServicePurchaseStoreContext()
  return useStore(
    store,
    useShallow((state) => state.optionGroups.filter((g) => !g.isAddOn)),
  )
}

function useSelectedAddOns(): PurchaseOptionGroup[] {
  const store = useServicePurchaseStoreContext()
  return useStore(
    store,
    useShallow((state) => state.optionGroups.filter((g) => g.isAddOn && g.isSelected)),
  )
}

function useAllOptionGroups(): PurchaseOptionGroup[] {
  const store = useServicePurchaseStoreContext()
  return useStore(
    store,
    useShallow((state) => state.optionGroups),
  )
}

function usePurchaseTotals(): PurchaseTotals {
  const store = useServicePurchaseStoreContext()
  return useStore(store, (state) => state.totals)
}

function useServiceOffering(): RsServiceOffering {
  const store = useServicePurchaseStoreContext()
  return useStore(store, (state) => state.services)
}

export {
  ServicePurchaseStoreProvider,
  useServicePurchaseState,
  useServicePurchaseActions,
  useSelectedTier,
  useSelectedBillingCycle,
  useComputedTiers,
  useOptionGroups,
  useSelectedAddOns,
  useAllOptionGroups,
  usePurchaseTotals,
  useServiceOffering,
}
