import { Skeleton } from '@/modules/shared/components/ui/skeleton'

export function BudgetStatementsTitleSkeleton() {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex w-fit items-center gap-2">
        <Skeleton className="h-6 w-40 lg:h-7" />
        <Skeleton className="size-4" />
        <Skeleton className="size-4" />
      </div>
      <Skeleton className="h-5 w-32" />
    </div>
  )
}
