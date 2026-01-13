import Image from 'next/image'
import { OPERATORS_MOCK, SERVICES_CARDS_MOCK } from '@/modules/services/mocks/services'
import { ServicesEntitiesChip } from '@/modules/shared/components/chips/services-entities-chip'
import { InternalLink } from '@/modules/shared/components/internal-link'
import ComingSoonTagDesktop from '@/modules/shared/components/svgs/coming-soon-tag-desktop.svg'
import ComingSoonTagMobile from '@/modules/shared/components/svgs/coming-soon-tag-mobile.svg'
import RecursiveIcon from '@/modules/shared/components/svgs/recursive.svg'
import SettingsIcon from '@/modules/shared/components/svgs/settings.svg'
import { Card, CardContent } from '@/modules/shared/components/ui/card'
import { cn } from '@/modules/shared/lib/utils'
import { ServiceSectionsCard } from '../services-card-list-section/service-sections-card'
import OperatorCard from './components/operator-card'
import type { Route } from 'next'

export default function ServiceProfile() {
  // TODO: Replace with API call, it is out of scope for now, I will ask for a task to be created for this.
  const service = SERVICES_CARDS_MOCK[0]

  return (
    <Card className="border-none bg-transparent p-0 shadow-none">
      <CardContent className="flex flex-col gap-4 px-0">
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[128px_1fr] md:grid-cols-[256px_1fr]">
          <div className="flex flex-col gap-2 sm:gap-4">
            <div className="relative h-32 w-full md:h-64">
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
            <InternalLink
              href={`/services/${service.id}/purchase` as Route}
              disabled={service.unavailable}
              className={cn(service.unavailable && 'pointer-events-none opacity-50')}
              size="lg"
              variant="default"
            >
              Purchase
            </InternalLink>
          </div>
          <div className="flex flex-col gap-2 sm:gap-4">
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
        </div>
        <div className="flex flex-col gap-2 sm:flex-row md:gap-4 lg:gap-6">
          <ServiceSectionsCard
            icon={SettingsIcon}
            title="Formation & Setup"
            items={service.formationAndSetup}
            showDetailsButton
            className="p-3!"
          />
          <ServiceSectionsCard
            icon={RecursiveIcon}
            title="Recurring Services"
            items={service.recurringServices}
            showDetailsButton
            className="p-3!"
          />
        </div>
      </CardContent>
      <CardContent className="flex flex-col gap-4 p-0">
        <span className="text-foreground text-sm/5.5 font-semibold sm:text-base/5.5 sm:font-bold">
          Operators
        </span>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-2 md:gap-4 lg:gap-6 xl:grid-cols-3">
          {OPERATORS_MOCK.map((operator) => (
            <OperatorCard
              key={operator.id}
              id={operator.id}
              title={operator.title}
              description={operator.description}
              roles={operator.roles}
              activeSince={operator.activeSince}
              minEngagement={operator.minEngagement}
              teamSize={operator.teamSize}
              setupTime={operator.setupTime}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
