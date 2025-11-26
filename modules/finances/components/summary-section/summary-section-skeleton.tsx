import { Card } from '@/modules/shared/components/ui/card'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { cn } from '@/shared/lib/utils'
import { BudgetUtilizationCardSkeleton } from './butget-utilization-card/budget-utilization-skeleton'
import { DoughnutChartSkeleton } from './doughnut-chart/doughnut-chart-skeleton'

export function SummarySectionSkeleton() {
  return (
    <div
      data-slot="summary-section-skeleton"
      className="flex min-w-0 flex-col gap-4 md:gap-6 lg:flex-row lg:gap-6 xl:gap-8"
    >
      <div className="min-w-0 lg:w-[31.75%] lg:shrink-0">
        <BudgetUtilizationCardSkeleton />
      </div>

      <Card
        data-slot="card-container"
        className={cn('flex w-full flex-col gap-0 p-0', 'md:flex-row')}
      >
        <div data-slot="content" className="md:flex md:w-[29%]">
          {/* FilterTabs Skeleton */}
          <div
            className={cn(
              'bg-background/25 relative max-w-full overflow-hidden rounded-t-xl shadow-xs',
              'md:min-w-48 md:rounded-l-xl md:rounded-tr-none',
              'w-full',
            )}
          >
            <div
              className={cn(
                'no-scrollbar flex h-fit w-full min-w-48 overflow-x-scroll',
                'md:flex-col md:gap-2 md:py-4.5',
                'xl:min-w-51.25 xl:gap-2',
              )}
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={cn('flex h-5.5 items-center pl-6', 'py-1 md:py-0')}>
                  <Skeleton className="h-4 w-24 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          data-slot="chart-container"
          className="hidden pt-4 pb-4 md:flex md:w-[71%] md:justify-center"
        >
          <DoughnutChartSkeleton />
        </div>

        <div data-slot="mobile-chart" className="md:hidden">
          {/* MobileChart Skeleton */}
          <div className="flex gap-4 px-4 pt-2 pb-4">
            {/* Bar Container */}
            <div className="bg-muted flex min-h-48 w-8 min-w-8 flex-col gap-1 self-stretch overflow-hidden rounded-lg p-1">
              <Skeleton className="h-1/3 w-full rounded-sm" />
              <Skeleton className="h-1/4 w-full rounded-sm" />
              <Skeleton className="h-1/5 w-full rounded-sm" />
            </div>

            {/* Legends Container */}
            <div className="bg-muted flex min-h-48 w-full flex-col items-center justify-center rounded-xl p-4">
              <div className="flex w-full flex-col gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-3 w-3 rounded-full" />
                      <Skeleton className="h-4 w-24 rounded" />
                    </div>
                    <Skeleton className="h-4 w-16 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
