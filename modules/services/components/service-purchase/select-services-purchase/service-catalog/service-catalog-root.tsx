'use client'

import { createContext, useContext, useMemo } from 'react'
import { cn } from '@/modules/shared/lib/utils'
import type { PricingPlan } from '../types'

interface ServiceCatalogContextValue {
  activePlan: PricingPlan
  isEnabled: boolean
  showAllPlans: boolean
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
  activePlan: PricingPlan
  isEnabled: boolean
  showAllPlans?: boolean
}

export function ServiceCatalogRoot({
  children,
  activePlan,
  isEnabled,
  showAllPlans = true,
  className,
  ...props
}: Readonly<ServiceCatalogRootProps>) {
  const contextValue = useMemo(
    () => ({ activePlan, isEnabled, showAllPlans }),
    [activePlan, isEnabled, showAllPlans],
  )

  return (
    <ServiceCatalogContext.Provider value={contextValue}>
      <div className={cn('border-border overflow-hidden border', className)} {...props}>
        <div className={cn(!isEnabled && 'opacity-50')}>{children}</div>
      </div>
    </ServiceCatalogContext.Provider>
  )
}
