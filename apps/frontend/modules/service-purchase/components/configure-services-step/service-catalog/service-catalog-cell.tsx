import { Check } from 'lucide-react'
import { CatalogStatus, type FeatureValue } from '@/modules/service-purchase/types'
import { cn } from '@/modules/shared/lib/utils'
import { ServiceCatalogStatus } from '../service-catalog-status'
import { useServiceCatalogEnabled } from './service-catalog-context'

interface FeatureCellProps {
  value: FeatureValue
  isActive: boolean
}

function ServiceCatalogCell({ value, isActive }: Readonly<FeatureCellProps>) {
  const isGroupEnabled = useServiceCatalogEnabled()

  if (typeof value === 'boolean') {
    return (
      <div className="flex items-center justify-center">
        {value ? (
          <Check
            className={cn(
              'size-4',
              isGroupEnabled ? 'text-status-success brightness-75' : 'text-foreground/40',
            )}
          />
        ) : (
          <span className="text-foreground/60">—</span>
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
          isActive ? 'text-foreground font-medium' : 'text-foreground/70',
        )}
      >
        {value}
      </span>
    )
  }

  return null
}

export { ServiceCatalogCell }
