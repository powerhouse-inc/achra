import { Skeleton } from '@/modules/shared/components/ui/skeleton'

interface BuildersProfileSkeletonProps {
  builderNameWidth: number
}

function BuildersProfileSkeleton({ builderNameWidth }: BuildersProfileSkeletonProps) {
  return (
    <div className="flex items-center gap-2 md:gap-4">
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <Skeleton className="h-5.5 w-5" />
          <Skeleton className="h-5.5" style={{ width: `${builderNameWidth * 4}px` }} />
        </div>
        <Skeleton className="h-5 w-21.5" />
      </div>
    </div>
  )
}

export { BuildersProfileSkeleton }
