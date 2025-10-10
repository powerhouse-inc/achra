import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function ForumPostSkeleton() {
  return (
    <div className="bg-background outline-border flex flex-col gap-2 rounded-xl shadow-sm md:flex-row md:gap-0 md:shadow-none md:outline">
      <div className="bg-muted/30 outline-border flex w-full min-w-0 flex-col justify-center gap-2 rounded-xl border p-2 md:min-w-85 md:border-0 md:bg-transparent md:p-2 lg:min-w-127 lg:p-2 xl:min-w-175 xl:p-4 2xl:min-w-201">
        <Skeleton className="h-4 w-64 md:w-80 xl:h-6 xl:w-96" />
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1">
            <Skeleton className="size-3 rounded-full" />
            <Skeleton className="h-4 w-20 md:w-32 xl:h-5" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="size-3 rounded-full" />
            <Skeleton className="h-4 w-9 md:w-16 xl:h-5" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="size-3 rounded-full" />
            <Skeleton className="h-4 w-16 md:w-28 xl:h-5" />
          </div>
        </div>
      </div>
      <div className="flex w-full items-center gap-2 p-2 md:gap-4 lg:gap-4 xl:gap-8 xl:p-4">
        <Skeleton className="h-8 w-24 flex-1" />
        <Skeleton className="h-8 w-24 flex-1" />
        <Skeleton className="h-8 w-24 flex-1" />
        <Skeleton className="h-8 w-10" />
      </div>
    </div>
  )
}

export default ForumPostSkeleton
