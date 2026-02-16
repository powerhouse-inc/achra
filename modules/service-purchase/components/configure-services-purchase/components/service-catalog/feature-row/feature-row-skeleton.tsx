import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { cn } from '@/modules/shared/lib/utils'
import { CheckSkeleton } from '../header-catalog-plan'
import { PRICING_GRID } from '../pricing-calculator-context'

interface FeatureRowSkeletonProps {
  labelWidth?: string
}

/** Skeleton for a single feature row (no sub-items) */
function FeatureRowSkeleton({ labelWidth = 'w-36' }: Readonly<FeatureRowSkeletonProps>) {
  return (
    <div className={cn('grid', PRICING_GRID.responsive, 'items-center')}>
      {/* Label column */}
      <div
        className={cn(
          'border-input bg-background flex min-h-14 items-center border-b px-4 lg:px-6',
          'sticky left-0 z-10 lg:static',
        )}
      >
        <Skeleton className={cn('bg-border h-3.5', labelWidth)} />
      </div>

      {/* Mobile: single value column */}
      <div className="border-input flex h-full min-h-14 min-w-0 items-center justify-center border-b px-4 lg:hidden">
        <CheckSkeleton />
      </div>

      {/* Desktop: 4 value columns */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          // It is okay to use index as key here because the skeleton is static
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          className="border-input hidden min-h-14 min-w-0 items-center justify-center border-b px-6 lg:flex"
        >
          <CheckSkeleton />
        </div>
      ))}
    </div>
  )
}

export { FeatureRowSkeleton }
