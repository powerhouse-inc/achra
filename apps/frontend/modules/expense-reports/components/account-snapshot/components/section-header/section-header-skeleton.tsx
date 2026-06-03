import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { cn } from '@/modules/shared/lib/utils'

interface SectionHeaderSkeletonProps {
  className?: string
  showTooltip?: boolean
  level?: 'h1' | 'h2' | 'h3'
}

function SectionHeaderSkeleton({
  className,
  showTooltip = false,
  level = 'h1',
}: SectionHeaderSkeletonProps) {
  // Map level to approximate width for title skeleton
  const titleWidths = {
    h1: 'w-48',
    h2: 'w-40',
    h3: 'w-32',
  }

  // Map level to approximate height for title skeleton
  const titleHeights = {
    h1: 'h-6',
    h2: 'h-5.5',
    h3: 'h-4.75',
  }

  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      <div className="flex items-center gap-2">
        <Skeleton data-slot="title" className={`${titleHeights[level]} ${titleWidths[level]}`} />

        {showTooltip && <Skeleton className="size-4 rounded-full" />}
      </div>

      <Skeleton data-slot="subtitle" className="h-4 w-64 lg:h-5" />
    </div>
  )
}

export { SectionHeaderSkeleton }
