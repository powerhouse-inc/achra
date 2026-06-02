import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { cn } from '@/modules/shared/lib/utils'
import { PRICING_GRID } from '../feature-row/feature-row-skeleton'

interface SectionHeaderSkeletonProps {
  hasToggle?: boolean
  hasOneTimeFee?: boolean
  oneTimeFeeSkeletonClassName?: string
}

/** Skeleton for a section header (e.g., "Legal Setup", "Core Tools & Documentation") */
function SectionHeaderSkeleton({
  hasToggle = false,
  hasOneTimeFee = false,
  oneTimeFeeSkeletonClassName,
}: Readonly<SectionHeaderSkeletonProps>) {
  return (
    <div className={cn('grid', PRICING_GRID.responsive, 'items-center')}>
      <div
        className={cn(
          'border-input bg-accent flex min-h-14 items-center gap-2 border-b px-4 lg:px-6',
          'sticky left-0 z-10 lg:static',
        )}
      >
        {hasToggle ? (
          <div className="flex items-center gap-2">
            <Skeleton className="bg-border h-5 w-9 rounded-full" />
            <Skeleton className="bg-border h-3.5 w-32" />
            <Skeleton className="bg-border h-5 w-16 rounded-md" />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Skeleton className="bg-border size-4 rounded-sm" />
            <Skeleton className="bg-border h-3.5 w-32" />
            <Skeleton className="bg-border h-5 w-16 rounded-md" />
          </div>
        )}
      </div>

      {/* Mobile: single column */}
      <div className="border-input bg-accent flex h-full min-h-14 min-w-0 items-center justify-center border-b px-4 lg:hidden" />

      {/* Desktop: 4 plan columns — last column may show one-time fee text (right-aligned like real component) */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          // It is okay to use index as key here because the skeleton is static
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          className={cn(
            'border-input bg-accent hidden min-h-14 min-w-0 items-center border-b px-6 lg:flex',
            hasOneTimeFee && i === 3 ? 'relative justify-end' : 'justify-center',
          )}
        >
          {hasOneTimeFee && i === 3 && (
            <Skeleton
              className={cn(
                'bg-border absolute right-6 h-3',
                oneTimeFeeSkeletonClassName ?? 'w-16',
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export { SectionHeaderSkeleton }
