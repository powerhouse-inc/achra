import { Card, CardContent, CardHeader } from '@/modules/shared/components/ui/card'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { SelectedFacetsSkeleton } from './selected-facets-skeleton'
import { SummarySectionSkeleton } from './summary-section-skeleton'

function SummaryCardSkeleton() {
  return (
    <Card className="mx-auto w-full max-w-218.5 overflow-hidden border-none p-0!">
      <CardHeader className="flex flex-row items-center justify-between gap-4 px-3 pt-3 lg:px-6 lg:pt-6">
        <div className="flex items-start gap-2">
          <Skeleton className="size-12 shrink-0 rounded-2xl" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-5 w-full max-w-48 lg:h-6" />
            <Skeleton className="h-3.5 w-full max-w-28" />
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-0.5">
          <div className="flex flex-col items-end">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-3.5 w-20" />
          </div>
          <Skeleton className="h-3.5 w-24" />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 p-0! pb-3! lg:pb-6!">
        <SelectedFacetsSkeleton />

        <div className="flex flex-col gap-4 px-3 lg:px-6">
          <SummarySectionSkeleton hasTotal />
          <SummarySectionSkeleton />
        </div>
      </CardContent>
    </Card>
  )
}

export { SummaryCardSkeleton }
