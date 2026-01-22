import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { cn } from '@/modules/shared/lib/utils'

interface GenericHeaderSkeletonProps {
  className?: string
  children?: React.ReactNode
}
function GenericHeaderSkeleton({ className, children }: GenericHeaderSkeletonProps) {
  return (
    <div className={cn('px-2 py-3 lg:px-4', className)}>
      {children ?? <Skeleton className="bg-border h-4 w-16 lg:w-24" />}
    </div>
  )
}

export { GenericHeaderSkeleton }
