import type { Service } from '@/modules/shared/types/services'
import { ServicesCard } from '../services-card/services-card'

interface ServicesListProps {
  services: Service[]
  title?: string
}

function ServicesList({ services, title }: Readonly<ServicesListProps>) {
  if (services.length === 0) {
    // Add empty state handling if needed
    return null
  }

  return (
    <section className="flex flex-col gap-6">
      {title && <h2 className="text-xl leading-[120%] font-bold">{title}</h2>}
      <div className="flex flex-col gap-6">
        {services.map((service) => (
          <ServicesCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  )
}

export { ServicesList }
