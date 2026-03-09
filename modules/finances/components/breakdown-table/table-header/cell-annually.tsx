import type { MetricValues } from '@/modules/finances/types'
import { usLocalizedNumber } from '@/modules/shared/lib/humanization'
import { cn } from '@/modules/shared/lib/utils'
import { getKeyMetric, getShortNameForMetric } from './cell-semi-annually'

interface CellAnnuallyProps {
  metrics: Partial<MetricValues>
  activeMetrics: string[]
}

function CellAnnually({ metrics, activeMetrics }: CellAnnuallyProps) {
  const activeMetricsCount = activeMetrics.length

  return (
    <div
      className={cn(
        'flex w-full flex-row justify-center font-medium',
        activeMetricsCount === 3 && '[&>div:nth-of-type(3)]:after:left-1',
        activeMetricsCount === 2 &&
          '[&>div:nth-of-type(2)]:after:-bottom-1.5 [&>div:nth-of-type(2)]:after:left-0.5 [&>div:nth-of-type(2)]:after:h-[42px]',
        'gap-0 pl-0 2xl:gap-[60px] 2xl:pl-5',
      )}
    >
      {activeMetrics.map((metric, index) => (
        <div
          key={index}
          className={cn(
            'relative flex flex-1 flex-col p-0',
            'w-20 xl:w-48 2xl:w-[78px]',
            'after:border-border after:absolute after:bottom-2.5 after:h-12 after:border-r after:content-[""]',
            'md:after:hidden',
            activeMetricsCount === 3 && index === 2 && 'after:left-1',
            activeMetricsCount === 2 &&
              index === 1 &&
              'after:-bottom-1.5 after:left-0.5 after:h-[42px]',
          )}
        >
          <div className="text-muted-foreground mb-1 text-center text-xs leading-normal font-normal">
            {getShortNameForMetric(metric)}
          </div>
          <div className="text-foreground text-center text-xs leading-[18px] font-semibold">
            {usLocalizedNumber(metrics[getKeyMetric(metric) as keyof MetricValues] ?? 0)}
          </div>
        </div>
      ))}
    </div>
  )
}

export { CellAnnually }
