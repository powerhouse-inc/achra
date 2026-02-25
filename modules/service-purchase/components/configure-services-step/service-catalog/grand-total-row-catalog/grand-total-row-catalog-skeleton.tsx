import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { cn } from '@/modules/shared/lib/utils'
import { PRICING_GRID } from '../feature-row/feature-row-skeleton'

/** Skeleton for the grand total row at the bottom */
function GrandTotalRowCatalogSkeleton() {
  return (
    <div className={cn('grid', PRICING_GRID.responsive, 'items-center')}>
      <div
        className={cn(
          'bg-background flex min-h-14 items-center px-4 lg:px-6',
          'sticky left-0 z-10 lg:static',
        )}
      >
        <Skeleton className="bg-border h-4 w-40" />
      </div>

      {/* Mobile: single column */}
      <div className="flex min-h-14 min-w-0 items-center justify-center px-4 lg:hidden">
        <Skeleton className="bg-border h-4 w-16" />
      </div>

      {/* Desktop: 4 columns */}
      {Array.from({ length: 4 }).map((_, i) => (
        // It is okay to use index as key here because the skeleton is static
        // eslint-disable-next-line react/no-array-index-key
        <div key={i} className="hidden min-h-14 min-w-0 items-center justify-center px-6 lg:flex">
          <Skeleton className="bg-border h-4 w-16" />
        </div>
      ))}
    </div>
  )
}

export { GrandTotalRowCatalogSkeleton }
