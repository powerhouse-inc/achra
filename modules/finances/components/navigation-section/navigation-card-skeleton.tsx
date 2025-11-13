'use client'

import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import { cn } from '@/shared/lib/utils'

export function NavigationCardSkeleton() {
  return (
    <div className="bg-card flex h-full flex-1 flex-col gap-2 rounded-lg border p-2 px-4 pb-4 xl:p-2 xl:px-4 xl:pb-4">
      <div className="flex flex-col gap-2 p-0 md:flex-row md:justify-between">
        <div className="flex w-full items-center justify-between md:w-fit">
          <Skeleton className="size-10 rounded-full md:size-8 lg:size-10" />
          <Skeleton className="h-8 w-10 px-2 py-0.5 md:hidden" />
        </div>
        <Skeleton className="h-4 w-16 self-center" />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-0">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="hidden p-0 md:flex">
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  )
}

export function NavigationCardSkeletons() {
  const isMobile = useMediaQuery({ to: 'md' })
  const isTabletOrDesktop1024 = useMediaQuery({ from: 'md', to: 'xl' })

  const MAX_ITEMS = isMobile ? 2 : isTabletOrDesktop1024 ? 3 : 5

  return (
    <div
      data-slot="container-cards-navigation-skeleton"
      className={cn('flex flex-row flex-nowrap gap-4 md:gap-6 xl:gap-8')}
    >
      <div className="flex flex-1 gap-4">
        {Array.from({ length: MAX_ITEMS }, (_, index) => (
          <NavigationCardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    </div>
  )
}
