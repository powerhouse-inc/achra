import { Card, CardContent, CardHeader } from '@/modules/shared/components/ui/card'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { OperatorKeyPointSkeleton } from './operator-key-point'

function OperatorCardSkeleton() {
  return (
    <Card className="gap-4 border-none p-3 shadow-lg">
      <CardHeader className="gap-0 p-0">
        <div className="flex items-center gap-2">
          {/* avatar */}
          <Skeleton className="size-12 shrink-0 rounded-full sm:size-10" />
          <div className="flex flex-col gap-1">
            {/* code + name */}
            <Skeleton className="h-4 w-full max-w-32" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-0">
        {/* description */}
        <Skeleton className="h-4.5 w-full" />
        <Skeleton className="h-4.5 w-full max-w-5/6" />
        <div className="flex flex-col gap-2">
          {/* key points (Last Active, Status, Team Size) */}
          <div className="grid grid-cols-2 gap-2">
            <OperatorKeyPointSkeleton />
            <OperatorKeyPointSkeleton />
          </div>
          <OperatorKeyPointSkeleton />
        </div>
      </CardContent>
      {/* Configure Services button */}
      <Skeleton className="h-9 w-full rounded-md" />
    </Card>
  )
}

export { OperatorCardSkeleton }
