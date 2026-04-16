import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/modules/shared/components/ui/button'
import { Card, CardContent } from '@/modules/shared/components/ui/card'
import { cn } from '@/modules/shared/lib/utils'
import { SERVICE_INFO_DEFAULT_COVER_PATH } from '../../lib/constants'
import { ServiceBadge } from '../service-badge'
import type { EnrichedService } from '../../types'
import type { Route } from 'next'

interface ServiceFeaturedCardProps {
  enrichedService: EnrichedService
  primary?: boolean
}

function ServiceFeaturedCard({
  enrichedService,
  primary = false,
}: Readonly<ServiceFeaturedCardProps>) {
  const { service, badge, offeringSummary } = enrichedService
  const isComingSoon = badge === 'coming-soon'
  const showFreeTier = offeringSummary?.hasFreeTier
  const coverImage = service.thumbnailUrl ?? SERVICE_INFO_DEFAULT_COVER_PATH

  return (
    <Card
      className={cn(
        'bg-card relative overflow-hidden transition-shadow duration-300 hover:shadow-lg',
        primary ? 'col-span-1 p-0 sm:col-span-2' : 'col-span-1 p-0',
      )}
    >
      <Link
        href={`/services/${service.id}` as Route}
        className="absolute inset-0 z-10 rounded-xl"
        aria-label={`${service.title} Profile`}
      />
      <CardContent className={cn('flex h-full gap-4 p-4', primary && 'sm:gap-5 sm:p-5')}>
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="flex items-start gap-4">
            <div
              className={cn(
                'relative shrink-0 overflow-hidden rounded-lg',
                primary ? 'size-12 sm:size-14' : 'size-10 sm:size-12',
              )}
            >
              <Image
                src={coverImage}
                alt={service.title}
                fill
                unoptimized
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              {!primary && badge && <ServiceBadge badge={badge} />}
              <span
                className={cn(
                  'text-foreground leading-tight font-bold',
                  primary ? 'text-sm sm:text-lg' : 'text-sm sm:text-base',
                )}
              >
                {service.title}
              </span>
              <span className="text-muted-foreground text-xs">by Powerhouse</span>
            </div>
          </div>

          {service.summary && (
            <p
              className={cn(
                'text-foreground leading-relaxed',
                primary ? 'text-xs sm:text-sm' : 'line-clamp-3 text-xs',
              )}
            >
              {service.summary}
            </p>
          )}
          {!primary && showFreeTier && (
            <span className="text-status-success text-xs font-medium">Free tier included</span>
          )}
        </div>

        {primary && (
          <div className="hidden shrink-0 flex-col items-end justify-between gap-2 text-right sm:flex">
            <div className="flex flex-col items-end gap-1">
              {showFreeTier && (
                <span className="text-status-success text-sm font-medium">Free tier included</span>
              )}
              {!isComingSoon && offeringSummary && offeringSummary.tierCount > 0 && (
                <span className="text-muted-foreground text-xs">
                  {offeringSummary.tierCount} tiers available
                </span>
              )}
            </div>
            <div className="relative z-20">
              <Button asChild size="default" className="w-fit">
                <Link href={`/services/${service.id}` as Route}>Get Started</Link>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export { ServiceFeaturedCard }
