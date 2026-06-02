import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function BudgetProjectCardSkeleton() {
  return (
    <div className="bg-background flex flex-col gap-4 rounded-xl border p-3 shadow-sm">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-end gap-1">
              <Skeleton className="h-6 w-12" />
              <Skeleton className="h-6 w-48" />
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <Skeleton className="h-5 w-6" />
              <Skeleton className="size-6 rounded-full" />
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
          <Skeleton className="h-9 w-24" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>

        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
      </div>

      <div className="flex flex-col gap-4">
        <Skeleton className="h-[60px] w-full rounded-lg" />
        <Skeleton className="h-[60px] w-full rounded-lg" />
      </div>
    </div>
  )
}

export { BudgetProjectCardSkeleton }
