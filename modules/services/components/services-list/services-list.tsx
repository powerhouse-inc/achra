import type { ServiceTab } from '@/modules/services/config/types'
import { SERVICES_CARDS_MOCK } from '@/modules/services/mocks/services'
import { Button } from '@/modules/shared/components/ui/button'
import ServicesCard from '../services-card/services-card'

interface ServicesListProps {
  activeTab: ServiceTab
}

export default function ServicesList({ activeTab }: Readonly<ServicesListProps>) {
  // TODO: [API Integration] Replace mock data with API call using React Query
  // The API should support filtering by tab (all/builders/networks) as a query parameter
  const services = SERVICES_CARDS_MOCK

  // TODO: [API Integration] This client-side filtering should be replaced with server-side filtering
  // The `isBuilders` field is temporary - replace with proper entity-based filtering once API is ready
  const builderServices = services.filter((service) => service.isBuilders)
  const networkServices = services.filter((service) => !service.isBuilders)

  const showBuilders = activeTab === 'all' || activeTab === 'builders'
  const showNetworks = activeTab === 'all' || activeTab === 'networks'

  return (
    <div className="flex w-full flex-col gap-6">
      {showBuilders && builderServices.length > 0 && (
        <section className="flex flex-col gap-6">
          <h2 className="text-xl leading-[120%] font-bold">Builders</h2>
          <div className="flex flex-col gap-6">
            {builderServices.map((service) => (
              <ServicesCard key={service.id} service={service} />
            ))}
          </div>
        </section>
      )}

      {showNetworks && networkServices.length > 0 && (
        <section className="flex flex-col gap-6">
          <h2 className="text-xl leading-[120%] font-bold">Networks</h2>
          <div className="flex flex-col gap-6">
            {networkServices.map((service) => (
              <ServicesCard key={service.id} service={service} />
            ))}
          </div>
        </section>
      )}

      {/* TODO: [API Integration] Implement pagination logic with cursor-based or offset pagination */}
      <Button variant="outline" size="lg" className="w-58 self-center">
        Load More
      </Button>
    </div>
  )
}
