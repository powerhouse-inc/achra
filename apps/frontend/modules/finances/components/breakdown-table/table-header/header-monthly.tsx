import type { MetricValues } from '@/modules/finances/types'
import { cn } from '@/modules/shared/lib/utils'
import { CellMonthly } from './cell-monthly'
import { filterActiveMetrics, orderMetrics } from './header-semi-annually'

const MONTH_KEYS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
  'Total',
]

interface HeaderMonthlyProps {
  title: string
  headerTable: MetricValues[]
  activeMetrics: string[]
}

function HeaderMonthly({ title, activeMetrics, headerTable }: HeaderMonthlyProps) {
  const metricsActive = filterActiveMetrics(activeMetrics, headerTable)

  return (
    <div
      className={cn(
        'flex min-h-[93px] flex-1 items-center justify-start overflow-hidden rounded-xl whitespace-pre',
        'bg-muted shadow-sm',
        '[&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0',
      )}
    >
      <div className="flex flex-1 flex-row items-center 2xl:max-w-[1312px]">
        <div className={cn('flex h-12 w-[195px] items-center py-2.5 pl-8', '3xl:min-w-[230px]')}>
          <div className="text-foreground max-w-full pr-2 text-base leading-normal font-bold wrap-break-word">
            {title}
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center">
          <div className="flex w-full flex-row items-center justify-between py-2.5">
            {MONTH_KEYS.map((month, index) => (
              <CellMonthly
                key={month}
                metrics={metricsActive[index] ?? {}}
                title={month}
                activeMetrics={orderMetrics(undefined, activeMetrics)}
                isTotal={month === 'Total'}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export { HeaderMonthly }
