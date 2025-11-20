import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function InitialProposalHeaderSkeleton() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex w-full flex-col items-center gap-1 sm:items-start sm:gap-2 md:flex-row md:gap-4">
        <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:gap-1 md:justify-start md:gap-2">
          <Skeleton className="bg-border h-5.5 w-32 sm:h-6 sm:w-40 md:h-6 md:w-36" />
          <Skeleton className="bg-border h-6 w-24 sm:w-28" />
        </div>
        <div className="flex w-full items-center gap-2 sm:w-auto md:w-auto">
          <Skeleton className="bg-border h-4.5 w-8 sm:h-5.5 md:h-6" />
          <Skeleton className="bg-border size-4 sm:size-6" />
          <Skeleton className="bg-border h-4.5 w-24 sm:h-5.5 md:h-6" />
        </div>
      </div>
      <Skeleton className="bg-border hidden h-9 w-36 sm:inline-flex" />
    </div>
  )
}

export { InitialProposalHeaderSkeleton }
