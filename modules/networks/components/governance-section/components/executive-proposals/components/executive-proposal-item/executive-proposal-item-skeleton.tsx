import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function ExecutiveProposalItemSkeleton() {
  return (
    <div className="bg-background outline-border grid grid-cols-1 gap-2 rounded-xl outline md:grid-cols-[1fr_auto] md:gap-0">
      {/* Left section: Proposal text and date info */}
      <div className="flex h-fit flex-col gap-2 p-2 lg:gap-3 lg:p-4">
        {/* Proposal blurb text */}
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-full lg:h-5 xl:h-6" />
          <Skeleton className="h-4 w-full lg:h-5 xl:h-6" />
          <Skeleton className="h-4 w-1/3 lg:h-5 xl:h-6" />
        </div>
        <div className="flex flex-col justify-between gap-2 xl:flex-row xl:items-center">
          {/* Date text */}
          <div className="order-2 flex flex-col gap-0.5 sm:flex-row sm:gap-2 xl:order-1">
            <Skeleton className="h-3.5 w-32 sm:h-3.5 xl:h-5" />
            <Skeleton className="hidden h-3.5 w-2 sm:inline xl:h-5" />
            <Skeleton className="h-3.5 w-32 sm:h-3.5 xl:h-5" />
          </div>
          {/* Badge placeholder (optional, may not always show) */}
          <Skeleton className="order-1 h-5 w-32 xl:order-2" />
        </div>
      </div>

      {/* Right section: Supporters, SKY Support, and View button */}
      <div className="flex h-fit items-center justify-between px-2 md:h-full md:gap-4 lg:pl-4 xl:gap-8 xl:pr-4 xl:pl-2 2xl:px-12">
        {/* Supporters column */}
        <div className="flex flex-col items-center gap-0.25 p-2 sm:min-w-30 md:min-w-fit lg:min-w-30">
          <Skeleton className="h-4 w-16 xl:h-5" />
          <Skeleton className="h-4 w-12 xl:h-5" />
        </div>

        {/* SKY Support column */}
        <div className="flex flex-col items-center gap-0.5 p-2 sm:min-w-30 md:min-w-fit md:items-end lg:min-w-30">
          <Skeleton className="h-4 w-20 xl:h-5" />
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-16 xl:h-5" />
            {/* Icon placeholder */}
            <Skeleton className="size-5 rounded" />
          </div>
        </div>

        {/* View button */}
        <div className="flex w-fit justify-end sm:min-w-30 md:min-w-fit">
          <Skeleton className="h-9 w-9 lg:h-10 lg:w-20" />
        </div>
      </div>
    </div>
  )
}

export { ExecutiveProposalItemSkeleton }
