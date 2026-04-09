import { Skeleton } from '@/modules/shared/components/ui/skeleton'

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

export { DescriptionSkeleton }
