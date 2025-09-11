import { usLocalizedNumber } from '@/modules/shared/lib/humanization'
import { cn } from '../../../shared/lib/utils'

interface DeliverablePercentageBarProps {
  percentage: number
}

export default function DeliverablePercentageBar({ percentage }: DeliverablePercentageBarProps) {
  const width = percentage === 0 ? '0%' : `max(${percentage}%, 0.5px)`

  return (
    <div
      className="bg-accent relative w-full rounded"
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Progress: ${usLocalizedNumber(percentage, 0)}%`}
    >
      <div
        className={cn(
          'h-4',
          percentage === 1 ? 'rounded' : 'rounded-l',
          percentage === 1 ? 'bg-status-success' : 'bg-status-progress',
        )}
        style={{ width }}
      />
      <span className={cn('text-accent-foreground/30 absolute top-0 right-2 text-xs font-bold')}>
        {usLocalizedNumber(percentage, 0)}%
      </span>
    </div>
  )
}
