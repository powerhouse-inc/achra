'use client'

import { createContext, type ReactNode, useContext } from 'react'
import type { RsServiceSubscriptionTier } from '@/modules/__generated__/graphql/switchboard-generated'

interface PricingCalculatorContextValue {
  /** The currently selected/active plan */
  activePlan?: string
  /** Navigate to previous plan in carousel */
  onPrevPlan: () => void
  /** Navigate to next plan in carousel */
  onNextPlan: () => void
  /** Tier names derived from API data */
  tierNames: string[]
  tiers: RsServiceSubscriptionTier[]
}

const PricingCalculatorContext = createContext<PricingCalculatorContextValue | null>(null)

export function usePricingCalculatorContext() {
  const context = useContext(PricingCalculatorContext)
  if (!context) {
    throw new Error('usePricingCalculatorContext must be used within PricingCalculatorProvider')
  }
  return context
}

interface PricingCalculatorProviderProps {
  children: ReactNode
  value: PricingCalculatorContextValue
}

export function PricingCalculatorProvider({
  children,
  value,
}: Readonly<PricingCalculatorProviderProps>) {
  return (
    <PricingCalculatorContext.Provider value={value}>{children}</PricingCalculatorContext.Provider>
  )
}
