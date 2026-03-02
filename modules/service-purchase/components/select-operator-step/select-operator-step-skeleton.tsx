import { OperatorCardSkeleton } from '@/modules/shared/components/operator-card'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function SelectOperatorStepSkeleton() {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <div className="flex flex-col gap-2">
        {/* heading */}
        <Skeleton className="h-6 w-full max-w-24 lg:h-5.5 lg:max-w-28" />
        {/* description */}
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4.5 w-full lg:h-5.5" />
          <Skeleton className="h-4.5 w-full max-w-4/5 lg:h-5.5" />
          <Skeleton className="h-4.5 w-full max-w-3/4 lg:h-5.5" />
        </div>
      </div>
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        <OperatorCardSkeleton />
      </div>
    </div>
  )
}

export { SelectOperatorStepSkeleton }
