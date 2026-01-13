import { Info } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { ServicesEntitiesChip } from '@/modules/shared/components/chips/services-entities-chip'
import { InternalLink } from '@/modules/shared/components/internal-link'
import ComingSoonTagDesktop from '@/modules/shared/components/svgs/coming-soon-tag-desktop.svg'
import ComingSoonTagMobile from '@/modules/shared/components/svgs/coming-soon-tag-mobile.svg'
import RecursiveIcon from '@/modules/shared/components/svgs/recursive.svg'
import SettingsIcon from '@/modules/shared/components/svgs/settings.svg'
import { Button } from '@/modules/shared/components/ui/button'
import { Card, CardContent } from '@/modules/shared/components/ui/card'
import { cn } from '@/modules/shared/lib/utils'
import type { Service } from '@/modules/shared/types/services'
import { ServiceSectionsCard } from '../services-card-list-section/service-sections-card'
import type { Route } from 'next'

interface ServicesCardProps {
  service: Service
}

export default function ServicesCard({ service }: ServicesCardProps) {
  return (
    <Card className="bg-accent p-2 sm:p-3 md:p-4">
      <CardContent className="grid grid-cols-1 gap-4 px-0 sm:grid-cols-[120px_1fr] lg:grid-cols-[120px_1fr_328px] xl:grid-cols-[120px_1fr_520px] 2xl:grid-cols-[120px_1fr_632px]">
        <div className="flex flex-col gap-2 sm:gap-4">
          <div className="relative h-32 w-full sm:h-30">
            <Image
              src={service.cover}
              alt={service.title}
              fill
              className="absolute rounded-lg"
              style={{ objectFit: 'cover' }}
            />
            {service.unavailable && (
              <>
                <ComingSoonTagDesktop className="absolute top-2 -left-2 hidden sm:block" />
                <ComingSoonTagMobile className="absolute top-5.75 -left-1 sm:hidden" />
              </>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <InternalLink
              href={`/services/${service.id}/purchase` as Route}
              disabled={service.unavailable}
              className={cn(service.unavailable && 'pointer-events-none opacity-50')}
              size="lg"
              variant="default"
            >
              Purchase
            </InternalLink>
            <Button variant="outline" asChild size="lg">
              <Link href={`/services/${service.id}` as Route}>
                <span>More Info</span>
                <Info className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:gap-4">
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
          <ServiceSectionsCard
            icon={SettingsIcon}
            title="Formation & Setup"
            items={service.formationAndSetup}
          />
          <ServiceSectionsCard
            icon={RecursiveIcon}
            title="Recurring Services"
            items={service.recurringServices}
          />
        </div>
      </CardContent>
    </Card>
  )
}
