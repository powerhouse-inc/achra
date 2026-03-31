import { Card, CardContent, CardHeader } from '@/modules/shared/components/ui/card'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function NetworkCardSkeleton() {
  return (
    <Card className="flex flex-col gap-4 border-none p-4 shadow-sm sm:p-10 md:gap-10 md:p-16">
      <CardHeader className="flex h-8 items-center justify-between gap-0 p-0 sm:h-8 md:h-10">
        <Skeleton className="h-full w-32 sm:h-8 sm:w-40" />
      </CardHeader>

      <CardContent className="flex flex-1 flex-col justify-between gap-4 p-0 pt-0 md:gap-10">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4 sm:hidden" />
          <Skeleton className="h-4 w-3/4 sm:hidden" />
          <Skeleton className="h-4 w-3/4 sm:hidden" />
        </div>

        <Skeleton className="h-9 w-32" />
      </CardContent>
    </Card>
  )
}

export { NetworkCardSkeleton }
