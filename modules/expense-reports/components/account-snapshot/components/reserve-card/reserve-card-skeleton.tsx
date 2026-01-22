import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { cn } from '@/modules/shared/lib/utils'

function ReserveCardSkeleton() {
  return (
    <div className="bg-popover flex flex-col gap-2 rounded-xl px-6 pt-2 pb-4 shadow-lg md:flex-row md:gap-0 md:px-0 md:py-2">
      {/* name area */}
      <div className="flex w-full items-center justify-between md:w-42 md:min-w-42 md:px-2 lg:w-70 lg:min-w-70 lg:px-4">
        <div className="flex items-center gap-2">
          <Skeleton className="size-6 min-w-6 rounded-full md:size-8 md:min-w-8" />
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-4.5 w-20 min-w-0 md:h-5.5 md:w-28 md:min-w-0 lg:w-32" />
            <Skeleton className="h-4.5 w-16 min-w-0 md:h-4.5 md:w-20 md:min-w-0 lg:w-24" />
          </div>
        </div>
        <Skeleton className="size-4 shrink-0 md:hidden" />
      </div>

      {/* initial balance */}
      <div
        className={cn(
          'md:items-normal flex items-center justify-between md:mt-0 md:flex-col md:items-start md:justify-center md:gap-0.5 md:px-2 lg:gap-0.5 lg:px-4',
          'mt-2 md:w-25 lg:w-40 lg:min-w-40 xl:w-50 xl:min-w-50',
        )}
      >
        <Skeleton className="h-4.5 w-16 min-w-0 md:w-18 lg:w-20" />
        <div className="flex items-baseline gap-1.5">
          <Skeleton className="h-5.5 w-12 min-w-0 md:h-5.5 md:w-14 lg:h-6 lg:w-18" />
          <Skeleton className="h-4.5 w-5 min-w-0 md:h-4.5 md:w-6 lg:h-5.5 lg:w-7" />
        </div>
      </div>

      {/* inflow */}
      <div
        className={cn(
          'md:items-normal flex items-center justify-between md:flex-col md:items-start md:justify-center md:gap-0.5 md:px-2 lg:gap-0.5 lg:px-4',
          'bg-background -mx-4 rounded-lg border px-4 py-1.75 md:mx-2 md:w-full md:p-2 md:pt-1 lg:mx-4',
        )}
      >
        <Skeleton className="h-4.5 w-10 min-w-0 md:w-12" />
        <div className="flex items-baseline gap-1.5">
          <Skeleton className="h-5.5 w-12 min-w-0 md:h-5.5 md:w-14 lg:h-6 lg:w-18" />
          <Skeleton className="h-4.5 w-5 min-w-0 md:h-4.5 md:w-6 lg:h-5.5 lg:w-7" />
        </div>
      </div>

      {/* outflow */}
      <div
        className={cn(
          'md:items-normal flex items-center justify-between md:flex-col md:items-start md:justify-center md:gap-0.5 md:px-2 lg:gap-0.5 lg:px-4',
          'bg-background -mx-4 rounded-lg border px-4 py-1.75 md:mx-2 md:w-full md:p-2 md:pt-1 lg:mx-4',
        )}
      >
        <Skeleton className="h-4.5 w-12 min-w-0 md:w-14" />
        <div className="flex items-baseline gap-1.5">
          <Skeleton className="h-5.5 w-12 min-w-0 md:h-5.5 md:w-14 lg:h-6 lg:w-18" />
          <Skeleton className="h-4.5 w-5 min-w-0 md:h-4.5 md:w-6 lg:h-5.5 lg:w-7" />
        </div>
      </div>

      {/* new balance */}
      <div
        className={cn(
          'md:items-normal flex items-center justify-between md:flex-col md:items-end md:justify-center md:gap-0.5 md:px-2 lg:gap-0.5 lg:px-4',
          'md:w-full md:items-end',
        )}
      >
        <Skeleton className="h-4.5 w-16 min-w-0 md:w-18 lg:w-20" />
        <div className="flex items-baseline gap-1.5">
          <Skeleton className="h-5.5 w-12 min-w-0 md:h-5.5 md:w-14 lg:h-6 lg:w-18" />
          <Skeleton className="h-4.5 w-5 min-w-0 md:h-4.5 md:w-6 lg:h-5.5 lg:w-7" />
        </div>
      </div>

      {/* chevron icon area (desktop only) */}
      <div className="hidden w-12 items-center justify-center px-2 py-4.5 md:flex md:px-4 lg:w-16 lg:min-w-16 xl:w-26 xl:min-w-26">
        <Skeleton className="size-4 shrink-0" />
      </div>
    </div>
  )
}

export { ReserveCardSkeleton }
