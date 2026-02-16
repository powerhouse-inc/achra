import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function HeaderTitleOperatorProfileSkeleton() {
  return (
    <div className="flex items-center gap-2">
      {/* icon */}
      <Skeleton className="h-14 w-14 shrink-0" />
      <div className="flex min-w-0 flex-col gap-2">
        {/* title */}
        <Skeleton className="h-5.5 w-full max-w-56" />
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
