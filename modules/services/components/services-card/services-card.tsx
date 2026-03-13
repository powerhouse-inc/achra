import { Info } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { RsTemplateStatus } from '@/modules/__generated__/graphql/switchboard-generated'
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

const DEFAULT_COVER = '/services/covers/cover-01.jpg'

export default function ServicesCard({ service }: ServicesCardProps) {
  //  If the status is DRAFT or DEPRECATED, we don't show the service at all
  const isHidden =
    service.status === RsTemplateStatus.Draft || service.status === RsTemplateStatus.Deprecated

  if (isHidden) return null

  const isActive = service.status === RsTemplateStatus.Active

  const isComingSoon = service.status === RsTemplateStatus.ComingSoon

  const coverImage = service.thumbnailUrl ?? DEFAULT_COVER

  const cardLink = isActive
    ? (`/services/${service.id}/purchase` as Route)
    : (`/services/${service.id}` as Route)

  return (
    <Card className="bg-accent relative p-2 transition-shadow duration-300 hover:shadow-lg sm:p-3 md:p-4">
      <Link
        href={cardLink}
        className="absolute inset-0 z-10 rounded-xl"
        aria-label={`Purchase ${service.title}`}
      />
      <CardContent className="grid grid-cols-1 gap-4 px-0 sm:grid-cols-[120px_1fr] lg:grid-cols-[120px_1fr_328px] xl:grid-cols-[120px_1fr_520px] 2xl:grid-cols-[120px_1fr_632px]">
        <div className="flex flex-col gap-2 sm:gap-4">
          <div className="relative h-32 w-full sm:h-30">
            <Image
              src={coverImage}
              alt={service.title}
              fill
              // services images can be stored anywhere, so we can't predict the URL to optimize them
              unoptimized
              className="absolute rounded-lg"
              style={{ objectFit: 'cover' }}
            />
            {isComingSoon && (
              <>
                <ComingSoonTagDesktop className="absolute top-2 -left-2 hidden sm:block" />
                <ComingSoonTagMobile className="absolute top-5.75 -left-1 sm:hidden" />
              </>
            )}
          </div>
          <div className="relative z-20 flex flex-col gap-2">
            <InternalLink
              href={`/services/${service.id}/purchase` as Route}
              disabled={!isActive}
              className={cn(!isActive && 'pointer-events-none opacity-50')}
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
          </div>
          <div className="text-foreground flex flex-col text-xs/4.5 sm:text-sm/5.5">
            <p className="text-foreground">{service.summary}</p>
          </div>
        </div>
        <div className="text-foreground flex flex-col gap-2 text-xs/4.5 sm:col-span-2 sm:flex-row sm:text-sm/5.5 lg:col-span-1 lg:flex-col xl:flex-row">
          <ServiceSectionsCard
            icon={SettingsIcon}
            title="Formation & Setup"
            items={service.setupServices}
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
