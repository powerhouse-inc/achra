import { Skeleton } from '../ui/skeleton'

export function BreadcrumbSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="h-5 w-24" />
      <span className="text-muted-foreground">/</span>
      <Skeleton className="h-5 w-6" />
      <span className="text-muted-foreground">/</span>
      <Skeleton className="h-5 w-32" />
      <span className="text-muted-foreground">/</span>
      <Skeleton className="h-5 w-40" />
    </div>
  )
}
