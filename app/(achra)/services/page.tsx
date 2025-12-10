import ServicesFilters from '@/modules/services/components/services-filters'
import ServicesList from '@/modules/services/components/services-list'
import { PageContent } from '@/modules/shared/components/page-containers'

export default function ServicesPage() {
  return (
    <PageContent className="gap-6">
      <ServicesFilters />
      <ServicesList />
    </PageContent>
  )
}
