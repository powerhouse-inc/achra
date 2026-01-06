import { Suspense } from 'react'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { BuilderHeaderDescriptionSkeleton } from './builder-profile-header-description-skeleton'

function BuilderProfileHeaderSkeleton() {
  return (
    <div className="bg-background border-input mt-13 w-full border-b">
      <div className="container flex flex-col gap-4 pt-4 pb-2">
        <div className="flex justify-between gap-4">
          <div className="flex gap-4">
            {/* Avatar skeleton */}
            <Skeleton className="size-14 rounded-full" />

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                {/* Builder name section */}
                <div className="flex items-center gap-1">
                  {/* Builder initials skeleton */}
                  <Skeleton className="h-4 w-8" />
                  {/* Builder name skeleton */}
                  <Skeleton className="h-5 w-24" />
                </div>

                {/* Builder status section */}
                <div className="ml-3 flex items-center gap-1">
                  {/* Status chip skeleton */}
                  <Skeleton className="h-6 w-20" />
                  {/* Date button skeleton */}
                  <Skeleton className="h-6 w-32" />
                </div>
              </div>

              {/* Service entity chips skeleton */}
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          </div>

          {/* Links button skeleton */}
          <div>
            <Skeleton className="h-9 w-20" />
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
