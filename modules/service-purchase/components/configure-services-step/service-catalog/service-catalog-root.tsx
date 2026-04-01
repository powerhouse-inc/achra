'use client'

import { cn } from '@/modules/shared/lib/utils'
import { ServiceCatalogEnabledContext } from './service-catalog-context'

export interface ServiceCatalogRootProps extends React.ComponentProps<'div'> {
  isEnabled: boolean
}

function ServiceCatalogRoot({
  children,
  className,
  isEnabled,
  ...props
}: Readonly<ServiceCatalogRootProps>) {
  return (
    <ServiceCatalogEnabledContext value={isEnabled}>
      <div className={cn(className)} {...props}>
        <div>{children}</div>
      </div>
    </ServiceCatalogEnabledContext>
  )
}

export { ServiceCatalogRoot }
