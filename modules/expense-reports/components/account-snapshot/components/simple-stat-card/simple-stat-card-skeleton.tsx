import { Card } from '@/modules/shared/components/ui/card'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { cn } from '@/modules/shared/lib/utils'
import EqualSign from '../svgs/equal.svg'

interface SimpleStatCardSkeletonProps {
  className?: string
  hasEqualSign?: boolean
}

function SimpleStatCardSkeleton({ className, hasEqualSign = false }: SimpleStatCardSkeletonProps) {
  return (
    <Card
      className={cn(
        'bg-popover w-full gap-2 border-none p-2 md:p-4 lg:p-4 xl:px-8 xl:py-4',
        className,
      )}
    >
      <Skeleton className="h-4.5 w-17" />

      <div className="flex items-center md:mt-auto md:gap-4 lg:gap-0">
        {hasEqualSign && (
          <div className="-mt-0.75 mr-1 md:mt-0 md:mr-auto lg:mt-1.75 lg:mr-2 xl:mr-4">
            <EqualSign className="text-border h-2.5 w-4 md:h-2.5 md:w-4 lg:h-3.75 lg:w-6" />
          </div>
        )}
        <div className="border-border bg-background flex w-full flex-col gap-1 rounded-xl border px-1.75 py-0.75 pb-1.75 lg:gap-2 xl:px-3.75">
          <Skeleton className="h-4 w-full lg:h-4.5" data-slot="caption" />
          <div className="flex items-baseline gap-1">
            <Skeleton className="h-5.5 w-20 lg:h-6" data-slot="value" />
            <Skeleton className="h-5.5 w-7.5 xl:h-6" data-slot="currency" />
          </div>
        </div>
      </div>
    </Card>
  )
}

export { SimpleStatCardSkeleton }
