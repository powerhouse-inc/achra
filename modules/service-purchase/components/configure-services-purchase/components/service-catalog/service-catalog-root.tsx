'use client'

import { cn } from '@/modules/shared/lib/utils'
export interface ServiceCatalogRootProps extends React.ComponentProps<'div'> {
  isEnabled: boolean
}

export function ServiceCatalogRoot({
  children,
  className,
  isEnabled,
  ...props
}: Readonly<ServiceCatalogRootProps>) {
  return (
    <div className={cn(className)} {...props}>
      <div className={cn(!isEnabled && 'opacity-50')}>{children}</div>
    </div>
  )
}
