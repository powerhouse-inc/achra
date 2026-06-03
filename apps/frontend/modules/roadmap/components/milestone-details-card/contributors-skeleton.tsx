import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function ContributorsSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-xl border px-4 pt-2 pb-4">
      <Skeleton className="h-4 w-32" />
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2 self-stretch">
          <Skeleton className="size-6 rounded-full" />
          <Skeleton className="h-5 w-24" />
        </div>
        <div className="flex items-center gap-2 self-stretch">
          <Skeleton className="size-6 rounded-full" />
          <Skeleton className="h-5 w-24" />
        </div>
        <div className="flex items-center gap-2 self-stretch">
          <Skeleton className="size-6 rounded-full" />
          <Skeleton className="h-5 w-24" />
        </div>
      </div>
    </div>
  )
}

export { ContributorsSkeleton }
