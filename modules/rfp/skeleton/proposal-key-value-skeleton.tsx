import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { cn } from '@/modules/shared/lib/utils'

interface ProposalKeyValueElementSkeletonProps {
  className?: string
}
export function ProposalKeyValueElementSkeleton({
  className,
}: ProposalKeyValueElementSkeletonProps) {
  return (
    <div className="w-full">
      <Skeleton className={cn('h-9.5 rounded-sm md:flex', className)} />
    </div>
  )
}
