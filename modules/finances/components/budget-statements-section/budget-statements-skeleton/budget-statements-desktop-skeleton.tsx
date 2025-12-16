import { Skeleton } from '@/modules/shared/components/ui/skeleton'

export function BudgetStatementsDesktopSkeleton() {
  return (
    <div className="hidden flex-col space-y-3 lg:flex">
      {/* Table Header Simulation */}
      <div className="bg-accent/50 flex items-center justify-between gap-3 rounded-t-xl p-4">
        <div className="w-48 min-w-0">
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="w-24 shrink-0">
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="w-32 shrink-0">
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="w-20 shrink-0">
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="w-50 shrink-0">
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="mr-4 w-20 shrink-0" />
      </div>

      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="bg-card border-border flex items-center justify-between gap-3 rounded-lg border p-4 shadow-sm"
        >
          {/* Icon/Avatar */}
          {/* Name/Organization */}
          <div className="flex w-48 min-w-0 items-center gap-2">
            <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
            <div className="flex w-full gap-1">
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>

          {/* Date */}
          <div className="w-24 shrink-0">
            <Skeleton className="h-4 w-20" />
          </div>

          {/* Amount */}
          <div className="w-32 shrink-0">
            <Skeleton className="h-4 w-28" />
          </div>

          {/* Status Badge */}
          <div className="w-20 shrink-0">
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>

          {/* Days Ago */}
          <div className="w-50 shrink-0">
            <Skeleton className="h-4 w-24" />
          </div>

          {/* View Button */}
          <Skeleton className="mr-4 h-9 w-20 shrink-0 rounded-md" />
        </div>
      ))}
    </div>
  )
}
