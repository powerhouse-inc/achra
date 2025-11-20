import { Card } from '@/shared/components/ui/card'
import { cn } from '@/shared/lib/utils'
export function DoughnutChartSkeleton() {
  return (
    <Card
      data-slot="doughnut-chart-skeleton"
      className={cn('flex w-full flex-col gap-4 p-4', 'md:flex-row md:gap-5', 'xl:gap-8')}
    >
      <div
        data-slot="chart-skeleton"
        className={cn(
          'flex items-center justify-center',
          'md:w-34.5 md:min-w-34.5',
          'xl:w-39.5 xl:min-w-39.5',
        )}
      >
        <div className="bg-muted size-[146px] animate-pulse rounded-full md:size-[128px] xl:size-[146px]" />
      </div>
      <div
        data-slot="legend-skeleton"
        className={cn('flex flex-col gap-3.5', 'md:gap-4', 'xl:gap-4')}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="bg-muted size-3 animate-pulse rounded-full" />
            <div className="bg-muted h-4 w-32 animate-pulse rounded" />
          </div>
        ))}
      </div>
    </Card>
  )
}
