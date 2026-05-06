import { ServiceFeaturedCard } from '../service-featured-card'
import { ServiceMarketplaceCard } from '../service-marketplace-card'
import type { EnrichedService } from '../../types'

interface ServicesFeaturedSectionProps {
  services: EnrichedService[]
}

function ServicesFeaturedSection({ services }: Readonly<ServicesFeaturedSectionProps>) {
  if (services.length === 0) return null

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-foreground text-xl leading-tight font-bold">Featured</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
        {services.map((enrichedService, index) =>
          index === 0 ? (
            <ServiceFeaturedCard
              key={enrichedService.service.id}
              enrichedService={enrichedService}
              primary
            />
          ) : (
            <ServiceMarketplaceCard
              key={enrichedService.service.id}
              enrichedService={enrichedService}
            />
          ),
        )}
      </div>
    </section>
  )
}

export { ServicesFeaturedSection }
