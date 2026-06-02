import { Card } from '@/modules/shared/components/ui/card'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function BudgetStatementsMobileSkeleton() {
  return (
    <div className="space-y-4 md:hidden">
      {Array.from({ length: 3 }).map((_, index) => (
        // it is okay to use index as key here because the skeleton is static
        // eslint-disable-next-line react/no-array-index-key
        <Card key={index} className="p-4">
          <div className="mb-4 flex items-start gap-3">
            <Skeleton className="h-10 w-10 shrink-0 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-32" />
            </div>
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-3 w-16" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-14" />
            </div>
            <div className="flex items-center justify-between border-t pt-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

export { BudgetStatementsMobileSkeleton }
