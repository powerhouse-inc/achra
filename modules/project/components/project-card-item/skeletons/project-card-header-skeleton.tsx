import { CardHeader } from '@/modules/shared/components/ui/card'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function ProjectCardHeaderSkeleton() {
  return (
    <CardHeader className="flex flex-col gap-4 px-4 pt-3 pb-4 lg:flex-row [&]:grid-cols-none!">
      {/* Title Section */}
      <div className="flex w-full shrink grow-2 flex-col gap-1 sm:basis-[62.3%] sm:justify-between">
        <div className="flex w-full items-start justify-between gap-2 sm:gap-4">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex w-full items-center gap-1 sm:items-center sm:gap-2">
              <Skeleton className="h-7 w-48 rounded" />
              <Skeleton className="h-4 w-12 rounded" />
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <Skeleton className="size-8 rounded-full" />
                <Skeleton className="h-4 w-32 rounded" />
              </div>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:justify-end md:ml-4">
            <Skeleton className="h-10 w-48 rounded-xl" />
          </div>
        </div>
        <div className="block sm:hidden">
          <div className="flex items-center gap-2">
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="h-4 w-24 rounded" />
          </div>
        </div>
        <div className="mt-1 flex w-full sm:mt-0">
          <div className="flex w-full flex-col gap-1">
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-5/6 rounded" />
          </div>
        </div>
        <div className="text-primary-foreground mt-1 block w-full sm:mt-0 sm:hidden">
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
      </div>

      {/* Metrics Section */}
      <div className="flex w-full shrink grow flex-col gap-2 sm:gap-2 lg:basis-[35%] lg:flex-col">
        <div className="bg-popover flex flex-col justify-between gap-0 rounded-xl border px-4 py-2 shadow-none">
          <Skeleton className="mb-2 h-3 w-12 rounded" />
          <div className="flex w-full justify-between">
            <Skeleton className="h-6 w-24 rounded" />
            <Skeleton className="h-3 w-12 rounded" />
          </div>
        </div>
        <div className="bg-popover flex w-full flex-col gap-2 rounded-xl border p-2 lg:px-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-3 w-10 rounded" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <Skeleton className="h-4 w-full rounded" />
        </div>
        <div className="bg-popover flex flex-col justify-between gap-0 rounded-xl border px-4 py-2 shadow-none">
          <Skeleton className="mb-2 h-3 w-20 rounded" />
          <div className="flex w-full justify-between">
            <Skeleton className="h-6 w-16 rounded" />
            <Skeleton className="h-10 w-10 rounded-lg" />
          </div>
        </div>
      </div>
    </CardHeader>
  )
}

export { ProjectCardHeaderSkeleton }
