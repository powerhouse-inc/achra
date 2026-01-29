import { Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { SERVICES_CARDS_MOCK } from '@/modules/services/mocks/services'
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
          <Button variant="outline" className={cn('w-full', light && 'hidden')} asChild>
            <Link href="https://v0-operational-hub-landing-page.vercel.app/opshub">
              Book a Call
              <Phone className="size-4" />
            </Link>
          </Button>
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
