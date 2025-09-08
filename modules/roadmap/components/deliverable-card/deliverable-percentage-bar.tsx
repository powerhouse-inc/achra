import { usLocalizedNumber } from '@/modules/shared/lib/humanization'
import { cn } from '../../../shared/lib/utils'

interface DeliverablePercentageBarProps {
  percentage: number
}

export default function DeliverablePercentageBar({ percentage }: DeliverablePercentageBarProps) {
  const width = percentage === 0 ? '0%' : `max(${percentage * 100}%, 0.5px)`

  return (
    <div className="bg-accent relative w-full rounded">
      <div
        className={cn(
          'h-4',
          percentage === 1 ? 'rounded' : 'rounded-l',
          percentage === 1 ? 'bg-status-success' : 'bg-status-progress',
        )}
        style={{ width }}
      />
      <span className={cn('text-accent-foreground/30 absolute top-0 right-2 text-xs font-bold')}>
        {usLocalizedNumber(percentage * 100, 0)}%
      </span>
    </div>
  )
}
