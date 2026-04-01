import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { cn } from '@/modules/shared/lib/utils'
import { PRICING_GRID } from '../feature-row/feature-row-skeleton'

/** Skeleton for the header row with plan columns */
function HeaderCatalogPlanSkeleton() {
  return (
    <div className={cn('grid', PRICING_GRID.responsive, 'border-input h-21 items-center border-b')}>
      {/* Empty label column */}
      <div className="flex items-center px-6" />

      {/* Mobile: single plan column */}
      <div className="flex h-full items-center justify-center lg:hidden">
        <div className="flex flex-col items-center gap-2">
          <div className="border-border size-4 shrink-0 rounded-full border" />
          <Skeleton className="bg-border h-3 w-16" />
          <Skeleton className="bg-border h-2.5 w-12" />
        </div>
      </div>

      {/* Desktop: 4 plan columns */}
      {Array.from({ length: 4 }).map((_, i) => (
        // It is okay to use index as key here because the skeleton is static
        // eslint-disable-next-line react/no-array-index-key
        <div key={i} className="hidden h-full min-w-0 items-center justify-center lg:flex">
          <div className="flex flex-col items-center gap-1">
            <div className="border-border size-4 shrink-0 rounded-full border" />
            <Skeleton className="bg-border h-3 w-16" />
            <Skeleton className="bg-border h-2.5 w-12" />
          </div>
        </div>
      ))}
    </div>
  )
}

export { HeaderCatalogPlanSkeleton }
