import { Skeleton } from '@/modules/shared/components/ui/skeleton'

interface ServiceInfoSkeletonProps {
  light?: boolean
}

function ServiceInfoSkeleton({ light }: Readonly<ServiceInfoSkeletonProps>) {
  if (light) {
    return (
      <div className="flex flex-row items-center gap-2">
        {/* avatar (compact) */}
        <Skeleton className="size-14! min-w-14! shrink-0 overflow-hidden rounded-full" />
        {/* title */}
        <Skeleton className="h-5 w-full max-w-32 lg:h-7 lg:max-w-48" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-[auto_1fr] lg:gap-6">
      <div className="flex flex-col gap-2 sm:gap-4">
        <div className="flex flex-col gap-4 sm:gap-0">
          <div className="flex flex-col gap-2 sm:hidden">
            {/* title (mobile) */}
            <Skeleton className="h-4.5 w-full" />
            <Skeleton className="h-4.5 w-[20%]" />
          </div>
          {/* thumbnail */}
          <Skeleton className="relative h-32 w-full rounded-lg sm:size-32 sm:min-w-32 md:size-64 md:min-w-64 md:rounded-2xl" />
        </div>
        {/* Book a Call button */}
        <div className="bg-accent flex h-9 w-full items-center justify-center gap-2 rounded-md">
          <Skeleton className="bg-border h-5 w-19" />
          <Skeleton className="bg-border h-4 w-4" />
        </div>
      </div>
      <div className="flex flex-col gap-4 lg:gap-6">
        {/* title (desktop) */}
        <Skeleton className="hidden h-6 w-[90%] sm:block lg:w-[70%]" />
        {/* summary */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4.5 w-[80%] sm:w-[95%]" />
          <Skeleton className="h-4.5 w-[95%] sm:w-full" />
          <Skeleton className="h-4.5 w-full sm:w-[80%] lg:w-[20%]" />
          <Skeleton className="h-4.5 w-[40%] sm:hidden" />
        </div>
      </div>
    </div>
  )
}

export { ServiceInfoSkeleton }
