import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function ExpenseReportsSectionSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="container">
        <Skeleton className="h-9 w-72" />
      </div>

      <div className="bg-accent pt-2 pb-6 shadow-sm">
        <div className="container">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <Skeleton className="bg-border h-6 w-64" />
              <Skeleton className="bg-border h-40 w-full rounded-xl" />
            </div>

            <div className="flex flex-col gap-4">
              <Skeleton className="bg-border h-6 w-56" />
              <div className="bg-muted inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]">
                <div className="flex h-full items-center gap-2">
                  <div className="bg-background h-[calc(100%-1px)] w-24 rounded-md shadow-sm">
                    <Skeleton className="bg-border h-full w-full rounded-md" />
                  </div>
                  <Skeleton className="bg-border h-[calc(100%-1px)] w-28 rounded-md" />
                  <Skeleton className="bg-border h-[calc(100%-1px)] w-24 rounded-md" />
                </div>
              </div>
              <Skeleton className="bg-border h-56 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ExpenseReportsSectionSkeleton }
