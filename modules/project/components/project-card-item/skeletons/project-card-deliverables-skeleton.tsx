import { CardContent } from '@/modules/shared/components/ui/card'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function ProjectCardDeliverablesSkeleton() {
  return (
    <CardContent className="bg-accent flex flex-col gap-2 border-t px-2 pt-2 pb-3 sm:p-4">
      <Skeleton className="mb-1 h-4 w-24 rounded" />

      {/* Mobile: Vertical list layout */}
      <div className="flex flex-col gap-2 lg:hidden">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="bg-popover flex cursor-default flex-col gap-2 rounded-xl p-2 shadow-xs sm:gap-0 sm:p-3"
          >
            <div className="flex justify-between sm:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <Skeleton className="size-8 shrink-0 rounded-full" />
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-3 w-24 rounded sm:hidden" />
                </div>
              </div>
              <Skeleton className="ml-2 h-8 w-8 shrink-0 rounded-lg" />
            </div>
            <div className="sm:border-border hidden sm:flex sm:flex-col sm:gap-2 sm:border-t sm:pt-2">
              <div className="flex items-center justify-between sm:gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-full rounded" />
                </div>
              </div>
            </div>
            <Skeleton className="h-1 w-full rounded sm:hidden" />
            <div className="hidden sm:flex sm:gap-2 sm:pt-2 sm:text-sm">
              <div className="min-w-0 flex-1">
                <Skeleton className="mb-1 h-3 w-8 rounded" />
                <Skeleton className="h-4 w-16 rounded" />
              </div>
              <div className="min-w-0 flex-1">
                <Skeleton className="mb-1 h-3 w-16 rounded" />
                <Skeleton className="h-4 w-20 rounded" />
              </div>
              <div className="min-w-0 flex-1 text-right">
                <Skeleton className="mb-1 ml-auto h-3 w-16 rounded" />
                <Skeleton className="ml-auto h-4 w-24 rounded" />
              </div>
            </div>
            <div className="border-border grid grid-cols-3 gap-2 border-t pt-2 sm:hidden">
              <div>
                <Skeleton className="mb-1 h-3 w-6 rounded" />
                <Skeleton className="h-4 w-12 rounded" />
              </div>
              <div>
                <Skeleton className="mb-1 h-3 w-8 rounded" />
                <Skeleton className="h-4 w-14 rounded" />
              </div>
              <div className="text-right">
                <Skeleton className="mb-1 ml-auto h-3 w-8 rounded" />
                <Skeleton className="ml-auto h-4 w-16 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: Table-like layout */}
      <div className="hidden lg:flex lg:flex-col lg:gap-2">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="bg-popover flex items-center justify-between gap-3 rounded-xl p-3 shadow-xs transition-shadow"
          >
            <div className="flex w-[22.3%] items-center gap-2">
              <Skeleton className="size-8 shrink-0 rounded-full" />
              <Skeleton className="h-4 flex-1 rounded" />
            </div>
            <div className="flex w-[14.9%] justify-start">
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <div className="w-[17.8%]">
              <Skeleton className="h-4 w-full rounded" />
            </div>
            <div className="w-[8.2%] text-right">
              <Skeleton className="h-4 w-full rounded" />
            </div>
            <div className="w-[13.4%] text-right">
              <Skeleton className="h-4 w-full rounded" />
            </div>
            <div className="w-[13.4%] text-right">
              <Skeleton className="h-4 w-full rounded" />
            </div>
            <div className="flex w-[10%] justify-end">
              <Skeleton className="h-8 w-8 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  )
}

export { ProjectCardDeliverablesSkeleton }
