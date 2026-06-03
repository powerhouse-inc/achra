import type { MetricValues } from '@/modules/finances/types'
import { usLocalizedNumber } from '@/modules/shared/lib/humanization'
import { cn } from '@/modules/shared/lib/utils'
import { getKeyMetric, getShortNameForMetric } from './cell-semi-annually'

interface CellMonthlyProps {
  title: string
  isTotal?: boolean
  className?: string
  metrics: Partial<MetricValues>
  activeMetrics: string[]
}

function CellMonthly({
  metrics,
  title,
  isTotal = false,
  className,
  activeMetrics,
}: CellMonthlyProps) {
  return (
    <div
      className={cn(
        'relative flex min-w-[87px] flex-col items-center justify-center font-medium',
        isTotal && 'bg-muted -my-4 py-4',
        !isTotal &&
          'after:border-border after:absolute after:left-0 after:h-12 after:border-r after:content-[""]',
        '2xl:min-w-[80px]',
        className,
      )}
    >
      <div className="text-foreground mb-2 text-center text-xl leading-normal font-semibold">
        {title}
      </div>
      <div className="flex flex-col">
        {activeMetrics.map((metric, index) => (
          <div key={index} className="flex w-[70.5px] flex-col">
            <div className="text-muted-foreground mb-1 text-center text-xs leading-normal font-normal">
              {getShortNameForMetric(metric)}
            </div>
            <div className="text-foreground text-center text-xs leading-normal font-semibold">
              {usLocalizedNumber(metrics[getKeyMetric(metric) as keyof MetricValues] ?? 0)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export { CellMonthly }
