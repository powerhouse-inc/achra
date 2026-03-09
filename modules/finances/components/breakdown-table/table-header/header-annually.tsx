import type { MetricValues } from '@/modules/finances/types'
import { cn } from '@/modules/shared/lib/utils'
import { CellAnnually } from './cell-annually'
import { getKeyMetric } from './cell-semi-annually'
import { orderMetrics } from './header-semi-annually'

// Util functions - placed in same file per migration instructions
const defaultOrder = [
  'Budget',
  'Forecast',
  'Net Protocol Outflow',
  'Net Expenses On-Chain',
  'Actuals',
]

function filterActiveMetrics(
  activeMetrics: string[],
  headerTable: MetricValues[],
): Array<Partial<MetricValues>> {
  return headerTable.map((header) => {
    const filteredMetrics: Partial<MetricValues> = {}

    activeMetrics.forEach((metric) => {
      const matchKey = getKeyMetric(metric)
      if (matchKey in header) {
        filteredMetrics[matchKey as keyof MetricValues] = header[matchKey as keyof MetricValues]
      }
    })

    return filteredMetrics
  })
}

interface HeaderAnnuallyProps {
  year: string
  title: string
  headerTable: MetricValues[]
  activeMetrics: string[]
}

function HeaderAnnually({ year, title, activeMetrics, headerTable }: HeaderAnnuallyProps) {
  const metricsActive = filterActiveMetrics(activeMetrics, headerTable)

  return (
    <div
      className={cn(
        'flex min-h-[83px] flex-1 items-center justify-start overflow-hidden rounded-xl whitespace-pre',
        'bg-muted shadow-sm',
        '[&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0',
      )}
    >
      <div
        className={cn(
          'flex flex-1 flex-row items-center p-2 whitespace-break-spaces',
          'md:p-4 md:px-2',
          'xl:px-8 xl:py-4',
          '2xl:max-w-[1312px]',
        )}
      >
        <div
          className={cn(
            'flex w-[78px] min-w-[78px] items-center whitespace-break-spaces',
            'md:h-12 md:w-[140px]',
            'xl:w-[190px]',
            '2xl:w-[170px]',
            '3xl:w-[195px]',
          )}
        >
          <div className="text-foreground max-w-full pr-2 text-xs leading-normal font-bold wrap-break-word md:text-base xl:whitespace-normal">
            {title}
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center">
          <div className="text-foreground mb-2 text-center text-sm leading-[22px] font-semibold lg:text-xl lg:leading-normal lg:tracking-[0.4px]">
            {year}
          </div>
          <div className="flex w-full flex-row items-center justify-between">
            <CellAnnually
              metrics={metricsActive[0] ?? {}}
              activeMetrics={orderMetrics(defaultOrder, activeMetrics)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export { HeaderAnnually }
