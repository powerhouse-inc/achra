import { MilestoneExtendedCardSkeleton } from '@/modules/roadmap/components/milestone-extended-card/milestone-extended-card-skeleton'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function TitleSkeleton() {
  return <Skeleton className="h-9.5 w-52" />
}

function TabsSkeleton() {
  return (
    <div className="flex gap-2">
      <Skeleton className="h-10 w-full max-w-38" />
      <Skeleton className="h-10 w-full max-w-38" />
      <Skeleton className="h-10 w-full max-w-38" />
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

function RoadmapSectionSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <TitleSkeleton />
      <TabsSkeleton />
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

export { RoadmapSectionSkeleton }
