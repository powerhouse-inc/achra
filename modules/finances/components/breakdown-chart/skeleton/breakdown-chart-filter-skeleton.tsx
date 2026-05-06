import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function BreakdownChartFilterSkeleton() {
  return (
    <div className="flex flex-row flex-wrap items-start justify-between">
      <div className="flex flex-col gap-1">
        <div className="flex w-fit items-center gap-2">
          <span className="text-base leading-[120%] font-bold lg:text-lg 2xl:text-xl">
            Breakdown Chart
          </span>
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="hidden items-center gap-4 md:flex">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-9 w-[184px] rounded-md" />
        <Skeleton className="h-9 w-[184px] rounded-md" />
      </div>
    </div>
  )
}

export { BreakdownChartFilterSkeleton }
