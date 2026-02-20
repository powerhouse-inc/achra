import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function PurchaseSectionSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-7 w-full max-w-24" />
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-xl p-3 shadow-lg">
          <div className="flex items-center gap-2">
            <Skeleton className="size-12 rounded-full sm:size-10" />
            <Skeleton className="h-6 w-full max-w-48" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4.5 w-full" />
              <Skeleton className="h-4.5 w-full max-w-[80%]" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Skeleton className="h-15 w-full rounded-md" />
              <Skeleton className="h-15 w-full rounded-md" />
            </div>
            <Skeleton className="h-15 w-full rounded-md" />
          </div>
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>
    </div>
  )
}

export { PurchaseSectionSkeleton }
