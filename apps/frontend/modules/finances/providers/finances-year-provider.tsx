'use client'

import { parseAsString, useQueryState } from 'nuqs'
import { createContext, type ReactNode } from 'react'

interface FinancesYearContextValue {
  year: string
  setSelectedYear: (value: string | null) => Promise<URLSearchParams>
}

const FinancesYearContext = createContext<FinancesYearContextValue | null>(null)

function FinancesYearProvider({ children }: { children: ReactNode }) {
  // TODO: the default year should be the current year if we're after the third month or the previous year otherwise
  const [year, setSelectedYear] = useQueryState('year', parseAsString.withDefault('2025'))

  return (
    <FinancesYearContext.Provider value={{ year, setSelectedYear }}>
      {children}
    </FinancesYearContext.Provider>
  )
}

export { FinancesYearProvider, FinancesYearContext }
