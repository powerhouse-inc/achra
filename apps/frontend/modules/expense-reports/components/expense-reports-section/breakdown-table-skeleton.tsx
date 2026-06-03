import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { cn } from '@/modules/shared/lib/utils'
import { getSkeletonWidth } from '../../lib/skeleton-utils'
import { AdvancedInnerTableSkeleton } from '../advanced-inner-table-skeleton'
import { SkeletonCard } from '../advanced-inner-table-skeleton/cards'
import { GenericBodyCell } from '../advanced-inner-table-skeleton/cells/generic-body-cell'
import { GenericHeaderSkeleton } from '../advanced-inner-table-skeleton/cells/generic-header-skeleton'

const skeletonWidths: Array<`max-w-${number}`> = [
  'max-w-10',
  'max-w-16',
  'max-w-18',
  'max-w-20',
  'max-w-22',
  'max-w-24',
  'max-w-28',
]

function BreakdownTableSkeleton() {
  return (
    <AdvancedInnerTableSkeleton
      columnCount={7}
      rowCount={13}
      renderHeaderCell={(columnIndex) => (
        <GenericHeaderSkeleton
          className={cn('*:w-14 lg:*:w-24', { 'flex justify-end': ![0, 5].includes(columnIndex) })}
        />
      )}
      renderCell={(rowIndex, columnIndex) => {
        const borderClasses = cn({
          'border-t': [11, 12].includes(rowIndex),
          'border-b': [2, 6].includes(rowIndex),
        })

        if ([0, 1, 3, 4, 7, 8].includes(rowIndex)) {
          return columnIndex === 0 ? (
            <GenericBodyCell
              skeletonWidth={getSkeletonWidth(rowIndex, columnIndex, skeletonWidths)}
            />
          ) : null
        }

        if (columnIndex === 5) {
          if (rowIndex === 11 || rowIndex === 12) {
            return <div className="h-14.25 border-t" />
          }
          // it is a comment cell
          return (
            <div
              className={cn('flex w-full min-w-60 flex-col gap-1 px-2 py-2 lg:px-4', borderClasses)}
            >
              <Skeleton className={cn('h-4.5 w-full')} />
              <Skeleton className={cn('h-4.5 w-1/2')} />
            </div>
          )
        }

        return (
          <GenericBodyCell
            className={cn(borderClasses, { 'flex justify-end': ![0, 5].includes(columnIndex) })}
            skeletonWidth={getSkeletonWidth(rowIndex, columnIndex, skeletonWidths)}
          />
        )
      }}
      cardCountInMobile={5}
      renderMobileCard={(cardIndex) => {
        if (cardIndex < 3) {
          return (
            <SkeletonCard
              renderHeader={() => (
                <div className="flex flex-col gap-2">
                  <div className="bg-accent flex flex-col gap-2 px-6 py-2">
                    <Skeleton className="bg-border h-6 w-28" />
                    <Skeleton className="bg-border h-5.5 w-40" />
                  </div>
                  <div className="flex items-center justify-between px-6 pb-2">
                    <Skeleton className="bg-border h-6 w-35" />
                    <Skeleton className="bg-border size-4" />
                  </div>
                </div>
              )}
              rowCount={6}
            />
          )
        }

        return (
          <SkeletonCard
            renderHeader={() => (
              <div className="px-6 pt-2">
                <Skeleton className="bg-border h-6 w-26" />
              </div>
            )}
            rowCount={6}
          />
        )
      }}
    />
  )
}

export { BreakdownTableSkeleton }
