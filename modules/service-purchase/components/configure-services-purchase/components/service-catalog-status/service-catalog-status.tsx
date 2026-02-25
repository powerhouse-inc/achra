import { useMemo } from 'react'
import { CatalogStatus } from '@/modules/service-purchase/types'
import { GenericChip } from '@/modules/shared/components/chips/generic-chip/generic-chip'

interface CatalogStatusProps {
  catalogStatus: CatalogStatus
  className?: string
}

function ServiceCatalogStatus({
  catalogStatus,
  className,
}: Readonly<CatalogStatusProps>) {
  const { label, color } = useMemo(() => {
    switch (catalogStatus) {
      case CatalogStatus.Optional:
        return {
          label: 'Optional',
          color: 'blue',
        }
      case CatalogStatus.Included:
        return {
          label: 'Included',
          color: 'green',
        }
      case CatalogStatus.Excluded:
        return {
          label: 'Excluded',
          color: 'red',
        }
    }
  }, [catalogStatus])

  return (
    <GenericChip variant="filled" color={color} className={className}>
      {label}
    </GenericChip>
  )
}

export { ServiceCatalogStatus }
