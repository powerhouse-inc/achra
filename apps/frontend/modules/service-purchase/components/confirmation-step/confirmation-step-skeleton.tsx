import { Card, CardContent } from '@/modules/shared/components/ui/card'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function ConfirmationStepSkeleton() {
  return (
    <Card className="bg-background border-border mt-16 w-full self-center rounded-lg p-6 shadow-xs md:max-w-156">
      <CardContent className="flex flex-col items-center gap-6 px-0">
        <div className="flex flex-col items-center gap-4">
          {/* success icon */}
          <Skeleton className="size-10 rounded-lg" />
          <div className="flex flex-col items-center gap-2">
            {/* title */}
            <Skeleton className="h-6 w-56" />
            {/* description */}
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4.5 w-full max-w-64" />
              <Skeleton className="h-4.5 w-full max-w-56" />
              <Skeleton className="h-4.5 w-full max-w-48" />
            </div>
          </div>
        </div>
        {/* action cards */}
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          <Card className="bg-background border-border relative min-h-23 w-full rounded-lg p-3 shadow-none">
            <CardContent className="flex flex-col items-center gap-2 px-0">
              <div className="flex w-fit items-center gap-2">
                <Skeleton className="size-6 shrink-0 rounded-md" />
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="h-4 w-full max-w-40" />
            </CardContent>
          </Card>
          <Card className="bg-background border-border relative min-h-23 w-full rounded-lg p-3 shadow-none">
            <CardContent className="flex flex-col items-center gap-2 px-0">
              <div className="flex w-fit items-center gap-2">
                <Skeleton className="size-6 shrink-0 rounded-md" />
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="h-4 w-full max-w-40" />
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}

export { ConfirmationStepSkeleton }
