import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { cn } from '@/modules/shared/lib/utils'
import { getSkeletonWidth } from '../../lib/skeleton-utils'
import { AdvancedInnerTableSkeleton } from '../advanced-inner-table-skeleton'
import { SkeletonCard } from '../advanced-inner-table-skeleton/cards'
import { GenericBodyCell } from '../advanced-inner-table-skeleton/cells/generic-body-cell'
import { GenericHeaderSkeleton } from '../advanced-inner-table-skeleton/cells/generic-header-skeleton'
import { WalletCellSkeleton } from '../advanced-inner-table-skeleton/cells/wallet-cell-skeleton'

const skeletonWidths: Array<`max-w-${number}`> = [
  'max-w-16',
  'max-w-18',
  'max-w-20',
  'max-w-22',
  'max-w-24',
  'max-w-28',
  'max-w-32',
  'max-w-36',
  'max-w-40',
]

function ActualTableSkeleton() {
  return (
    <AdvancedInnerTableSkeleton
      columnCount={6}
      rowCount={3}
      renderHeaderCell={(columnIndex) => (
        <GenericHeaderSkeleton
          className={cn({
            'w-44 lg:w-60': columnIndex === 0,
            'flex justify-end': columnIndex !== 0,
          })}
        />
      )}
      renderCell={(rowIndex, columnIndex) => {
        if (columnIndex === 0 && rowIndex !== 2) {
          return <WalletCellSkeleton />
        }

        return (
          <GenericBodyCell
            className={cn({ 'border-t': rowIndex === 2, 'flex justify-end': columnIndex !== 0 })}
            skeletonWidth={getSkeletonWidth(rowIndex, columnIndex, skeletonWidths)}
          />
        )
      }}
      cardCountInMobile={3}
      renderMobileCard={(cardIndex) => {
        if (cardIndex === 0) {
          return (
            <SkeletonCard
              renderHeader={() => (
                <div className="px-6 pt-2">
                  <Skeleton className="bg-border h-6 w-20" />
                </div>
              )}
              rowCount={5}
            />
          )
        }

        return (
          <SkeletonCard renderHeader={() => <WalletCellSkeleton className="pb-0" />} rowCount={5} />
        )
      }}
    />
  )
}

export { ActualTableSkeleton }
