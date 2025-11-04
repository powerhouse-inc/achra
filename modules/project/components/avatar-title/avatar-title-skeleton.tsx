import { Skeleton } from '@/modules/shared/components/ui/skeleton'

export function AvatarTitleSkeleton() {
  return (
    <div className="bg-card border-border flex items-center gap-4 rounded-lg border p-4">
      <Skeleton className="h-12 w-12 shrink-0 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  )
}
