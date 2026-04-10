import { useMemo } from 'react'
import { cn } from '@/modules/shared/lib/utils'

interface DeliverableStoryPointsBarProps {
  total: number
  completed: number
}

function DeliverableStoryPointBar({ total, completed }: DeliverableStoryPointsBarProps) {
  const storyPointItems = useMemo(() => {
    return Array.from({ length: total }, (_, index) => (
      <div
        className={cn(
          'h-full w-full rounded',
          index < completed ? 'bg-status-progress' : 'bg-accent',
        )}
        key={index}
      />
    ))
  }, [total, completed])

  return (
    <div
      className="flex h-4 w-full items-center gap-4"
      role="progressbar"
      aria-valuenow={completed}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-label={`Story points progress: ${completed} of ${total} completed`}
    >
      <div className={cn('flex h-full w-full items-center', total > 10 ? 'gap-0.5' : 'gap-1')}>
        {storyPointItems}
      </div>
      <div className="w-fit min-w-fit text-right text-sm font-medium">
        <span className="text-xs font-bold">{completed}</span> of {total}
      </div>
    </div>
  )
}

export { DeliverableStoryPointBar }
