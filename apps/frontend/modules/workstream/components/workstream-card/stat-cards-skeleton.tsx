import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function StatCardsSkeleton() {
  // Card 1: Roadmap - two columns with numbers and labels
  const card1 = (
    <div className="bg-background flex w-full flex-col items-center gap-4 rounded-lg border p-3">
      {/* Title */}
      <Skeleton className="h-6 w-24" />
      {/* Content: Two columns */}
      <div className="flex w-full gap-2">
        <div className="flex flex-1 flex-col items-center">
          <Skeleton className="h-7.5 w-10.5" />
          <Skeleton className="mt-2 h-6 w-20" />
        </div>
        <div className="flex flex-1 flex-col items-center">
          <Skeleton className="h-7.5 w-10.5" />
          <Skeleton className="mt-2 h-6 w-24" />
        </div>
      </div>
    </div>
  )

  // Card 2: Budget Estimate - two columns with numbers and currency labels (items-end aligned)
  const card2 = (
    <div className="bg-background flex w-full flex-col items-center gap-4 rounded-lg border p-3 pb-6">
      {/* Title */}
      <Skeleton className="h-6 min-h-6 w-32" />
      {/* Content: Two columns with items-end */}
      <div className="mt-auto flex w-full gap-2">
        <div className="flex flex-1 items-end justify-center gap-2">
          <Skeleton className="h-9.5 w-12" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-8" />
          </div>
        </div>
        {/* TODO: enable this once it is available in the UI again (POWTS data) */}
        {/* <div className="flex flex-1 items-end justify-center gap-2">
          <Skeleton className="h-9.5 w-10" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div> */}
      </div>
    </div>
  )

  // Card 3: Payment Terms - three items in a row
  const card3 = (
    <div className="bg-background flex w-full flex-col items-center gap-8 rounded-lg border p-3">
      {/* Title */}
      <Skeleton className="h-6 w-28" />
      {/* Content: Three items in a row */}
      <div className="flex w-full flex-wrap justify-between gap-2 gap-y-3 px-6">
        <Skeleton className="h-5.5 flex-1" />
        <Skeleton className="h-5.5 flex-1" />
        <Skeleton className="h-5.5 flex-1" />
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile */}
      <div className="md:hidden">
        <div className="h-31.5 px-5 sm:px-10 [&>*:first-child]:h-full">{card1}</div>
      </div>

      {/* Desktop */}
      <div className="hidden grid-cols-1 gap-2 md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6 md:[&>*:last-child]:col-span-2 lg:[&>*:last-child]:col-span-1">
        {card1}
        {card2}
        {card3}
      </div>
    </>
  )
}

export { StatCardsSkeleton }
