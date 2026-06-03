import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { cn } from '@/modules/shared/lib/utils'
import { FundChangeRateSkeleton } from '../fund-change-rate'
import { SectionHeaderSkeleton } from '../section-header'
import { SimpleStatCardSkeleton } from '../simple-stat-card'

function FundingOverviewSkeleton() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {/* header */}
      <div className="relative flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <SectionHeaderSkeleton
          className={cn(
            '**:data-[slot="title"]:w-full **:data-[slot="title"]:max-w-72',
            '**:data-[slot="subtitle"]:w-full **:data-[slot="subtitle"]:max-w-180',
          )}
          level="h1"
          showTooltip={true}
        />

        <div className="flex items-center gap-2">
          <Skeleton className="size-5 rounded-full" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:gap-6 xl:gap-8">
        <div className="flex w-full flex-wrap gap-2 md:gap-4 lg:flex-nowrap lg:gap-6 xl:gap-8">
          <SimpleStatCardSkeleton
            className={cn(
              'order-1 w-[calc(50%-var(--spacing))] md:w-[calc(50%-var(--spacing)*2)] lg:w-full lg:min-w-39.5',
              '**:data-[slot="caption"]:max-w-32',
            )}
          />
          <div className="order-3 w-full lg:order-2 lg:max-w-117 lg:min-w-117 xl:max-w-146 xl:min-w-146 2xl:max-w-160 2xl:min-w-160">
            <FundChangeRateSkeleton />
          </div>
          <SimpleStatCardSkeleton
            hasEqualSign
            className={cn(
              'order-2 w-[calc(50%-var(--spacing))] md:w-[calc(50%-var(--spacing)*2)] lg:order-3 lg:w-full lg:min-w-39.5',
              '**:data-[slot="caption"]:max-w-30',
            )}
          />
        </div>

        <div className="bg-popover flex items-center justify-between rounded-lg p-2 shadow-lg">
          <Skeleton className="h-5.5 w-41 lg:h-6 lg:w-50" />
          <Skeleton className="size-4" />
        </div>
      </div>
    </div>
  )
}

export { FundingOverviewSkeleton }
