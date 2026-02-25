'use client'

import { createContext, type ReactNode, useContext } from 'react'
import type {
  RsBillingCycle,
  RsServiceSubscriptionTier,
} from '@/modules/__generated__/graphql/switchboard-generated'

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
  /** The billing cycle selected by the user */
  selectedBillingCycle: RsBillingCycle
}

const PricingCalculatorContext = createContext<PricingCalculatorContextValue | null>(null)

function usePricingCalculatorContext() {
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

function PricingCalculatorProvider({ children, value }: Readonly<PricingCalculatorProviderProps>) {
  return (
    <PricingCalculatorContext.Provider value={value}>{children}</PricingCalculatorContext.Provider>
  )
}

export { usePricingCalculatorContext, PricingCalculatorProvider }
