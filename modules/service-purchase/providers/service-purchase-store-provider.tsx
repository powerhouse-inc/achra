'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
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
  ServicePurchaseStep,
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

function useServicePurchaseStep() {
  const store = useServicePurchaseStoreContext()
  const activeStep = useStore(store, (state) => state.activeStep)
  const visitedSteps = useStore(
    store,
    useShallow((state) => state.visitedSteps),
  )
  const disabledSteps = useStore(
    store,
    useShallow((state) => state.disabledSteps),
  )
  const actions = useStore(store, (state) => state.actions)

  const visitedSet = useMemo(() => new Set(visitedSteps), [visitedSteps])
  const disabledSet = useMemo(() => new Set(disabledSteps), [disabledSteps])

  const hasVisitedStep = useCallback(
    (step: ServicePurchaseStep) => visitedSet.has(step),
    [visitedSet],
  )
  const isStepDisabled = useCallback(
    (step: ServicePurchaseStep) => disabledSet.has(step),
    [disabledSet],
  )

  return useMemo(
    () => ({
      activeStep,
      hasVisitedStep,
      isStepDisabled,
      goToStep: actions.goToStep,
      goBack: actions.goBack,
      resetPostConfigureSteps: actions.resetPostConfigureSteps,
    }),
    [
      activeStep,
      hasVisitedStep,
      isStepDisabled,
      actions.goToStep,
      actions.goBack,
      actions.resetPostConfigureSteps,
    ],
  )
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
  useServicePurchaseStep,
}
