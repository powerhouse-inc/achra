import { useMemo } from 'react'
import { GenericChip } from '@/modules/shared/components/chips/generic-chip/generic-chip'
import { CatalogStatus } from '../types'

interface CatalogStatusProps {
  catalogStatus: CatalogStatus
  className?: string
}

export default function ServiceCatalogStatus({
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
