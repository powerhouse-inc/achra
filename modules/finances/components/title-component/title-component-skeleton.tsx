import { Skeleton } from '@/modules/shared/components/ui/skeleton'

export function TitleComponentSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-7 w-64 md:h-8 xl:h-9" />
      <Skeleton className="ml-0 h-4 w-full max-w-2xl xl:h-5" />
    </div>
  )
}
