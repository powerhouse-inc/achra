import Image from 'next/image'
import { InternalLink } from '@/modules/shared/components/internal-link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/modules/shared/components/ui/card'
import { cn } from '@/shared/lib/utils'
import { truncateDescription } from '../../utils'
import type { Route } from 'next'

interface NavigationCardProps {
  image: string
  title: string
  description: string
  href: Route
  code?: string
  isCompact: boolean
  className?: string
}

export function NavigationCard({
  image,
  title,
  description,
  href,
  code,
  isCompact,
  className,
}: NavigationCardProps) {
  const truncatedDescription = truncateDescription(description)

  return (
    <Card
      data-slot="navigation-card"
      className={cn(
        'flex h-full w-full flex-col gap-2',
        isCompact ? 'p-2' : 'p-2 px-4 pb-4',
        'xl:p-2 xl:px-4 xl:pb-4',
        className,
      )}
    >
      <CardHeader
        data-slot="header-container"
        className={cn('flex flex-col gap-2 p-0', 'md:flex-row md:justify-between')}
      >
        <div
          data-slot="image-container"
          className="flex w-full items-center justify-between md:w-fit"
        >
          <div
            data-slot="image-wrapper"
            className={cn(
              'relative size-10 overflow-hidden rounded-full',
              'shadow-primary',
              'md:size-8',
              'lg:size-10',
            )}
          >
            <Image src={image} alt="Budget logo" fill unoptimized />
          </div>

          <div className="flex items-center justify-center md:hidden">
            <InternalLink href={href} className="h-8 w-10 px-2 py-0.5" />
          </div>
        </div>

        <div
          data-slot="code"
          className={cn(
            'overflow-hidden font-semibold text-ellipsis whitespace-nowrap',
            'text-muted-foreground',
            isCompact ? 'text-sm/5.5' : 'text-base/6',
            'md:self-center',
          )}
        >
          {code}
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-1 p-0">
        <CardTitle
          data-slot="title"
          className={cn(
            'text-base leading-6 font-semibold',
            isCompact
              ? 'overflow-hidden text-ellipsis whitespace-nowrap'
              : 'lg:text-base lg:leading-6',
          )}
        >
          {title}
        </CardTitle>

        {!isCompact && (
          <CardDescription
            data-slot="description"
            className={cn('text-foreground/50 text-xs/4.5 font-normal')}
          >
            {truncatedDescription}
          </CardDescription>
        )}
      </CardContent>

      <CardFooter className="hidden p-0 md:flex">
        <div
          data-slot="button-container"
          className={cn(
            'h-full items-end justify-end md:mt-auto',
            isCompact && 'sm:flex sm:justify-center',
          )}
        >
          <InternalLink href={href}>Explore</InternalLink>
        </div>
      </CardFooter>
    </Card>
  )
}
