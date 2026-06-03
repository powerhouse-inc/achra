'use client'
import { useMemo } from 'react'
import ff from '@/modules/shared/lib/feature-flags'
import { isBuilderService, isNetworkService } from '@/modules/shared/types/services'
import { filterBySearch } from '../../lib/utils'
import { EmptyStateService } from '../empty-state-service/empty-state-service'
import { ServicesCategorySection } from '../services-category-section'
import { ServicesFeaturedSection } from '../services-featured-section'
import { useServicesFiltersContext } from '../services-filters/services-filters-context'
import type { EnrichedService } from '../../types'

interface ServicesPageContentProps {
  enrichedServices: EnrichedService[]
}

function ServicesPageContent({ enrichedServices }: Readonly<ServicesPageContentProps>) {
  const { search: contextSearch } = useServicesFiltersContext()
  const search = ff.SERVICES_LISTING_FILTERS_ENABLED ? contextSearch : ''

  const filteredServices = useMemo(
    () => enrichedServices.filter((es) => filterBySearch([es.service], search).length > 0),
    [enrichedServices, search],
  )

  const builderServices = useMemo(
    () => filteredServices.filter((es) => isBuilderService(es.service)),
    [filteredServices],
  )
  const networkServices = useMemo(
    () => filteredServices.filter((es) => isNetworkService(es.service)),
    [filteredServices],
  )

  const featuredServices = useMemo(() => {
    const featured: EnrichedService[] = []
    const firstBuilder = builderServices.at(0)
    const firstNetwork = networkServices.at(0)
    if (firstBuilder !== undefined) featured.push(firstBuilder)
    if (firstNetwork !== undefined) featured.push(firstNetwork)
    return featured
  }, [builderServices, networkServices])

  const isEmpty = builderServices.length === 0 && networkServices.length === 0

  return (
    <div className="flex flex-col gap-10">
      {isEmpty ? (
        <EmptyStateService
          title="No services found"
          description="There are no services available for this combination of filters"
        />
      ) : (
        <>
          {featuredServices.length > 0 && <ServicesFeaturedSection services={featuredServices} />}
          {builderServices.length > 0 && (
            <ServicesCategorySection title="Builders" services={builderServices} />
          )}
          {networkServices.length > 0 && (
            <ServicesCategorySection title="Networks" services={networkServices} />
          )}
        </>
      )}
    </div>
  )
}

export { ServicesPageContent }
