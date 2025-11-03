import type { Service } from '@/modules/shared/types/services'
import ServicesCard from '../services-card/services-card'

interface ServicesListProps {
  services: Service[]
}

export default function ServicesList({ services }: ServicesListProps) {
  return (
    <div className="flex w-full flex-col gap-6">
      {services.map((service) => (
        <ServicesCard key={service.id} service={service} />
      ))}
    </div>
  )
}
