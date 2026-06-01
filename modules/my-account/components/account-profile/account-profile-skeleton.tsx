import { Skeleton } from '@/shared/components/ui/skeleton'

function AccountProfileSkeleton() {
  return (
    <div className="flex flex-col gap-5" aria-busy="true" aria-label="Loading your profile">
      {/* title */}
      <Skeleton className="h-4 w-32" />

      {/* avatar + code/name + status */}
      <div className="flex gap-4">
        <Skeleton className="mt-1 size-8 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-52" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      </div>

      {/* skills */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-16" />
        <div className="flex gap-1.5">
          <Skeleton className="h-6 w-24 rounded-md" />
          <Skeleton className="h-6 w-36 rounded-md" />
        </div>
      </div>
    </div>
  )
}

export { AccountProfileSkeleton }
