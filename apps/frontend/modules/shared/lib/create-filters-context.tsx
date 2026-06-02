'use client'

import { createContext, type ReactNode, useContext } from 'react'

type FiltersHook = () => unknown

/**
 * Creates a filters context, provider and hook that can be reused across modules
 * (builders, finances, etc.) by passing each module's specific filters hook.
 *
 * @param useFilters - The module-specific filters hook (e.g. useBuildersFilters, useFinancesFilters)
 * @param providerDisplayName - Optional name for error messages (e.g. 'BuildersFiltersProvider')
 */
function createFiltersContext<H extends FiltersHook>(useFilters: H, providerDisplayName?: string) {
  type Value = ReturnType<H>

  const FiltersContext = createContext<Value | null>(null)

  interface FiltersProviderProps {
    children: ReactNode
  }

  function FiltersProvider({ children }: FiltersProviderProps) {
    const value = useFilters() as Value
    return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  }

  function useFiltersContext(): Value {
    const context = useContext(FiltersContext)
    const name = providerDisplayName ?? 'FiltersProvider'
    if (!context) {
      throw new Error(`useFiltersContext must be used within ${name}`)
    }
    return context
  }

  return { FiltersContext, FiltersProvider, useFiltersContext }
}

export { createFiltersContext }
