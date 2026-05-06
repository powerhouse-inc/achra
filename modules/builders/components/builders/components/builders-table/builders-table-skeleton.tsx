import { buildWidths, MAX_ROWS } from '@/modules/builders/lib/skeletons-helpers'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { cn } from '@/modules/shared/lib/utils'
import { BuildersProfileSkeleton } from '../builders-profile-skeleton/builders-profile-skeleton'
import { BuildersSkillsSkeleton } from '../builders-skills-skeleton/builders-skills-skeleton'

function BuildersTableHeaderSkeleton() {
  return (
    <div className="border-border bg-background grid grid-cols-[36%_26%_19%_1fr] gap-2 rounded-xl border px-6 py-4 shadow-sm">
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-4 w-4" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-8.5" />
        <Skeleton className="h-4 w-4" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-26.5" />
        <Skeleton className="h-4 w-4" />
      </div>
    </div>
  )
}

interface BuildersTableBodyRowSkeletonProps {
  builderNameWidth: number
  builderSkillsWidth: number
}

function BuildersTableBodyRowSkeleton({
  builderNameWidth,
  builderSkillsWidth,
}: BuildersTableBodyRowSkeletonProps) {
  return (
    <div className="border-border bg-background grid grid-cols-[36%_26%_19%_1fr] gap-2 rounded-xl border px-6 py-4 shadow-sm">
      <BuildersProfileSkeleton builderNameWidth={builderNameWidth} />
      <BuildersSkillsSkeleton builderSkillsWidth={builderSkillsWidth} />
      <div className="flex flex-col gap-1">
        <Skeleton className="h-4.5 w-20" />
        <Skeleton className="h-5.5 w-21" />
      </div>
      <div className="flex items-center justify-end gap-4">
        <Skeleton className="h-9 w-23" />
        <Skeleton className="h-9 w-9" />
      </div>
    </div>
  )
}

function BuildersTableBodySkeleton() {
  const builderProfileWidths = buildWidths({ min: 15, max: 48, seed: 12345 })
  const builderSkillsWidths = buildWidths({ min: 28, max: 43, seed: 67890 })
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: MAX_ROWS }, (_, index) => {
        const builderNameWidth = builderProfileWidths[index] ?? 15
        const builderSkillsWidth = builderSkillsWidths[index] ?? 28
        return (
          <BuildersTableBodyRowSkeleton
            key={`builder-skeleton-${index}`}
            builderNameWidth={builderNameWidth}
            builderSkillsWidth={builderSkillsWidth}
          />
        )
      })}
    </div>
  )
}

interface BuildersTableSkeletonProps {
  className?: string
}

function BuildersTableSkeleton({ className }: BuildersTableSkeletonProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <BuildersTableHeaderSkeleton />
      <BuildersTableBodySkeleton />
    </div>
  )
}

export { BuildersTableSkeleton }
