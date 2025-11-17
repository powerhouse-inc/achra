import { NavigationHeaderSkeleton } from '@/modules/shared/components/navigation-header/navigation-header-skeleton'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { MilestoneExtendedCardSkeleton } from '../milestone-extended-card'

function HeaderSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
          <div className="flex w-full max-w-141.75 flex-col gap-2 sm:flex-row md:items-center">
            <Skeleton className="h-6 w-full max-w-112.5" />
            <Skeleton className="h-6 w-28 sm:flex-1" />
          </div>
          <Skeleton className="h-9 w-42.25" />
        </div>
        <NavigationHeaderSkeleton />
      </div>
    </div>
  )
}

function DescriptionSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-5.5 w-full" />
      <Skeleton className="h-5.5 w-full max-w-136.75" />
    </div>
  )
}

function RoadmapsListSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <HeaderSkeleton />
      <DescriptionSkeleton />
      <div className="flex gap-2">
        <MilestoneExtendedCardSkeleton />
        <MilestoneExtendedCardSkeleton className="hidden sm:flex" />
        <MilestoneExtendedCardSkeleton className="hidden lg:flex" />
        <MilestoneExtendedCardSkeleton className="hidden xl:flex" />
      </div>
    </div>
  )
}

export { RoadmapsListSkeleton }
