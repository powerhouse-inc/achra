import type { MetricValues } from '@/modules/finances/types'
import { cn } from '@/modules/shared/lib/utils'
import { SemiAnnualCell } from './cell-semi-annually'

interface SemiAnnualHeaderProps {
  title: string
  className?: string
  headerTable: MetricValues[]
  activeMetrics: string[]
  year: string
}

export const defaultOrder = [
  'Budget',
  'Forecast',
  'Net Protocol Outflow',
  'Net Expenses On-Chain',
  'Actuals',
]
export const orderMetrics = (metricOrder = defaultOrder, metricsToOrder: string[]) => {
  const orderedMetrics: string[] = []

  metricOrder.forEach((metric) => {
    if (metricsToOrder.includes(metric)) {
      orderedMetrics.push(metric)
    }
  })

  return orderedMetrics
}

export const getKeyMetric = (metric: string) => {
  if (metric === 'Net Expenses On-Chain') {
    return 'PaymentsOnChain'
  }
  if (metric === 'Net Expenses Off-chain') {
    return 'PaymentsOffChainIncluded'
  }
  if (metric === 'Net Protocol Outflow') {
    return 'ProtocolNetOutflow'
  }
  return metric
}

export const filterActiveMetrics = (activeMetrics: string[], headerTable: MetricValues[]) =>
  headerTable.map((header) => {
    const filteredMetrics: Partial<MetricValues> = {}

    activeMetrics.forEach((metric) => {
      const matchKey = getKeyMetric(metric)
      if (matchKey in header) {
        filteredMetrics[matchKey as keyof MetricValues] = header[matchKey as keyof MetricValues]
      }
    })

    return filteredMetrics
  })

function SemiAnnualHeader({
  title,
  className,
  headerTable,
  activeMetrics,
  year,
}: SemiAnnualHeaderProps) {
  const keysMetrics = [`H1'${year.substring(2, 4)}`, `H2'${year.substring(2, 4)}`, 'Total']
  const metricsActive = filterActiveMetrics(activeMetrics, headerTable)

  return (
    <div className={cn('', className)}>
      <div className="flex h-12 w-21.25 items-center justify-start truncate border-r py-4 pl-2">
        <div className="max-w-full text-xs font-bold wrap-break-word whitespace-break-spaces md:text-base xl:whitespace-normal">
          {title}
        </div>
      </div>

      <div className="flex flex-1 items-center [&>div:last-of-type]:min-h-21">
        {keysMetrics.map((period, index) => (
          <SemiAnnualCell
            key={index}
            metrics={metricsActive[index]}
            semiannual={period}
            activeMetrics={orderMetrics(undefined, activeMetrics)}
            isTotal={period === 'Total'}
          />
        ))}
      </div>
    </div>
  )
}

export { SemiAnnualHeader }
