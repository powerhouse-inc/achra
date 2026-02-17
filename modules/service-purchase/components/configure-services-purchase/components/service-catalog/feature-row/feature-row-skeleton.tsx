import { Check } from 'lucide-react'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { cn } from '@/modules/shared/lib/utils'

/**
 * Static grid classes for the pricing table layout.
 * Used by skeleton components that don't have access to dynamic tier count.
 * Assumes 4 tiers (the most common case).
 *
 * Mobile: 2 columns (label + 1 visible plan)
 * Desktop: 5 columns (4fr label + 4× 1fr tier)
 */
export const PRICING_GRID = {
  responsive: 'grid-cols-2 lg:grid-cols-[4fr_1fr_1fr_1fr_1fr]',
} as const

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
        <Check className="text-border size-4" />
      </div>

      {/* Desktop: 4 value columns */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          // It is okay to use index as key here because the skeleton is static
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          className="border-input hidden min-h-14 min-w-0 items-center justify-center border-b px-6 lg:flex"
        >
          <Check className="text-border size-4" />
        </div>
      ))}
    </div>
  )
}

export { FeatureRowSkeleton }
