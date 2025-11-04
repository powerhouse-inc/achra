import { ArrowRight, Info } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { ServicesEntitiesChip } from '@/modules/shared/components/chips/services-entities-chip'
import { Button } from '@/modules/shared/components/ui/button'
import { Card, CardContent } from '@/modules/shared/components/ui/card'
import type { Service } from '@/modules/shared/types/services'
import type { Route } from 'next'

interface ServicesCardProps {
  service: Service
}

export default function ServicesCard({ service }: ServicesCardProps) {
  return (
    <Card className="bg-accent p-2">
      <CardContent className="grid grid-cols-1 gap-4 px-0 sm:grid-cols-[120px_1fr]">
        <div className="flex flex-col gap-2 sm:gap-4">
          <div className="relative h-32 w-full overflow-hidden rounded-lg sm:h-30">
            <Image
              src={service.cover}
              alt={service.title}
              fill
              className="absolute"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Button size="lg" asChild>
              <Link href={`/services/${service.id}` as Route}>
                <span>Purchase</span>
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={`/services/${service.id}` as Route}>
                <span>More Info</span>
                <Info className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-foreground text-base/6 font-semibold sm:text-xl/6 sm:font-bold">
            {service.title}
          </span>
          <div className="flex flex-wrap gap-2">
            {service.entities.map((entity) => (
              <ServicesEntitiesChip key={entity} entity={entity} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
