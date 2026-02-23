import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { cn } from '@/modules/shared/lib/utils'

function DescriptionSkeleton() {
  return (
    <div className="flex w-full flex-col gap-2">
      <Skeleton className="h-4.5 w-[90%]" />
      <Skeleton className="h-4.5 w-[70%]" />
      <Skeleton className="h-4.5 w-full" />
      <Skeleton className="h-4.5 w-[95%]" />
      <Skeleton className="h-4.5 w-[85%]" />
      <Skeleton className="h-4.5 w-[87%]" />
      <Skeleton className="h-4.5 w-[96%]" />
      <Skeleton className="h-4.5 w-[80%]" />
      <Skeleton className="h-4.5 w-[90%]" />
      <Skeleton className="h-4.5 w-full" />
      <Skeleton className="h-4.5 w-[20%]" />
      <Skeleton className="h-4.5 w-[90%]" />
      <Skeleton className="h-4.5 w-[60%]" />
      <Skeleton className="h-4.5 w-[80%]" />
      <Skeleton className="h-4.5 w-full" />
      <Skeleton className="h-4.5 w-[35%]" />
    </div>
  )
}

interface ExpandableInfoSkeletonProps {
  isFirst?: boolean
}

function ExpandableInfoSkeleton({ isFirst }: ExpandableInfoSkeletonProps) {
  return (
    <div className="bg-accent flex w-full items-center justify-between gap-4 rounded-md px-3 py-2 shadow-lg">
      <Skeleton className={cn('bg-border h-6 w-[55%]', isFirst && 'w-[35%]')} />
      <Skeleton className="bg-border h-4 w-4" />
    </div>
  )
}

export function ProductInfoSkeleton() {
  return (
    <div className="flex w-full flex-col gap-6">
      <DescriptionSkeleton />
      <div className="flex w-full flex-col gap-4">
        <ExpandableInfoSkeleton isFirst />
        <ExpandableInfoSkeleton />
      </div>
    </div>
  )
}
