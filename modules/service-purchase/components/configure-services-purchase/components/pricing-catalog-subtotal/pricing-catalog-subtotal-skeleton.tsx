import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { cn } from '@/modules/shared/lib/utils'
import { PRICING_GRID } from '../service-catalog/pricing-calculator-context'

/** Skeleton for a subtotal row */
function PricingCatalogSubtotalSkeleton() {
  return (
    <div className={cn('grid', PRICING_GRID.responsive, 'items-center')}>
      <div
        className={cn(
          'border-input bg-background flex min-h-14 items-center border-y px-4 lg:px-6',
          'sticky left-0 z-10 lg:static',
        )}
      >
        <Skeleton className="bg-border h-3.5 w-20" />
      </div>

      {/* Mobile: single column */}
      <div className="border-input flex min-h-14 min-w-0 items-center justify-center border-y px-4 lg:hidden">
        <Skeleton className="bg-border h-3.5 w-12" />
      </div>

      {/* Desktop: 4 columns */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          // its safe to use index as key here since this is a static list of skeletons that won't change
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          className="border-input hidden min-h-14 min-w-0 items-center justify-center border-y px-6 lg:flex"
        >
          <Skeleton className="bg-border h-3.5 w-12" />
        </div>
      ))}
    </div>
  )
}

export { PricingCatalogSubtotalSkeleton }
