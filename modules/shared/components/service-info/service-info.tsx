import { Download, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { SERVICES_CARDS_MOCK } from '@/modules/services/mocks/services'
import { InternalLink } from '@/modules/shared/components/internal-link'
import { Button } from '@/modules/shared/components/ui/button'
import { Card, CardContent } from '@/modules/shared/components/ui/card'
import { cn } from '@/modules/shared/lib/utils'
import type { Route } from 'next'

interface ServiceInfoProps {
  light?: boolean
  showPurchaseButton?: boolean
  showActionButtons?: boolean
}

export default function ServiceInfo({
  light,
  showPurchaseButton,
  showActionButtons,
}: Readonly<ServiceInfoProps>) {
  const service = SERVICES_CARDS_MOCK[0]
  return (
    <Card className="border-none bg-transparent p-0 shadow-none">
      <CardContent
        className={cn(
          'flex flex-col gap-4 px-0 sm:flex-row lg:gap-6',
          light && 'flex-row items-center gap-2',
        )}
      >
        <span className={cn('text-foreground text-lg/5 font-bold sm:hidden', light && 'hidden')}>
          {service.title}
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
              src={service.cover}
              alt={service.title}
              fill
              className="absolute rounded-lg"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="outline" className={cn('w-full', light && 'hidden')} asChild>
              <Link href="https://v0-operational-hub-landing-page.vercel.app/opshub">
                Book a Call
                <Phone className="size-4" />
              </Link>
            </Button>
            {showPurchaseButton && (
              <InternalLink
                href={`/services/${service.id}/purchase` as Route}
                disabled={service.unavailable}
                className={cn(service.unavailable && 'pointer-events-none opacity-50')}
                size="lg"
                variant="default"
              >
                Purchase
              </InternalLink>
            )}
          </div>
        </div>
        <div className={cn('flex flex-col gap-4 lg:gap-6', light && 'gap-0')}>
          <span
            className={cn(
              'text-foreground hidden text-xl/6 font-bold sm:block',
              light && 'block text-base/5 lg:text-2xl/7',
            )}
          >
            {service.title}
          </span>
          <div className={cn('text-foreground text-sm/5.5 lg:text-base/6', light && 'hidden')}>
            {service.extendedDescription}
          </div>
        </div>
        {showActionButtons && (
          <div className="flex items-end justify-end gap-6 sm:hidden lg:flex">
            <Button variant="outline" asChild>
              <Link href="#">
                Self Assessment Checklist
                <Download className="size-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="#">FQA</Link>
            </Button>
          </div>
        )}
      </CardContent>
      {showActionButtons && (
        <div className="hidden items-end justify-end gap-6 sm:flex lg:hidden">
          <Button variant="outline" asChild>
            <Link href="#">
              Self Assessment Checklist
              <Download className="size-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="#">FQA</Link>
          </Button>
        </div>
      )}
    </Card>
  )
}
