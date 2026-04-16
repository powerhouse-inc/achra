import { ServiceMarketplaceCard } from '../service-marketplace-card'
import type { EnrichedService } from '../../types'

interface ServicesCategorySectionProps {
  title: string
  services: EnrichedService[]
}

function ServicesCategorySection({ title, services }: Readonly<ServicesCategorySectionProps>) {
  if (services.length === 0) return null

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-baseline gap-2">
        <h2 className="text-foreground text-xl leading-tight font-bold">{title}</h2>
        <span className="text-muted-foreground text-sm">{services.length} services</span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {services.map((enrichedService) => (
          <ServiceMarketplaceCard
            key={enrichedService.service.id}
            enrichedService={enrichedService}
          />
        ))}
      </div>
    </section>
  )
}

export { ServicesCategorySection }
