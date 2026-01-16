'use client'

import { cn } from '@/modules/shared/lib/utils'

export type ServiceCatalogBodyProps = React.ComponentProps<'div'>

export function ServiceCatalogBody({ children, className, ...props }: ServiceCatalogBodyProps) {
  return (
    <div className={cn('py-2', className)} {...props}>
      {children}
    </div>
  )
}
