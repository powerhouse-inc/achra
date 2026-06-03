import { Card, CardContent } from '@/modules/shared/components/ui/card'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'

const proposalSlides = ['slide-1', 'slide-2', 'slide-3', 'slide-4', 'slide-5', 'slide-6'] as const

function ProposalCardSkeleton() {
  return (
    <Card className="rounded-lg p-0 shadow-sm">
      <CardContent className="flex gap-4 p-2 sm:p-3">
        <div className="w-full max-w-[calc(100%-86px)] space-y-2">
          {/* Title */}
          <Skeleton className="h-5.5 w-3/4 xl:h-6" />
          {/* Description lines */}
          <div className="space-y-1">
            <Skeleton className="h-4.5 w-full" />
            <Skeleton className="h-4.5 w-5/6" />
          </div>
          {/* Tags */}
          <div className="mt-3 flex gap-2 sm:mt-4">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-18" />
            <Skeleton className="h-6 w-12" />
          </div>
        </div>
        {/* Apply button */}
        <Skeleton className="h-9 w-17 min-w-20 rounded-md" />
      </CardContent>
    </Card>
  )
}

function ProposalCardsGridSkeleton() {
  return (
    <>
      {/* Mobile */}
      <div className="md:hidden">
        <div className="h-38 px-5 pb-2 sm:h-35.5 sm:px-10 [&>*:first-child]:h-full">
          <ProposalCardSkeleton />
        </div>
        <div className="mx-auto mt-2 flex w-fit gap-4">
          {proposalSlides.map((dot) => (
            <Skeleton key={dot} className="bg-border size-3 rounded-full" />
          ))}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden flex-col gap-4 md:flex">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-4 xl:grid-cols-3 xl:gap-6">
          {proposalSlides.map((card) => (
            <ProposalCardSkeleton key={card} />
          ))}
        </div>
      </div>
    </>
  )
}

export { ProposalCardsGridSkeleton }
