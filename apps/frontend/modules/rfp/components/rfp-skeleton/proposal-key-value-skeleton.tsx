import { cn } from '@achra/ui/lib/utils'
import { Skeleton } from '@achra/ui/skeleton'

interface ProposalKeyValueElementSkeletonProps {
  className?: string
}
function ProposalKeyValueElementSkeleton({ className }: ProposalKeyValueElementSkeletonProps) {
  return (
    <div className="w-full">
      <Skeleton className={cn('h-9.5 rounded-sm md:flex', className)} />
    </div>
  )
}

export { ProposalKeyValueElementSkeleton }
