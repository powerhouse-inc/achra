import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { cn } from '@/modules/shared/lib/utils'
import { buildWidths, MAX_ROWS } from '../../utils/skeletons-helpers'
import { BuildersProfileSkeleton } from '../builders-profile-skeleton/builders-profile-skeleton'
import { BuildersSkillsSkeleton } from '../builders-skills-skeleton/builders-skills-skeleton'

interface BuildersListItemSkeletonProps {
  builderNameWidth: number
  builderSkillsWidth: number
}

function BuildersListItemSkeleton({
  builderNameWidth,
  builderSkillsWidth,
}: BuildersListItemSkeletonProps) {
  return (
    <div className="bg-background flex flex-col gap-3 rounded-xl p-2 shadow-sm">
      <div className="grid grid-cols-[auto_1fr] items-center gap-4 md:grid-cols-[45%_33%_1fr]">
        <BuildersProfileSkeleton builderNameWidth={builderNameWidth} />
        <div className="hidden flex-col gap-1 md:flex">
          <Skeleton className="h-5.5 w-8" />
          <BuildersSkillsSkeleton builderSkillsWidth={builderSkillsWidth} />
        </div>
        <div className="flex justify-end gap-1">
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-9" />
        </div>
      </div>
      <div className="flex flex-col gap-1 md:hidden">
        <Skeleton className="h-5.5 w-8" />
        <BuildersSkillsSkeleton builderSkillsWidth={builderSkillsWidth} />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-4.5 w-19.5" />
        <Skeleton className="h-5.5 w-21" />
      </div>
    </div>
  )
}

interface BuildersListSkeletonProps {
  className?: string
}

export function BuildersListSkeleton({ className }: BuildersListSkeletonProps) {
  const builderProfileWidths = buildWidths({ min: 13, max: 40, seed: 12345 })
  const builderSkillsWidths = buildWidths({ min: 23, max: 38, seed: 67890 })
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {Array.from({ length: MAX_ROWS }, (_, index) => {
        const builderNameWidth = builderProfileWidths[index] ?? 13
        const builderSkillsWidth = builderSkillsWidths[index] ?? 23

        return (
          <BuildersListItemSkeleton
            key={`builder-list-item-skeleton-${index}`}
            builderNameWidth={builderNameWidth}
            builderSkillsWidth={builderSkillsWidth}
          />
        )
      })}
    </div>
  )
}
