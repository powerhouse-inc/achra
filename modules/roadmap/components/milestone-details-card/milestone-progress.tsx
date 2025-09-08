import PercentageProgressBar from './percentage-progress-bar'
import type { DeliverableSet } from './types'

interface MilestoneProgressProps {
  data: Omit<DeliverableSet, 'deliverables'>
}

function clamp(value: number, min = 0, max = 100): number {
  return Math.min(Math.max(value, min), max)
}

function getProgressPercent(progress: DeliverableSet['progress']): number {
  if (!progress) return 0
  if (progress.__typename === 'Percentage') {
    return clamp((progress.value ?? 0) * 100)
  }
  if (progress.__typename === 'StoryPoints') {
    if (!progress.completed || !progress.total) return 0
    return (progress.completed / progress.total) * 100
  }
  return 0
}

export default function MilestoneProgress({ data }: MilestoneProgressProps) {
  const progress = getProgressPercent(data?.progress)

  return (
    <div className="flex flex-col items-center justify-center gap-4 self-stretch rounded-md pt-2">
      <PercentageProgressBar value={progress} />

      <div className="text-sm/5.5 font-semibold">
        <span className="text-status-progress">{data?.deliverablesCompleted ?? 0}</span>
        <span>/</span>
        <span className="text-foreground/30 pr-1">{data?.totalDeliverables ?? 0}</span>
        Deliverables Completed
      </div>
    </div>
  )
}
