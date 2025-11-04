import { Card, CardContent, CardHeader } from '@/modules/shared/components/ui/card'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function NetworkCardSkeleton() {
  return (
    <Card className="flex h-64 flex-col gap-0 border-none bg-cover bg-center bg-no-repeat p-4 shadow-sm sm:p-6">
      <CardHeader className="gap-0 p-0">
        <div className="flex h-8 items-center justify-between sm:h-8 md:h-10">
          <Skeleton className="h-8 w-32 sm:h-8 sm:w-40 md:h-10" />
          <Skeleton className="h-6 w-16" />
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col justify-between p-0 pt-0">
        <div className="mt-2 flex flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4 sm:hidden" />
          <Skeleton className="h-4 w-3/4 sm:hidden" />
          <Skeleton className="h-4 w-3/4 sm:hidden" />
        </div>

        <div className="flex h-9 w-full justify-end">
          <Skeleton className="h-9 w-32" />
        </div>
      </CardContent>
    </Card>
  )
}

export { NetworkCardSkeleton }
