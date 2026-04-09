import type { MetricValues } from '@/modules/finances/types'
import { cn } from '@/modules/shared/lib/utils'
import { CellQuarterly } from './cell-quarterly'
import { filterActiveMetrics, orderMetrics } from './header-semi-annually'

interface HeaderQuarterlyProps {
  title: string
  className?: string
  headerTable: MetricValues[]
  activeMetrics: string[]
  year: string
}

function HeaderQuarterly({
  title,
  className,
  headerTable,
  year,
  activeMetrics,
}: HeaderQuarterlyProps) {
  const keysMetrics = [...([1, 2, 3, 4] as const).map((quarter) => `Q${quarter} ${year}`), 'Total']
  const metricsActive = filterActiveMetrics(activeMetrics, headerTable)

  return (
    <div
      className={cn(
        'flex min-h-[83px] flex-1 items-center justify-start overflow-hidden rounded-xl whitespace-pre',
        'bg-muted shadow-sm',
        '[&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0',
        className,
      )}
    >
      <div
        className={cn(
          'border-border flex min-h-12 w-[145px] flex-row items-center justify-start border-r p-4 pr-2',
          'lg:w-[148px] lg:pl-2',
          'xl:w-[220px] xl:px-8',
          '2xl:w-[260px] 2xl:px-8 2xl:pr-2',
          '3xl:w-[228px] 3xl:px-4',
        )}
      >
        <div className="text-foreground max-w-full pr-2 text-base leading-normal font-semibold wrap-break-word xl:font-bold xl:whitespace-normal">
          {title}
        </div>
      </div>
      <div className="flex flex-1 flex-row items-center">
        {keysMetrics.map((quarterly, index) => (
          <CellQuarterly
            key={quarterly}
            metrics={metricsActive[index] ?? {}}
            quarterly={quarterly}
            activeMetrics={orderMetrics(undefined, activeMetrics)}
            isTotal={quarterly === 'Total'}
          />
        ))}
      </div>
    </div>
  )
}

export { HeaderQuarterly }
