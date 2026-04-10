'use client'

import { createContext, use } from 'react'

const ServiceCatalogEnabledContext = createContext(true)

function useServiceCatalogEnabled() {
  return use(ServiceCatalogEnabledContext)
}

export { ServiceCatalogEnabledContext, useServiceCatalogEnabled }
