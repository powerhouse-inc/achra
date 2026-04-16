import { Card, CardContent } from '@/modules/shared/components/ui/card'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function FeaturedCardSkeleton() {
  return (
    <Card className="bg-card relative h-full overflow-hidden border border-transparent p-0">
      <CardContent className="flex h-full gap-4 p-4 sm:gap-5 sm:p-5">
        {/* main content */}
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          {/* cover image + title row */}
          <div className="flex items-start gap-4">
            {/* cover image */}
            <Skeleton className="size-12 shrink-0 rounded-lg sm:size-14" />
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              {/* title */}
              <Skeleton className="h-5 w-full max-w-48 sm:h-6" />
              {/* "by Powerhouse" */}
              <Skeleton className="h-4 w-full max-w-20" />
            </div>
          </div>
          {/* description */}
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-full sm:h-5" />
            <Skeleton className="h-4 w-2/3 sm:h-5" />
          </div>
        </div>
        {/* sidebar (sm+): free tier label, tiers count, CTA */}
        <div className="hidden shrink-0 flex-col items-end justify-between gap-2 text-right sm:flex">
          <div className="flex flex-col items-end gap-1">
            {/* free tier label */}
            <Skeleton className="h-5 w-28" />
            {/* tiers count */}
            <Skeleton className="h-4 w-24" />
          </div>
          {/* CTA button */}
          <Skeleton className="h-9 w-28" />
        </div>
      </CardContent>
    </Card>
  )
}

export { FeaturedCardSkeleton }
