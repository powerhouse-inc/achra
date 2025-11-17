import { Skeleton } from '@/modules/shared/components/ui/skeleton'

export function AvatarTitleSkeleton() {
  return (
    <div className="flex h-6 items-center gap-4">
      <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
      <Skeleton className="h-5 w-24" />
    </div>
  )
}
