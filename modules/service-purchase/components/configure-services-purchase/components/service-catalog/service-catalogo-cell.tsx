import { Check } from 'lucide-react'
import { CatalogStatus, type FeatureValue } from '@/modules/service-purchase/types'
import { cn } from '@/modules/shared/lib/utils'
import { ServiceCatalogStatus } from '../service-catalog-status'

interface FeatureCellProps {
  value: FeatureValue
  isActive: boolean
}

export function ServiceCatalogoCell({ value, isActive }: Readonly<FeatureCellProps>) {
  if (typeof value === 'boolean') {
    return (
      <div className="flex items-center justify-center">
        {value ? (
          <Check className={cn('size-4', 'text-status-success')} />
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </div>
    )
  }

  if (typeof value === 'string' && Object.values(CatalogStatus).includes(value as CatalogStatus)) {
    return (
      <div className="flex justify-center">
        <ServiceCatalogStatus catalogStatus={value as CatalogStatus} />
      </div>
    )
  }

  if (typeof value === 'string') {
    return (
      <span
        className={cn(
          'text-center text-sm',
          isActive ? 'text-foreground font-medium' : 'text-muted-foreground',
        )}
      >
        {value}
      </span>
    )
  }

  return null
}
