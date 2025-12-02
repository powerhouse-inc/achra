import { getProgressPercentage } from '../../lib/type-helpers'
import PercentageProgressBar from './percentage-progress-bar'
import type { RoadmapDetails } from '../../types'

interface MilestoneProgressProps {
  scope: RoadmapDetails['milestones'][number]['scope']
}

export default function MilestoneProgress({ scope }: MilestoneProgressProps) {
  const progress = getProgressPercentage(scope?.progress)

  return (
    <div className="flex flex-col items-center justify-center gap-4 self-stretch rounded-md pt-2">
      <PercentageProgressBar value={progress} />

      <div className="text-sm/5.5 font-semibold">
        <span className="text-status-progress">{scope?.deliverablesCompleted.completed}</span>
        <span>/</span>
        <span className="text-foreground/30 pr-1">{scope?.deliverablesCompleted.total}</span>
        Deliverables Completed
      </div>
    </div>
  )
}
