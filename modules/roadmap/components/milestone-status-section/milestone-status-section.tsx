import type {
  ScopeOfWork_DeliverableSetStatus,
  Sow_DeliverableSetStatus,
} from '@/modules/__generated__/graphql/switchboard-generated'
import DeliverableSetStatusChip from '@/modules/shared/components/chips/deliverable-set-status-chip/deliverable-set-status-chip'
import { Progress } from '@/shared/components/ui/progress'
import { cn } from '@/shared/lib/utils'

interface MilestoneStatusSectionProps {
  status?: ScopeOfWork_DeliverableSetStatus | Sow_DeliverableSetStatus
  progress: number
}

export default function MilestoneStatusSection({ status, progress }: MilestoneStatusSectionProps) {
  return (
    <div className="bg-popover flex flex-col gap-2 rounded-xl border p-2">
      <div className="flex items-center justify-between">
        <span className="text-card-foreground text-xs leading-4.5 font-medium">Status</span>
        {status && <DeliverableSetStatusChip status={status} />}
      </div>
      <div className="relative">
        <Progress
          value={progress}
          aria-label={`Milestone status progress: ${progress}%`}
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
    </div>
  )
}
