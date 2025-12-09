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
          <div className="flex items-center gap-1">
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-6 w-12" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-6 w-12" />
          </div>
        </>
      )
    case 1:
    case 3:
    case 5:
    case 7:
      return (
        <>
          <Skeleton className="h-6 w-29.5" />
          <Skeleton className="h-6 w-37.5" />
        </>
      )
    case 2:
    case 6:
      return (
        <>
          <Skeleton className="h-6 w-29.5" />
          <Skeleton className="h-6 w-29.5" />
        </>
      )
    case 4:
    case 8:
      return <Skeleton className="h-6 w-37.5" />
    default:
      return null
  }
}

function BuildersTableHeaderSkeleton() {
  return (
    <div className="border-border bg-background grid grid-cols-[30%_20%_18%_13%_1fr] gap-2 rounded-xl border px-6 py-4 shadow-sm">
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-4 w-4" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-8.5" />
        <Skeleton className="h-4 w-4" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-12.5" />
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
  builderRoleWidth: number
  index: number
}

function BuildersTableBodyRowSkeleton({
  builderNameWidth,
  builderRoleWidth,
  index,
}: BuildersTableBodyRowSkeletonProps) {
  return (
    <div className="border-border bg-background grid grid-cols-[30%_20%_18%_13%_1fr] gap-2 rounded-xl border px-6 py-4 shadow-sm">
      <BuildersProfileSkeleton builderNameWidth={builderNameWidth} />
      <BuildersRoleSkeleton builderRoleWidth={builderRoleWidth} />
      <div className="flex flex-col gap-1">
        <ScopeVariant index={index} />
      </div>
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
  const builderProfileWidths = buildWidths({ min: 12, max: 45, seed: 12345 })
  const builderRoleWidths = buildWidths({ min: 25, max: 40, seed: 67890 })
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: MAX_ROWS }, (_, index) => {
        const builderNameWidth = builderProfileWidths[index] ?? 12
        const builderRoleWidth = builderRoleWidths[index] ?? 25
        return (
          <BuildersTableBodyRowSkeleton
            key={`builder-skeleton-${index}`}
            builderNameWidth={builderNameWidth}
            builderRoleWidth={builderRoleWidth}
            index={index}
          />
        )
      })}
    </div>
  )
}

interface BuildersTableSkeletonProps {
  className?: string
}

export function BuildersTableSkeleton({ className }: BuildersTableSkeletonProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <BuildersTableHeaderSkeleton />
      <BuildersTableBodySkeleton />
    </div>
  )
}
