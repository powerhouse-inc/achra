import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function TitleAndDescriptionSkeleton() {
  return (
    <div className="bg-card flex flex-col gap-4 rounded-xl border p-2 px-4 pb-4 md:h-full lg:border-none lg:bg-transparent lg:p-0">
      <Skeleton className="h-6 w-3/4 lg:h-7" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  )
}

export { TitleAndDescriptionSkeleton }
