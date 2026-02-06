'use client'

import { parseAsStringLiteral, useQueryState } from 'nuqs'
import { Button } from '@/modules/shared/components/ui/button'
import { isBuilderService, isNetworkService, type Service } from '@/modules/shared/types/services'
import EmptyStateService from '../empty-state-service/empty-state-service'
import ServicesFilters from '../services-filters'
import ServicesList from '../services-list'

interface ServicesPageContentProps {
  services: Service[]
}

export function ServicesPageContent({ services }: Readonly<ServicesPageContentProps>) {
  const [activeTab, setActiveTab] = useQueryState(
    'tab',
    parseAsStringLiteral(['all', 'builders', 'networks'] as const).withDefault('all'),
  )

  const builderServices = services.filter(isBuilderService)
  const networkServices = services.filter(isNetworkService)

  const showBuilders = activeTab === 'all' || activeTab === 'builders'
  const showNetworks = activeTab === 'all' || activeTab === 'networks'

  const hasVisibleServices =
    (showBuilders && builderServices.length > 0) || (showNetworks && networkServices.length > 0)

  return (
    <div className="flex w-full flex-col gap-6">
      <ServicesFilters activeTab={activeTab} onTabChange={(tab) => void setActiveTab(tab)} />

      {hasVisibleServices ? (
        <>
          {showBuilders && <ServicesList title="Builders" services={builderServices} />}
          {showNetworks && <ServicesList title="Networks" services={networkServices} />}

          <Button variant="outline" size="lg" className="w-58 self-center">
            Load More
          </Button>
        </>
      ) : (
        <EmptyStateService />
      )}
    </div>
  )
}
