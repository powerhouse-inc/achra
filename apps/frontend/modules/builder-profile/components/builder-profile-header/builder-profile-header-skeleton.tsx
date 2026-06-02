import { Suspense } from 'react'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { cn } from '@/modules/shared/lib/utils'
import { BuilderHeaderDescriptionSkeleton } from './builder-profile-header-description-skeleton'

interface BuilderProfileHeaderSkeletonProps {
  isOperatorProfile?: boolean
}

function BuilderProfileHeaderSkeleton({ isOperatorProfile }: BuilderProfileHeaderSkeletonProps) {
  return (
    <div className={cn('border-input mt-16 w-full border-b', isOperatorProfile && 'mt-3')}>
      <div className="container flex flex-col gap-4 pt-4 pb-2">
        <div className="flex justify-between gap-4">
          <div className="flex gap-4 lg:items-center">
            {/* Avatar skeleton */}
            <Skeleton className="size-12 rounded-full sm:size-10" />

            <div className="flex flex-col gap-1 lg:flex-row lg:items-center">
              {/* Builder name section */}
              <div className="flex items-center gap-1">
                {/* Builder initials skeleton */}
                <Skeleton className="h-4 w-8" />
                {/* Builder name skeleton */}
                <Skeleton className="h-5 w-24" />
              </div>

              {/* Builder status section */}
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center lg:ml-3">
                {/* Status chip skeleton */}
                <Skeleton className="h-6 w-20" />
                {/* Date button skeleton */}
                <Skeleton className="h-6 w-32" />
              </div>
            </div>
          </div>

          {/* Links button skeleton */}
          <div className="self-end sm:self-start">
            <Skeleton className="h-9 w-20 sm:w-9 md:w-20" />
          </div>
        </div>

        {/* Description skeleton */}
        <Suspense>
          <BuilderHeaderDescriptionSkeleton />
        </Suspense>
      </div>
    </div>
  )
}

export { BuilderProfileHeaderSkeleton }
