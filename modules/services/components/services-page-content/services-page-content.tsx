'use client'

import { useState } from 'react'
import type { ServiceTab } from '@/modules/services/config/types'
import { SERVICES_CARDS_MOCK } from '@/modules/services/mocks/services'
import { Button } from '@/modules/shared/components/ui/button'
import ServicesFilters from '../services-filters'
import ServicesList from '../services-list'

// TODO: [API Integration] Replace mock data with API call using React Query
const services = SERVICES_CARDS_MOCK
export function ServicesPageContent() {
  // TODO: [API Integration] Replace useState with nuqs for URL state persistence
  // This will allow users to share filtered views via URL (e.g., /services?tab=builders)
  const [activeTab, setActiveTab] = useState<ServiceTab>('all')

  // TODO: [API Integration] This client-side filtering should be replaced with server-side filtering
  // The `isBuilders` field is temporary - replace with proper entity-based filtering once API is ready
  const builderServices = services.filter((service) => service.isBuilders)
  const networkServices = services.filter((service) => !service.isBuilders)

  const showBuilders = activeTab === 'all' || activeTab === 'builders'
  const showNetworks = activeTab === 'all' || activeTab === 'networks'

  return (
    <div className="flex w-full flex-col gap-6">
      <ServicesFilters activeTab={activeTab} onTabChange={setActiveTab} />

      {showBuilders && <ServicesList title="Builders" services={builderServices} />}
      {showNetworks && <ServicesList title="Networks" services={networkServices} />}

      {/* TODO: [API Integration] Implement pagination logic with cursor-based or offset pagination */}
      <Button variant="outline" size="lg" className="w-58 self-center">
        Load More
      </Button>
    </div>
  )
}
