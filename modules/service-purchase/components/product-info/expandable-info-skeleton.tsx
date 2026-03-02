import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { cn } from '@/modules/shared/lib/utils'

interface ExpandableInfoSkeletonProps {
  isFirst?: boolean
}

function ExpandableInfoSkeleton({ isFirst }: ExpandableInfoSkeletonProps) {
  return (
    <div className="bg-accent flex w-full items-center justify-between gap-4 rounded-md px-3 py-2 shadow-lg">
      <Skeleton className={cn('bg-border h-6 w-[55%]', isFirst && 'w-[35%]')} />
      <Skeleton className="bg-border h-4 w-4" />
    </div>
  )
}

export { ExpandableInfoSkeleton }
