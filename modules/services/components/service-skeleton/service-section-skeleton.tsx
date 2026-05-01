import { Card, CardContent, CardHeader } from '@/modules/shared/components/ui/card'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function ServiceSectionSkeleton() {
  return (
    <Card className="bg-background gap-2 rounded-lg pt-2 pl-4 shadow-none sm:flex-1">
      {/* header: icon + title */}
      <CardHeader className="gap-y-0 p-0 pr-4">
        <div className="flex items-center gap-2">
          <Skeleton className="size-4 rounded" />
          <Skeleton className="h-4 w-32" />
        </div>
      </CardHeader>
      {/* items list */}
      <CardContent className="flex flex-col gap-1.5 p-0 pr-4">
        <div className="ml-2 flex items-center gap-2">
          <Skeleton className="size-1 min-w-1 rounded-full" />
          <Skeleton className="h-3.5 w-36" />
        </div>
        <div className="ml-2 flex items-center gap-2">
          <Skeleton className="size-1 min-w-1 rounded-full" />
          <Skeleton className="h-3.5 w-28" />
        </div>
        <div className="ml-2 flex items-center gap-2">
          <Skeleton className="size-1 min-w-1 rounded-full" />
          <Skeleton className="h-3.5 w-40" />
        </div>
        <div className="ml-2 flex items-center gap-2">
          <Skeleton className="size-1 min-w-1 rounded-full" />
          <Skeleton className="h-3.5 w-32" />
        </div>
      </CardContent>
    </Card>
  )
}

export { ServiceSectionSkeleton }
