'use client'

import { createContext, type ReactNode, useContext } from 'react'
import useBuildersFilters from './use-builders-filters'

type BuildersFiltersContextValue = ReturnType<typeof useBuildersFilters>

const BuildersFiltersContext = createContext<BuildersFiltersContextValue | null>(null)

interface BuildersFiltersProviderProps {
  children: ReactNode
}

export function BuildersFiltersProvider({ children }: BuildersFiltersProviderProps) {
  const value = useBuildersFilters()

  return <BuildersFiltersContext.Provider value={value}>{children}</BuildersFiltersContext.Provider>
}

export function useBuildersFiltersContext() {
  const context = useContext(BuildersFiltersContext)

  if (!context) {
    throw new Error('useBuildersFiltersContext must be used within BuildersFiltersProvider')
  }

  return context
}
