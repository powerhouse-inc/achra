import { Card } from '@/modules/shared/components/ui/card'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { cn } from '@/shared/lib/utils'

export function NavigationCardSkeleton() {
  return (
    <Card className="flex h-full w-full flex-col justify-between gap-4 border p-4 shadow-sm md:gap-2">
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div className="flex w-full items-center justify-between md:w-fit">
          <Skeleton className="size-10 shrink-0 rounded-full md:size-8 lg:size-10" />
          <Skeleton className="h-8 w-10 rounded md:hidden" />
        </div>
        <Skeleton className="mt-1 h-4 w-16 self-start md:self-center" />
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-full max-w-50" />
      </div>
      <div className="hidden pt-2 md:flex">
        <Skeleton className="h-9 w-24 rounded-md" />
      </div>
    </Card>
  )
}

export function NavigationCardSkeletons() {
  return (
    <div
      data-slot="container-cards-navigation-skeleton"
      className={cn('flex flex-row flex-nowrap gap-4 md:gap-6 xl:gap-8')}
    >
      <div className="flex w-full flex-1 flex-wrap gap-4">
        {Array.from({ length: 5 }, (_, index) => (
          <div
            key={`skeleton-${index}`}
            className={cn(
              'flex-1',
              index === 2 && 'hidden md:flex',
              index >= 3 && 'hidden xl:flex',
            )}
          >
            <NavigationCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  )
}
