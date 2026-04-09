import { Card, CardContent } from '@/modules/shared/components/ui/card'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function SubmitRequestFormSkeleton() {
  return (
    <Card className="mx-auto w-full max-w-218.5 border-none py-0!">
      <CardContent className="p-3 lg:p-6">
        <div className="flex flex-col gap-6">
          <fieldset className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-9 w-full rounded-md" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-9 w-full rounded-md" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-9 w-full rounded-md" />
              <Skeleton className="h-4 w-full max-w-64" />
            </div>
          </fieldset>

          <div className="flex flex-col gap-4">
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { SubmitRequestFormSkeleton }
