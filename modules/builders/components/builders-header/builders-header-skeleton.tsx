import { Skeleton } from '@/modules/shared/components/ui/skeleton'

export function BuildersHeaderSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-7.5 w-24.25" />
      <div className="flex w-full flex-col gap-1">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-[80%]" />
      </div>
      <div className="flex w-full justify-end">
        <Skeleton className="h-10 w-25" />
      </div>
    </div>
  )
}
