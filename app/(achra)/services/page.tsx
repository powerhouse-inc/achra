'use client'

import { useState } from 'react'
import ServicesFilters from '@/modules/services/components/services-filters'
import ServicesList from '@/modules/services/components/services-list'
import type { ServiceTab } from '@/modules/services/config/types'
import { PageContent } from '@/modules/shared/components/page-containers'

export default function ServicesPage() {
  // TODO: [API Integration] Replace useState with nuqs for URL state persistence
  // This will allow users to share filtered views via URL (e.g., /services?tab=builders)
  const [activeTab, setActiveTab] = useState<ServiceTab>('all')

  return (
    <PageContent className="gap-6">
      <ServicesFilters activeTab={activeTab} onTabChange={setActiveTab} />
      <ServicesList activeTab={activeTab} />
    </PageContent>
  )
}
