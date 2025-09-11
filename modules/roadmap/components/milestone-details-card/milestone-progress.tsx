import type { ScopeOfWork_DeliverablesSet } from '@/modules/__generated__/graphql/switchboard-generated'
import PercentageProgressBar from './percentage-progress-bar'

interface MilestoneProgressProps {
  data: Omit<ScopeOfWork_DeliverablesSet, 'deliverables'>
}

function clamp(value: number, min = 0, max = 100): number {
  return Math.min(Math.max(value, min), max)
}

function getProgressPercent(progress: ScopeOfWork_DeliverablesSet['progress']): number {
  if (!progress) return 0
  if (progress.__typename === 'ScopeOfWork_Percentage') {
    return clamp((progress.value ?? 0) * 100)
  }
  if (progress.__typename === 'ScopeOfWork_StoryPoint') {
    if (!progress.completed || !progress.total) return 0
    return (progress.completed / progress.total) * 100
  }
  return 0
}

export default function MilestoneProgress({ data }: MilestoneProgressProps) {
  // TODO: reenable this once the progress is fixed in the api
  // const progress = getProgressPercent(data?.progress)

  // TODO: remove this once the progress is fixed in the api
  const progress =
    ((data.deliverablesCompleted?.completed ?? 0) * 100) / (data.deliverablesCompleted?.total ?? 0)

  return (
    <div className="flex flex-col items-center justify-center gap-4 self-stretch rounded-md pt-2">
      <PercentageProgressBar value={progress} />

      <div className="text-sm/5.5 font-semibold">
        <span className="text-status-progress">{data?.deliverablesCompleted?.completed ?? 0}</span>
        <span>/</span>
        <span className="text-foreground/30 pr-1">{data?.deliverablesCompleted?.total ?? 0}</span>
        Deliverables Completed
      </div>
    </div>
  )
}
