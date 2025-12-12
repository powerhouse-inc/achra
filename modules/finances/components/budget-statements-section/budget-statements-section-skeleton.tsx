import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { SCROLL_MT_CLASSES } from '@/modules/shared/config/constants'
import { cn } from '@/modules/shared/lib/utils'

// TODO: Improve this skeleton
export function BudgetStatementsSectionSkeleton() {
  return (
    <section className={cn('flex w-full flex-col gap-4', SCROLL_MT_CLASSES)}>
      {/* Title skeleton */}
      <div className="flex flex-row flex-wrap items-start justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-7 w-48 md:h-8 xl:h-9" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-9 w-20" />
      </div>

      {/* Table skeleton */}
      <div className="flex w-full flex-col gap-2">
        {/* Table header skeleton */}
        <div className="flex h-fit w-full justify-between rounded-t-xl px-2 py-4 xl:p-4 xl:pl-3 2xl:p-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-5 w-20" />
          ))}
        </div>

        {/* Table rows skeleton */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex h-fit w-full items-center justify-between rounded border px-2 py-3 xl:p-3 xl:pr-4 2xl:py-3 2xl:pr-4 2xl:pl-3.5"
          >
            <Skeleton className="h-10 w-[27%]" />
            <Skeleton className="h-4 w-[15%]" />
            <Skeleton className="h-4 w-[15%]" />
            <Skeleton className="h-6 w-[14%]" />
            <Skeleton className="h-4 w-[19%]" />
            <Skeleton className="h-9 w-[10%]" />
          </div>
        ))}
      </div>
    </section>
  )
}
