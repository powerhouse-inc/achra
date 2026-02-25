import { Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { type Maybe, RsTemplateStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import { InternalLink } from '@/modules/shared/components/internal-link'
import { Button } from '@/modules/shared/components/ui/button'
import { Card, CardContent } from '@/modules/shared/components/ui/card'
import { cn } from '@/modules/shared/lib/utils'
import { OPERATIONAL_HUB_URL } from '@/shared/config/constants'
import { ActionButtons } from './action-buttons'
import type { Route } from 'next'

interface ServiceInfoProps {
  light?: boolean
  showPurchaseButton?: boolean
  showActionButtons?: boolean
  title?: string
  summary?: Maybe<string>
  thumbnailUrl?: string
  status?: RsTemplateStatus
  id: string
  infoLink?: string
}

// Default cover image when thumbnailUrl is not available
const DEFAULT_COVER = '/services/covers/cover-01.jpg'

function ServiceInfo({
  light,
  showPurchaseButton,
  showActionButtons,
  title,
  summary,
  thumbnailUrl,
  status,
  id,
  infoLink,
}: Readonly<ServiceInfoProps>) {
  const isUnavailable = status === RsTemplateStatus.ComingSoon
  const coverImage = thumbnailUrl ?? DEFAULT_COVER

  return (
    <Card className="border-none bg-transparent p-0 shadow-none">
      <CardContent
        className={cn(
          'flex flex-col gap-4 px-0 sm:flex-row lg:gap-6',
          light && 'flex-row items-center gap-2',
        )}
      >
        <span className={cn('text-foreground text-lg/5 font-bold sm:hidden', light && 'hidden')}>
          {title}
        </span>
        <div className={cn('flex flex-col gap-2 sm:gap-4', light && 'gap-0')}>
          <div
            className={cn(
              'relative h-32 w-full transition-[width,height,border-radius] duration-300 ease-out sm:size-32 sm:min-w-32 md:size-64 md:min-w-64',
              light &&
                'border-background shadow-primary size-14! min-w-14! overflow-hidden rounded-full border-2',
            )}
          >
            <Image
              src={thumbnailUrl ?? coverImage}
              alt={title ?? ''}
              fill
              // services images can be stored anywhere, so we can't predict the URL to optimize them
              unoptimized
              className="absolute rounded-lg md:rounded-2xl"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="outline" className={cn('w-full', light && 'hidden')} asChild>
              <Link href={OPERATIONAL_HUB_URL}>
                Book a Call
                <Phone className="size-4" />
              </Link>
            </Button>
            {showPurchaseButton && (
              <InternalLink
                href={`/services/${id}/purchase` as Route}
                disabled={isUnavailable}
                className={cn(isUnavailable && 'pointer-events-none opacity-50')}
                size="lg"
                variant="default"
              >
                Purchase
              </InternalLink>
            )}
          </div>
        </div>
        <div className={cn('flex w-full flex-col gap-4 lg:gap-6', light && 'gap-0')}>
          <span
            className={cn(
              'text-foreground hidden text-xl/6 font-bold sm:block',
              light && 'block text-base/5 lg:text-2xl/7',
            )}
          >
            {title}
          </span>
          <div className={cn('text-foreground text-sm/5.5 lg:text-base/6', light && 'hidden')}>
            {summary}
          </div>
        </div>
        {showActionButtons && <ActionButtons infoLink={infoLink} className="sm:hidden lg:flex" />}
      </CardContent>
      {showActionButtons && (
        <ActionButtons infoLink={infoLink} className="hidden sm:flex lg:hidden" />
      )}
    </Card>
  )
}

export { ServiceInfo }
