import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function MilestoneProgressSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 self-stretch rounded-md pt-2">
      <Skeleton className="h-24 w-24 rounded-full lg:h-40 lg:w-40" />
      <Skeleton className="h-[22px] w-48" />
    </div>
  )
}

export { MilestoneProgressSkeleton }
