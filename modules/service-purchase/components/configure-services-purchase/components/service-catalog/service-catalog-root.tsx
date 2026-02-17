'use client'

import { createContext, useContext, useMemo } from 'react'
import { cn } from '@/modules/shared/lib/utils'

interface ServiceCatalogContextValue {
  activePlan?: string
  isEnabled: boolean
}

const ServiceCatalogContext = createContext<ServiceCatalogContextValue | undefined>(undefined)

export function useServiceCatalogContext() {
  const context = useContext(ServiceCatalogContext)
  if (!context) {
    throw new Error('ServiceCatalog compound components must be used within ServiceCatalogRoot')
  }
  return context
}

export interface ServiceCatalogRootProps extends React.ComponentProps<'div'> {
  activePlan?: string
  isEnabled: boolean
}

export function ServiceCatalogRoot({
  children,
  activePlan,
  isEnabled,
  className,
  ...props
}: Readonly<ServiceCatalogRootProps>) {
  const contextValue = useMemo(() => ({ activePlan, isEnabled }), [activePlan, isEnabled])

  return (
    <ServiceCatalogContext.Provider value={contextValue}>
      <div className={cn(className)} {...props}>
        <div className={cn(!isEnabled && 'opacity-50')}>{children}</div>
      </div>
    </ServiceCatalogContext.Provider>
  )
}
