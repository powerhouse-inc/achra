import { ArrowRight, Info } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { ServicesEntitiesChip } from '@/modules/shared/components/chips/services-entities-chip'
import RecursiveIcon from '@/modules/shared/components/svgs/recursive.svg'
import SettingsIcon from '@/modules/shared/components/svgs/settings.svg'
import { Button } from '@/modules/shared/components/ui/button'
import { Card, CardContent } from '@/modules/shared/components/ui/card'
import type { Service } from '@/modules/shared/types/services'
import { ServicesCardListSection } from './components/services-card-list-section/services-card-list-section'
import type { Route } from 'next'

interface ServicesCardProps {
  service: Service
}

export default function ServicesCard({ service }: ServicesCardProps) {
  return (
    <Card className="bg-accent p-2 sm:p-3">
      <CardContent className="grid grid-cols-1 gap-4 px-0 sm:grid-cols-[120px_1fr] lg:grid-cols-[120px_1fr_35%] xl:grid-cols-[120px_1fr_50%]">
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
          <div className="text-foreground flex flex-col text-xs/4.5 sm:text-sm/5.5">
            {service.description.map((description) => (
              <p key={description} className="text-foreground">
                {description}
              </p>
            ))}
            {service.descriptionItems && service.descriptionItems.length > 0 && (
              <ul className="text-foreground">
                {service.descriptionItems.map((descriptionItem) => (
                  <li key={descriptionItem} className="mb-0 ml-2 flex items-center gap-2">
                    <div className="bg-foreground size-1 min-w-1 rounded-full" />
                    <span>{descriptionItem}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="text-foreground flex flex-col gap-2 text-xs/4.5 sm:col-span-2 sm:flex-row sm:text-sm/5.5 lg:col-span-1 lg:flex-col xl:flex-row">
          <ServicesCardListSection
            icon={SettingsIcon}
            title="Formation & Setup"
            items={service.formationAndSetup}
          />
          <ServicesCardListSection
            icon={RecursiveIcon}
            title="Recurring Services"
            items={service.recurringServices}
          />
        </div>
      </CardContent>
    </Card>
  )
}
