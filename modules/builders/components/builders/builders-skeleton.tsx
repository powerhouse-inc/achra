import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { BuildersListSkeleton } from './components/builders-list/builders-list-skeleton'
import { BuildersTableSkeleton } from './components/builders-table/builders-table-skeleton'

export function BuildersSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-7.5 w-24.25" />
        <div className="flex w-full flex-col gap-1">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-[80%]" />
        </div>
        <div className="flex w-full justify-end">
          <Skeleton className="h-10 w-25" />
        </div>
      </div>

      <BuildersTableSkeleton className="hidden lg:flex" />
      <BuildersListSkeleton className="flex lg:hidden" />
    </div>
  )
}
