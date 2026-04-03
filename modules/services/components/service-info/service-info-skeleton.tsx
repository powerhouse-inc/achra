import { Card, CardContent } from '@/modules/shared/components/ui/card'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'

interface ServiceInfoSkeletonProps {
  /** Matches ServiceInfo `isCompacted` (dense header in purchase wizard). */
  isCompacted?: boolean
  /** Operator badge row (avatar + code + name). */
  showOperatorBadge?: boolean
  /** Product info step: "Select an operator" action placement. */
  showSelectOperatorAction?: boolean
}

/** Stands in for `OperatorBadge` (avatar + operator code + name). */
function OperatorBadgeSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="size-6 shrink-0 rounded-full" />
      <div className="flex items-center gap-1">
        <Skeleton className="h-5 w-8" />
        <Skeleton className="h-5 w-30 max-w-36 min-w-0" />
      </div>
    </div>
  )
}

function ServiceInfoSkeleton({
  isCompacted = false,
  showOperatorBadge = false,
  showSelectOperatorAction = false,
}: Readonly<ServiceInfoSkeletonProps>) {
  if (isCompacted) {
    return (
      <Card className="border-none bg-transparent p-0 shadow-none">
        <CardContent className="flex flex-row items-center gap-2 px-0">
          {/* Thumbnail (compact, matches ServiceInfo cover) */}
          <Skeleton className="size-14! min-w-14! shrink-0 rounded-full" />
          <div className="flex min-w-0 flex-1 flex-col gap-3 lg:gap-2">
            {/* Title (compact h1) */}
            <Skeleton className="h-5 w-full max-w-32 lg:h-7 lg:max-w-48" />
            {showOperatorBadge && <OperatorBadgeSkeleton />}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-none bg-transparent p-0 shadow-none">
      <CardContent className="flex flex-col gap-4 px-0 sm:flex-row lg:gap-6">
        {/* Mobile-only title (text-lg/5) */}
        <Skeleton className="h-5 w-full max-w-xs sm:hidden" />

        <div className="flex flex-col gap-2 sm:gap-4">
          {/* Cover image */}
          <Skeleton className="h-32 w-full rounded-lg sm:size-32 sm:min-w-32 md:size-64 md:min-w-64 md:rounded-2xl" />
          {/* Book a Call */}
          <div className="flex flex-col gap-2">
            <div className="bg-accent flex h-9 w-full items-center justify-center gap-2 rounded-md">
              <Skeleton className="bg-border h-5 w-24" />
              <Skeleton className="bg-border size-4 shrink-0" />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-4 lg:gap-4">
          {/* Desktop title (text-xl/6) */}
          <Skeleton className="hidden h-6 w-full max-w-lg sm:block" />
          {showOperatorBadge && <OperatorBadgeSkeleton />}
          {/* Summary (text-sm/5.5 lg:text-base/6) */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4.5 w-full max-w-xl" />
            <Skeleton className="h-4.5 w-full max-w-2xl" />
            <Skeleton className="h-4.5 w-full max-w-md sm:max-w-lg" />
            <Skeleton className="h-4.5 w-2/5 max-w-32 sm:hidden" />
          </div>
        </div>

        {showSelectOperatorAction && (
          <div className="flex items-end justify-end sm:hidden lg:flex">
            <Skeleton className="h-9 w-full max-w-44" />
          </div>
        )}
      </CardContent>
      {showSelectOperatorAction && (
        <div className="hidden items-end justify-end sm:flex lg:hidden">
          <Skeleton className="h-9 w-full max-w-48" />
        </div>
      )}
    </Card>
  )
}

export { ServiceInfoSkeleton }
