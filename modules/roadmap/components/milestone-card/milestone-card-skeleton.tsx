import { Card, CardContent, CardFooter, CardHeader } from '@/shared/components/ui/card'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { cn } from '@/shared/lib/utils'

interface MilestoneCardSkeletonProps {
  className?: string
}

function MilestoneCardSkeleton({ className }: MilestoneCardSkeletonProps) {
  return (
    <Card
      className={cn(
        'h-full w-full gap-0 overflow-hidden rounded-xl border-0 px-0 pt-0 pb-2',
        className,
      )}
    >
      <CardHeader className="bg-accent flex h-10 items-center justify-between gap-0 rounded-t-xl rounded-b-none p-2" />

      <CardContent className="mx-2 mt-2 flex flex-1 flex-col gap-1 p-0">
        {/* MilestoneTitleSection skeleton */}
        <div className="bg-popover flex flex-1 flex-col gap-2 rounded-xl border px-2 py-1">
          {/* Title */}
          <Skeleton className="h-6 w-full" />
          {/* Description: */}
          <Skeleton className="h-14 w-full" />
        </div>

        {/* MilestoneStatusSection skeleton */}
        <div className="bg-popover flex flex-col gap-2 rounded-xl border p-2">
          <div className="flex items-center justify-between">
            {/* Status label */}
            <Skeleton className="h-4.5 w-12" />
            {/* Status chip */}
            <Skeleton className="h-6 w-16" />
          </div>
          {/* Progress bar */}
          <Skeleton className="h-4 w-full" />
        </div>
      </CardContent>

      <CardFooter className="mx-2 mt-1 p-0">
        {/* Button skeleton */}
        <Skeleton className="h-9 w-full rounded-md" />
      </CardFooter>
    </Card>
  )
}

export { MilestoneCardSkeleton }
