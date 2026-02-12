'use client'

import { createContext, type ReactNode, useContext } from 'react'
import type { Plan } from '../types'

/**
 * Grid layout constants for the pricing table
 * Desktop: 5 columns (label + 4 plans)
 * Mobile: 2 columns (label + current plan)
 */
export const PRICING_GRID = {
  /** Desktop grid: label column (4fr) + 4 plan columns (1fr each) */
  desktop: 'lg:grid-cols-[minmax(0,4fr)_repeat(4,minmax(0,1fr))]',
  /** Mobile grid: 2 equal columns */
  mobile: 'grid-cols-[minmax(0,1fr)_minmax(0,1fr)]',
  /** Combined classes for responsive grid */
  responsive:
    'grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-cols-[minmax(0,4fr)_repeat(4,minmax(0,1fr))]',
} as const

interface PricingCalculatorContextValue {
  /** The currently selected/active plan */
  activePlan: Plan
  /** The plan currently visible in mobile carousel */
  currentMobilePlan: Plan
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
