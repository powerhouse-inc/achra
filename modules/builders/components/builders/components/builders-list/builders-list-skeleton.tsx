import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { cn } from '@/modules/shared/lib/utils'
import { buildWidths, MAX_ROWS } from '../../utils/skeletons-helpers'
import { BuildersProfileSkeleton } from '../builders-profile-skeleton/builders-profile-skeleton'
import { BuildersRoleSkeleton } from '../builders-role-skeleton/builders-role-skeleton'

interface ScopeVariantProps {
  index: number
}

function ScopeVariant({ index }: ScopeVariantProps) {
  switch (index) {
    case 0:
      return (
        <>
          <Skeleton className="h-6 w-10" />
          <Skeleton className="h-6 w-10" />
          <Skeleton className="h-6 w-10" />
          <Skeleton className="h-6 w-10" />
        </>
      )
    case 1:
    case 2:
    case 3:
      return (
        <>
          <Skeleton className="h-6 w-10" />
          <Skeleton className="h-6 w-10" />
        </>
      )
    case 4:
    case 5:
    case 8:
      return <Skeleton className="h-6 w-10" />
    case 6:
    case 7:
      return (
        <>
          <Skeleton className="h-6 w-10" />
          <Skeleton className="h-6 w-10" />
        </>
      )
    default:
      return null
  }
}

interface BuildersListItemSkeletonProps {
  index: number
  builderNameWidth: number
  builderRoleWidth: number
}

function BuildersListItemSkeleton({
  builderNameWidth,
  builderRoleWidth,
  index,
}: BuildersListItemSkeletonProps) {
  return (
    <div className="bg-background flex flex-col gap-3 rounded-xl p-2 shadow-sm">
      <div className="grid grid-cols-[auto_1fr] items-center gap-4 md:grid-cols-[32%_26%_20%_1fr]">
        <BuildersProfileSkeleton builderNameWidth={builderNameWidth} />
        <div className="hidden flex-col gap-1 md:flex">
          <Skeleton className="h-5.5 w-11" />
          <div className="flex gap-1">
            <ScopeVariant index={index} />
          </div>
        </div>
        <div className="hidden flex-col gap-1 md:flex">
          <Skeleton className="h-5.5 w-8" />
          <BuildersRoleSkeleton builderRoleWidth={builderRoleWidth} />
        </div>
        <div className="flex justify-end gap-1">
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-9" />
        </div>
      </div>
      <div className="flex items-center justify-between md:hidden">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-5.5 w-8" />
          <BuildersRoleSkeleton builderRoleWidth={builderRoleWidth} />
        </div>
        <div className="flex flex-col items-end gap-1">
          <Skeleton className="h-5.5 w-11" />
          <div className="flex gap-1">
            <ScopeVariant index={index} />
          </div>
        </div>
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
  const builderProfileWidths = buildWidths({ min: 10, max: 37, seed: 12345 })
  const builderRoleWidths = buildWidths({ min: 20, max: 35, seed: 67890 })
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {Array.from({ length: MAX_ROWS }, (_, index) => {
        const builderNameWidth = builderProfileWidths[index] ?? 10
        const builderRoleWidth = builderRoleWidths[index] ?? 20

        return (
          <BuildersListItemSkeleton
            key={`builder-list-item-skeleton-${index}`}
            builderNameWidth={builderNameWidth}
            builderRoleWidth={builderRoleWidth}
            index={index}
          />
        )
      })}
    </div>
  )
}
