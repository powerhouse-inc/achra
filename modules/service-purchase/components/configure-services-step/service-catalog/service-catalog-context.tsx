'use client'

import { createContext, use } from 'react'

const ServiceCatalogEnabledContext = createContext(true)

export function useServiceCatalogEnabled() {
  return use(ServiceCatalogEnabledContext)
}

export { ServiceCatalogEnabledContext }
