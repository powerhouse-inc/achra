import { SERVICES_CARDS_MOCK } from '@/modules/services/mocks/services'
import ServicesFilters from './components/services-filters/services-filters'
import ServicesList from './components/services-list/services-list'

export function ServicesSection() {
  return (
    <section className="flex w-full flex-col gap-8">
      <ServicesFilters />
      <ServicesList services={SERVICES_CARDS_MOCK} />
    </section>
  )
}
