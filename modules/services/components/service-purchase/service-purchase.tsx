import Image from 'next/image'
import { SERVICES_CARDS_MOCK } from '@/modules/services/mocks/services'
import { ServicesEntitiesChip } from '@/modules/shared/components/chips/services-entities-chip'
import { Card, CardContent } from '@/modules/shared/components/ui/card'

export default function ServicePurchase() {
  // TODO: Replace with API call, it is out of scope for now, I will ask for a task to be created for this.
  const service = SERVICES_CARDS_MOCK[0]

  return (
    <Card className="border-none bg-transparent p-0 shadow-none">
      <CardContent className="flex gap-6 px-0">
        <div className="relative size-64 min-w-64">
          <Image
            src={service.cover}
            alt={service.title}
            fill
            className="absolute rounded-lg"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-foreground text-xl/6 font-bold">{service.title}</span>
          <div className="flex flex-wrap gap-2">
            {service.entities.map((entity) => (
              <ServicesEntitiesChip key={entity} entity={entity} />
            ))}
          </div>
          <div className="text-foreground mt-4 text-xl/6 font-bold">
            {service.description.map((description) => (
              <p key={description}>{description}</p>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
