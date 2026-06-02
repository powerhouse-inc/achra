import type { ScopeOfWork_DeliverableSetStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import { DeliverableSetStatusChip } from '@/modules/shared/components/chips/deliverable-set-status-chip/deliverable-set-status-chip'
import { Progress } from '@/modules/shared/components/ui/progress'
import { cn } from '@/modules/shared/lib/utils'
import { MetricCard, MetricCardLabel } from '../metric-card/metric-card'

interface StatusMetricCardProps {
  status?: ScopeOfWork_DeliverableSetStatus
  progress: number
}

function StatusMetricCard({ status, progress }: StatusMetricCardProps) {
  return (
    <MetricCard className="[&>div]:flex-col">
      <div className="flex w-full items-center justify-between">
        <MetricCardLabel>Status</MetricCardLabel>
        {status && <DeliverableSetStatusChip status={status} />}
      </div>
      <div className="relative w-full">
        <Progress
          value={progress}
          aria-label={`Status progress: ${progress}%`}
          className={cn(
            'bg-accent [&>div]:bg-status-progress h-4 rounded',
            progress === 100 && '[&>div]:bg-status-success',
          )}
        />
        <div
          className={cn(
            'absolute inset-0 z-10 flex items-center justify-end pr-2 text-xs font-bold',
            progress === 100 ? 'text-primary-foreground' : 'text-accent-foreground/30',
          )}
          aria-hidden="true"
        >
          {progress}%
        </div>
      </div>
    </MetricCard>
  )
}

export { StatusMetricCard }
