import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { cn } from '@/modules/shared/lib/utils'

interface WalletCellSkeletonProps {
  className?: string
}

function WalletCellSkeleton({ className }: WalletCellSkeletonProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-4 px-6 pt-4 pb-2 md:gap-2 md:px-2 md:py-2 lg:px-4',
        className,
      )}
    >
      <Skeleton className="size-8 min-w-8 rounded-full" />
      <div className="flex flex-col gap-1">
        <Skeleton className="h-5.5 w-32 md:h-3.5 md:w-24 lg:h-4 lg:w-32" />
        <div className="flex items-center gap-0.5">
          <Skeleton className="h-5 w-24 md:h-3 md:w-20 lg:h-3.5 lg:w-24" />
          <div className="flex items-center gap-6 md:gap-4">
            <Skeleton className="size-4" />
            <Skeleton className="size-4 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

export { WalletCellSkeleton }
