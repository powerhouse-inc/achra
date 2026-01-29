import { Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { SERVICES_CARDS_MOCK } from '@/modules/services/mocks/services'
import { ServicesEntitiesChip } from '@/modules/shared/components/chips/services-entities-chip'
import { Button } from '@/modules/shared/components/ui/button'
import { Card, CardContent } from '@/modules/shared/components/ui/card'
import { cn } from '@/modules/shared/lib/utils'

interface ServiceInfoProps {
  light?: boolean
}

export default function ServiceInfo({ light }: ServiceInfoProps) {
  const service = SERVICES_CARDS_MOCK[0]
  return (
    <Card className="border-none bg-transparent p-0 shadow-none">
      <CardContent className={cn('flex gap-6 px-0', light && 'items-center gap-2')}>
        <div className={cn('flex flex-col gap-4', light && 'gap-0')}>
          <div
            className={cn(
              'relative size-64 min-w-64 transition-[width,height,border-radius] duration-300 ease-out',
              light &&
                'border-background shadow-primary size-14 min-w-14 overflow-hidden rounded-full border-2',
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
          <Button variant="outline" className={cn('w-full', light && 'hidden')} asChild>
            <Link href="https://v0-operational-hub-landing-page.vercel.app/opshub">
              Book a Call
              <Phone className="size-4" />
            </Link>
          </Button>
        </div>
        <div className={cn('flex flex-col gap-4 lg:gap-6', light && 'gap-0')}>
          <div className={cn('flex flex-col gap-2', light && 'gap-0')}>
            <span className={cn('text-foreground text-xl/6 font-bold', light && 'text-2xl/7')}>
              {service.title}
            </span>
            <div className={cn('flex flex-wrap gap-2', light && 'hidden')}>
              {service.entities.map((entity) => (
                <ServicesEntitiesChip key={entity} entity={entity} />
              ))}
            </div>
          </div>
          <div
            className={cn(
              'text-foreground text-base/6 font-semibold lg:text-xl/6 lg:font-bold',
              light && 'hidden',
            )}
          >
            {service.description.map((description) => (
              <p key={description}>{description}</p>
            ))}
          </div>
          <div className={cn('text-foreground text-sm/5.5 lg:text-base/6', light && 'hidden')}>
            {service.extendedDescription}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
