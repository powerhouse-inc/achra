import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/modules/shared/components/ui/card'
import { SERVICE_INFO_DEFAULT_COVER_PATH } from '../../lib/constants'
import { ServiceBadge } from '../service-badge'
import type { EnrichedService } from '../../types'
import type { Route } from 'next'

interface ServiceMarketplaceCardProps {
  enrichedService: EnrichedService
}

function ServiceMarketplaceCard({ enrichedService }: Readonly<ServiceMarketplaceCardProps>) {
  const { service, badge } = enrichedService
  const coverImage = service.thumbnailUrl ?? SERVICE_INFO_DEFAULT_COVER_PATH

  return (
    <Card className="bg-card relative overflow-hidden p-0 transition-shadow duration-300 hover:shadow-lg">
      <Link
        href={`/services/${service.id}` as Route}
        className="absolute inset-0 z-10 rounded-xl"
        aria-label={`${service.title} Profile`}
      />
      <CardContent className="flex h-full flex-col gap-3 p-4">
        <div className="flex items-start gap-3">
          <div className="relative size-12 shrink-0 overflow-hidden rounded-lg">
            <Image
              src={coverImage}
              alt={service.title}
              fill
              unoptimized
              className="rounded-lg object-cover"
            />
          </div>
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="text-foreground truncate text-sm leading-tight font-semibold sm:text-base">
              {service.title}
            </span>
            <span className="text-muted-foreground text-xs">by Powerhouse</span>
          </div>
        </div>
        {service.summary && (
          <p className="text-foreground line-clamp-3 text-xs leading-relaxed sm:text-sm">
            {service.summary}
          </p>
        )}
        {badge && (
          <div className="mt-auto">
            <ServiceBadge badge={badge} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export { ServiceMarketplaceCard }
