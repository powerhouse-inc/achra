import { SERVICES_CARDS_MOCK } from '@/modules/services/mocks/services'
import { Button } from '@/modules/shared/components/ui/button'
import ServicesFilters from './components/services-filters/services-filters'
import ServicesList from './components/services-list/services-list'

export function ServicesSection() {
  return (
    <section className="flex w-full flex-col gap-8 md:gap-6">
      <ServicesFilters />
      <ServicesList services={SERVICES_CARDS_MOCK} />
      <Button variant="outline" size="lg" className="-mt-2 w-58 self-center md:mt-0">
        Load More
      </Button>
    </section>
  )
}
