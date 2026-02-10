'use client'
import { useMemo } from 'react'
import { isBuilderService, isNetworkService, type Service } from '@/modules/shared/types/services'
import { filterBySearch } from '../../utils/utils'
import EmptyStateService from '../empty-state-service/empty-state-service'
import { useServicesFiltersContext } from '../services-filters/services-filters-context'
import ServicesList from '../services-list'

interface ServicesPageContentProps {
  services: Service[]
}

export function ServicesPageContent({ services }: Readonly<ServicesPageContentProps>) {
  const { search, tab } = useServicesFiltersContext()

  const filteredServices = useMemo(() => filterBySearch(services, search), [services, search])

  const builderServices = useMemo(
    () => filteredServices.filter(isBuilderService),
    [filteredServices],
  )
  const networkServices = useMemo(
    () => filteredServices.filter(isNetworkService),
    [filteredServices],
  )

  const shouldShowBuilders = (tab === 'all' || tab === 'builders') && builderServices.length > 0
  const shouldShowNetworks = (tab === 'all' || tab === 'networks') && networkServices.length > 0

  // Only show empty state if the selected tab has not services
  const isTabEmpty =
    (tab === 'builders' && builderServices.length === 0) ||
    (tab === 'networks' && networkServices.length === 0) ||
    (tab === 'all' && builderServices.length === 0 && networkServices.length === 0)

  if (isTabEmpty) {
    return (
      <EmptyStateService
        title="No services found"
        description="There are no services available for this combination of filters"
      />
    )
  }

  return (
    <div className="flex flex-col gap-8">
      {shouldShowBuilders && <ServicesList title="Builders" services={builderServices} />}
      {shouldShowNetworks && <ServicesList title="Networks" services={networkServices} />}
    </div>
  )
}
