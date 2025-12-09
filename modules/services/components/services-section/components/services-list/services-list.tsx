import { SERVICES_CARDS_MOCK } from '@/modules/services/mocks/services'
import { Button } from '@/modules/shared/components/ui/button'
import ServicesCard from '../services-card/services-card'

export default function ServicesList() {
  // TODO: Replace with API call, it is out of scope for now, I will ask for a task to be created for this.
  const services = SERVICES_CARDS_MOCK

  return (
    <div className="flex w-full flex-col gap-6">
      {services.map((service) => (
        <ServicesCard key={service.id} service={service} />
      ))}
      <Button variant="outline" size="lg" className="-mt-2 w-58 self-center md:mt-0">
        Load More
      </Button>
    </div>
  )
}
