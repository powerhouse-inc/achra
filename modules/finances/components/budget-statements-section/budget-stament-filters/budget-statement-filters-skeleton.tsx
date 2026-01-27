import { Skeleton } from '@/modules/shared/components/ui/skeleton'

export function BudgetStatementFiltersSkeleton() {
  return (
    <div className="row flex w-full justify-end gap-4">
      <div className="hidden w-full items-center justify-end gap-4 md:flex">
        <Skeleton className="h-9 w-24" />

        <Skeleton className="h-9 md:min-w-25.5 lg:min-w-46" />

        <Skeleton className="h-9 md:w-25.5 lg:w-46" />
      </div>

      <div className="flex w-full gap-4 lg:hidden">
        <div className="flex items-center gap-4 md:hidden">
          <Skeleton className="size-8" />
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          <Skeleton className="hidden h-9 w-32 md:flex" />

          <Skeleton className="size-8 md:hidden" />
        </div>
      </div>
    </div>
  )
}
