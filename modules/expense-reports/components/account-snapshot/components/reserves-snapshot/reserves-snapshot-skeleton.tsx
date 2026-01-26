import { cn } from '@/modules/shared/lib/utils'
import { FundChangeRateSkeleton } from '../fund-change-rate'
import { ReserveCardSkeleton } from '../reserve-card'
import { SectionHeaderSkeleton } from '../section-header'
import { SimpleStatCardSkeleton } from '../simple-stat-card'

function ReservesSnapshotSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-end">
        <SectionHeaderSkeleton
          className={cn(
            '**:data-[slot="title"]:w-full **:data-[slot="title"]:max-w-32',
            '**:data-[slot="subtitle"]:w-full **:data-[slot="subtitle"]:max-w-132',
          )}
          showTooltip={true}
          level="h2"
        />
      </div>

      <div className="flex flex-col gap-8 md:gap-4">
        <div className="flex w-full flex-wrap gap-2 md:gap-4 lg:flex-nowrap lg:gap-6 xl:gap-8">
          <SimpleStatCardSkeleton
            className={cn(
              'order-1 w-[calc(50%-var(--spacing))] md:w-[calc(50%-var(--spacing)*2)] lg:w-full lg:min-w-39.5',
              '**:data-[slot="caption"]:max-w-30',
            )}
          />
          <div className="order-3 w-full lg:order-2 lg:max-w-117 lg:min-w-117 xl:max-w-146 xl:min-w-146 2xl:max-w-160 2xl:min-w-160">
            <FundChangeRateSkeleton />
          </div>
          <SimpleStatCardSkeleton
            hasEqualSign
            className={cn(
              'order-2 w-[calc(50%-var(--spacing))] md:w-[calc(50%-var(--spacing)*2)] lg:order-3 lg:w-full lg:min-w-39.5',
              '**:data-[slot="caption"]:max-w-28',
            )}
          />
        </div>

        {/* on chain sub-section */}
        <div className="flex flex-col gap-6 md:gap-4">
          <SectionHeaderSkeleton
            className={cn(
              '**:data-[slot="title"]:w-full **:data-[slot="title"]:max-w-37',
              '**:data-[slot="subtitle"]:w-full **:data-[slot="subtitle"]:max-w-100',
            )}
            showTooltip={true}
            level="h3"
          />

          <div className="flex flex-col gap-2">
            <ReserveCardSkeleton />
            <ReserveCardSkeleton />
          </div>
        </div>
      </div>
    </div>
  )
}

export { ReservesSnapshotSkeleton }
