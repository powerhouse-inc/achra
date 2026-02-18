import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function HeaderTitleOperatorProfileSkeleton() {
  return (
    <div className="flex items-center gap-2">
      {/* logo */}
      <Skeleton className="h-14 w-14 shrink-0 rounded-full" />
      <div className="flex min-w-0 flex-col gap-2">
        {/* title */}
        <div className="flex items-center gap-1">
          <Skeleton className="h-6 w-6 shrink-0" />
          <Skeleton className="h-6 w-full max-w-56" />
        </div>
        {/* chips */}
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
    </div>
  )
}

export { HeaderTitleOperatorProfileSkeleton }
