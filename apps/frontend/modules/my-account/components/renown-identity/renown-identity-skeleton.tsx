import { Skeleton } from '@achra/ui/skeleton'

function RenownIdentitySkeleton() {
  return (
    <div
      className="flex flex-wrap items-center justify-between gap-4 rounded-lg border p-4"
      aria-busy="true"
      aria-label="Loading your Renown identity"
    >
      <div className="flex items-center gap-4">
        {/* avatar */}
        <Skeleton className="size-12 shrink-0 rounded-full" />
        <div className="flex min-w-0 flex-col gap-0.5">
          {/* display name */}
          <Skeleton className="h-6 w-32" />
          {/* wallet address */}
          <Skeleton className="h-5 w-44" />
        </div>
      </div>
      {/* renown profile link */}
      <Skeleton className="h-9 w-36" />
    </div>
  )
}

export { RenownIdentitySkeleton }
