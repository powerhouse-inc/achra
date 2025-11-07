import { Skeleton } from '@/modules/shared/components/ui/skeleton'

export function EllipsisSkeleton() {
  return (
    <div className="flex items-center gap-0.5">
      <Skeleton className="h-2 w-2 rounded-none" />
      <Skeleton className="h-2 w-2 rounded-none" />
      <Skeleton className="h-2 w-2 rounded-none" />
    </div>
  )
}
