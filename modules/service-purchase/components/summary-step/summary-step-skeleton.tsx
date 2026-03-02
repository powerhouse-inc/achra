import { Card, CardContent, CardHeader } from '@/modules/shared/components/ui/card'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function SummaryStepSkeleton() {
  return (
    <div className="mt-6 flex flex-col gap-6">
      {/* Marketplace Header */}
      <div className="border-border flex items-center gap-3 border-b pb-2">
        <div className="flex items-center gap-2">
          {/* avatar */}
          <Skeleton className="size-12 shrink-0 rounded-full sm:size-10" />
          <div className="flex flex-col gap-1">
            {/* code + name */}
            <Skeleton className="h-5 w-52" />
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <Card className="mx-auto w-full max-w-218.5 overflow-hidden border-none p-0!">
        <CardHeader className="flex flex-row items-start justify-between gap-4 px-3 pt-3 lg:px-6 lg:pt-6">
          <div className="flex items-start gap-2">
            {/* icon */}
            <Skeleton className="size-12 shrink-0 rounded-2xl" />
            <div className="flex flex-col gap-1">
              {/* title */}
              <Skeleton className="h-5 w-full max-w-48 lg:h-6" />
              {/* subtitle */}
              <Skeleton className="h-3.5 w-full max-w-28" />
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-0.5">
            {/* price */}
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 p-0! pb-3! lg:pb-6!">
          {/* Key Information grid */}
          <div className="bg-accent grid grid-cols-1 gap-2 px-3 py-3 sm:grid-cols-2 md:grid-cols-4 lg:px-6 lg:py-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col gap-1">
                <Skeleton className="bg-border h-3.5 w-full max-w-20" />
                <Skeleton className="bg-border h-4 w-full max-w-24" />
              </div>
            ))}
          </div>
          {/* Pricing sections */}
          <div className="flex flex-col gap-4 px-3 lg:px-6">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-full max-w-48" />
              <Skeleton className="h-4 w-full max-w-32" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-full max-w-40" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Request Form */}
      <Card className="mx-auto w-full max-w-218.5 border-none py-0!">
        <CardContent className="flex flex-col gap-6 p-3 lg:p-6">
          <div className="flex flex-col gap-4">
            {/* name field */}
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-9 w-full rounded-md" />
            </div>
            {/* team name field */}
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-9 w-full rounded-md" />
            </div>
            {/* email field */}
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-9 w-full rounded-md" />
            </div>
          </div>
          {/* submit button */}
          <Skeleton className="h-10 w-full rounded-md" />
        </CardContent>
      </Card>
    </div>
  )
}

export { SummaryStepSkeleton }
