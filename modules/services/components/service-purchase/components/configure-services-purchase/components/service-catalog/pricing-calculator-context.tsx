'use client'

import { createContext, type ReactNode, useContext } from 'react'
import type { Plan } from '../types'

interface PricingCalculatorContextValue {
  /** The currently selected/active plan */
  activePlan: Plan
  /** Index of the plan shown in mobile carousel (0-3) */
  mobilePlanIndex: number
  /** Navigate to previous plan in carousel */
  onPrevPlan: () => void
  /** Navigate to next plan in carousel */
  onNextPlan: () => void
  /** Whether the component is in read-only mode */
  readOnly: boolean
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
