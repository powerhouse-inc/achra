'use client'

import { createContext, type ReactNode, useContext } from 'react'
import useServicesFilters from './use-services-filters'

type ServicesFiltersContextValue = ReturnType<typeof useServicesFilters>

const ServicesFiltersContext = createContext<ServicesFiltersContextValue | null>(null)

interface ServicesFiltersProviderProps {
  children: ReactNode
}

export function ServicesFiltersProvider({ children }: ServicesFiltersProviderProps) {
  const value = useServicesFilters()

  return <ServicesFiltersContext.Provider value={value}>{children}</ServicesFiltersContext.Provider>
}

export function useServicesFiltersContext() {
  const context = useContext(ServicesFiltersContext)

  if (!context) {
    throw new Error('useServicesFiltersContext must be used within ServicesFiltersProvider')
  }

  return context
}
