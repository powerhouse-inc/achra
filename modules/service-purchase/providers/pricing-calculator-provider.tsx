'use client'

import { createContext, type ReactNode, useContext } from 'react'
import type {
  RsBillingCycle,
  ServiceTierFieldsFragment,
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
  tiers: ServiceTierFieldsFragment[]
  /** The billing cycle selected by the user */
  selectedBillingCycle: RsBillingCycle
  /**
   * Dynamically computed monthly-equivalent header price per tier id.
   * Derived from active recurring option groups + selected add-ons for the
   * current billing cycle (with discounts applied). null means price is pending.
   */
  tierHeaderPrices: Record<string, number | null>
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
