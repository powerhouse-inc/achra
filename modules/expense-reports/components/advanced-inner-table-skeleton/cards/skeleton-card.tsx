import { getSkeletonWidth } from '@/modules/expense-reports/lib/skeleton-utils'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { cn } from '@/modules/shared/lib/utils'

interface SkeletonCardProps {
  renderHeader?: () => React.ReactNode
  rowCount?: number
}

const skeletonWidths: Array<`w-${number}`> = [
  'w-16',
  'w-20',
  'w-22',
  'w-24',
  'w-26',
  'w-28',
  'w-30',
  'w-32',
  'w-34',
  'w-36',
  'w-38',
  'w-40',
]

function SkeletonCard({ renderHeader, rowCount = 5 }: SkeletonCardProps) {
  return (
    <div className={cn('bg-card flex flex-col overflow-hidden rounded-xl shadow-lg')}>
      {renderHeader?.()}

      {/* Body Section */}
      {Array.from({ length: rowCount }).map((_, index) => (
        // it is okay to use index as key here because the skeleton is static
        // eslint-disable-next-line react/no-array-index-key
        <div key={index} className={cn('px-6')}>
          <div
            className={cn('flex items-center justify-between py-2', {
              'border-b': index !== rowCount - 1,
            })}
          >
            <Skeleton className={cn('h-6', getSkeletonWidth(index, 0, skeletonWidths))} />
            <Skeleton className={cn('bg-border h-6', getSkeletonWidth(index, 1, skeletonWidths))} />
          </div>
        </div>
      ))}
    </div>
  )
}

export { SkeletonCard }
