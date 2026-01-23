import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { cn } from '@/modules/shared/lib/utils'

interface GenericBodyCellProps {
  className?: string
  skeletonWidth?: `w-${number}` | `max-w-${number}`
  children?: React.ReactNode
}

function GenericBodyCell({ className, skeletonWidth, children }: GenericBodyCellProps) {
  return (
    <div className={cn('px-2 py-4 lg:px-4', className)}>
      {children ?? (
        <Skeleton
          className={cn(
            'h-4.5 min-w-0 lg:h-6',
            skeletonWidth
              ? skeletonWidth.startsWith('max-w')
                ? `w-full ${skeletonWidth}`
                : skeletonWidth
              : 'w-24',
          )}
        />
      )}
    </div>
  )
}

export { GenericBodyCell }
