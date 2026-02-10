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

  const showBuilders = tab === 'all' || tab === 'builders'
  const showNetworks = tab === 'all' || tab === 'networks'

  const hasVisibleServices =
    (showBuilders && builderServices.length > 0) || (showNetworks && networkServices.length > 0)

  return (
    <>
      {hasVisibleServices ? (
        <>
          {showBuilders && <ServicesList title="Builders" services={builderServices} />}
          {showNetworks && <ServicesList title="Networks" services={networkServices} />}
        </>
      ) : (
        <EmptyStateService />
      )}
    </>
  )
}
