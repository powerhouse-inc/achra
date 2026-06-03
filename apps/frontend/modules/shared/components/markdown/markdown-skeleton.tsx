import { cn } from '../../lib/utils'
import { Skeleton } from '../ui/skeleton'

interface MarkdownSkeletonProps {
  /**
   * The number of lines to show. It should be greater than 1.
   * @default 4
   */
  lines?: number
}

const SKELETON_BASE_CLASSES = 'h-3.5 sm:4.5 xl:5'

function MarkdownSkeleton({ lines = 4 }: MarkdownSkeletonProps) {
  return (
    <div className="flex w-full flex-col gap-1">
      {Array.from({ length: lines - 1 }).map((_, index) => (
        // it is okay to use index as key here because the skeleton is static
        // eslint-disable-next-line react/no-array-index-key
        <Skeleton key={index} className={cn(SKELETON_BASE_CLASSES, 'w-full')} />
      ))}
      <Skeleton className={cn(SKELETON_BASE_CLASSES, 'w-1/3')} />
    </div>
  )
}

export { MarkdownSkeleton }
