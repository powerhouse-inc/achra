import { Skeleton } from '@achra/ui/skeleton'

function AccountProfileSkeleton() {
  return (
    <div className="flex flex-col gap-5" aria-busy="true" aria-label="Loading your profile">
      {/* builder profile: avatar + code/name + wallet address */}
      <div className="flex gap-4">
        <Skeleton className="mt-1 size-8 shrink-0 rounded-full" />
        <div className="flex flex-col gap-1">
          {/* code + name */}
          <Skeleton className="h-5 w-52" />
          {/* wallet address */}
          <Skeleton className="h-4.5 w-32" />
        </div>
      </div>

      {/* skills: label + chips */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-5 w-16" />
        <div className="flex flex-wrap gap-1.5">
          <Skeleton className="h-7 w-32 rounded-md" />
          <Skeleton className="h-7 w-24 rounded-md" />
          <Skeleton className="h-7 w-28 rounded-md" />
        </div>
      </div>
    </div>
  )
}

export { AccountProfileSkeleton }
