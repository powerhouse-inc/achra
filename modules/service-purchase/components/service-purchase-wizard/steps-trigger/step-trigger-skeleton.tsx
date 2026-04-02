import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { cn } from '@/modules/shared/lib/utils'

interface StepTriggerSkeletonProps {
  active?: boolean
}

function StepTriggerSkeleton({ active }: StepTriggerSkeletonProps) {
  return (
    <div
      className={cn(
        'border-accent flex h-8 overflow-hidden rounded-full border md:h-6.5 md:rounded-lg lg:h-10 2xl:h-12',
        active && 'border-border',
      )}
    >
      <div
        className={cn(
          'bg-accent flex h-full w-8 items-center justify-center md:w-6 md:p-1 lg:w-8 lg:p-2 2xl:w-9.25 2xl:p-3',
          active && 'bg-border',
        )}
      >
        <Skeleton className={cn('h-4.5 w-2.5 md:h-full', !active && 'bg-border')} />
      </div>
      <div className="hidden items-center gap-1 md:flex md:p-1 lg:gap-2 lg:p-2 2xl:p-3">
        <Skeleton className={cn('h-full md:w-4 lg:w-6', active && 'bg-border')} />
        <Skeleton className={cn('h-full w-20 2xl:w-30', active && 'bg-border')} />
      </div>
    </div>
  )
}

export { StepTriggerSkeleton }
