import { Card, CardContent } from '@/modules/shared/components/ui/card'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { NetworkGridSkeleton } from './components/network-grid/network-grid-skeleton'

function NetworksSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <NetworkGridSkeleton />

      <Card className="w-full py-12">
        <CardContent className="flex flex-col items-center gap-[6.4px]">
          <Skeleton className="h-6 w-[60%]" />
          <Skeleton className="h-6 w-[80%]" />
          <Skeleton className="h-6 w-[70%]" />
          <Skeleton className="h-6 w-[20%]" />
        </CardContent>
      </Card>

      <Skeleton className="h-7 w-40" />

      <Card className="bg-input/40 w-full">
        <CardContent className="flex flex-col items-center gap-6">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <div className="flex w-full flex-col items-center gap-2">
            <Skeleton className="h-5.5 w-full max-w-100" />
            <div className="flex w-full flex-col items-center gap-1.5">
              <Skeleton className="h-5 w-full max-w-130" />
              <Skeleton className="h-5 w-full max-w-110" />
            </div>
          </div>
          <Skeleton className="h-12 w-53.5 rounded-3xl" />
        </CardContent>
      </Card>

      <Card className="mt-6 grid h-64 w-full grid-cols-1 items-center gap-6 overflow-hidden rounded-xl p-6 sm:grid-cols-[40%_auto] md:gap-10 lg:grid-cols-[50%_auto] lg:gap-20 xl:grid-cols-[60%_auto]">
        <div className="text-primary-foreground flex flex-col gap-4">
          <Skeleton className="h-7 w-40" />
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-10" />
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-2.5 sm:flex-row">
          <Skeleton className="h-9 w-full sm:max-w-74" />
          <Skeleton className="h-9 w-full sm:w-38" />
        </div>
      </Card>
    </div>
  )
}

export { NetworksSkeleton }
