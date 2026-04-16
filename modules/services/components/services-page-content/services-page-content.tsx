'use client'
import { useMemo } from 'react'
import ff from '@/modules/shared/lib/feature-flags'
import { isBuilderService, isNetworkService } from '@/modules/shared/types/services'
import { filterBySearch } from '../../lib/utils'
import { EmptyStateService } from '../empty-state-service/empty-state-service'
import { ServicesCategorySection } from '../services-category-section'
import { ServicesFeaturedSection } from '../services-featured-section'
import { useServicesFiltersContext } from '../services-filters/services-filters-context'
import { ServicesMarketplaceHeader } from '../services-marketplace-header'
import { ServicesRecommendationCta } from '../services-recommendation-cta'
import type { EnrichedService } from '../../types'

interface ServicesPageContentProps {
  enrichedServices: EnrichedService[]
}

function ServicesPageContent({ enrichedServices }: Readonly<ServicesPageContentProps>) {
  const { search: contextSearch, tab: contextTab } = useServicesFiltersContext()
  const filtersEnabled = ff.SERVICES_LISTING_FILTERS_ENABLED
  const search = filtersEnabled ? contextSearch : ''
  const tab = filtersEnabled ? contextTab : 'all'

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

  const shouldShowBuilders = (tab === 'all' || tab === 'builders') && builderServices.length > 0
  const shouldShowNetworks = (tab === 'all' || tab === 'networks') && networkServices.length > 0

  const isTabEmpty =
    (tab === 'builders' && builderServices.length === 0) ||
    (tab === 'networks' && networkServices.length === 0) ||
    (tab === 'all' && builderServices.length === 0 && networkServices.length === 0)

  return (
    <div className="flex flex-col gap-10">
      <ServicesMarketplaceHeader />
      {isTabEmpty ? (
        <EmptyStateService
          title="No services found"
          description="There are no services available for this combination of filters"
        />
      ) : (
        <>
          {tab === 'all' && featuredServices.length > 0 && (
            <ServicesFeaturedSection services={featuredServices} />
          )}
          {shouldShowBuilders && (
            <ServicesCategorySection title="Builders" services={builderServices} />
          )}
          {shouldShowNetworks && (
            <ServicesCategorySection title="Networks" services={networkServices} />
          )}
        </>
      )}
      {/* <ServicesRecommendationCta /> */}
    </div>
  )
}

export { ServicesPageContent }
