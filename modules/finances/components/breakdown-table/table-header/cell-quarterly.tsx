import type { MetricValues } from '@/modules/finances/types'
import { usLocalizedNumber } from '@/modules/shared/lib/humanization'
import { cn } from '@/modules/shared/lib/utils'
import { getKeyMetric, getShortNameForMetric } from './cell-semi-annually'

interface CellQuarterlyProps {
  quarterly: string
  isTotal?: boolean
  className?: string
  metrics: Partial<MetricValues>
  activeMetrics: string[]
}

function CellQuarterly({
  metrics,
  quarterly,
  isTotal = false,
  className,
  activeMetrics,
}: CellQuarterlyProps) {
  return (
    <div
      className={cn(
        'flex flex-1 flex-row items-center justify-center py-4',
        isTotal ? 'bg-muted w-[105px] px-0' : 'w-24 px-1',
        !isTotal &&
          'after:border-border relative after:absolute after:top-0 after:right-0 after:h-12 after:border-r after:content-[""]',
        'lg:w-[100px] lg:min-w-[100px] lg:px-1',
        isTotal && 'lg:w-36 lg:min-w-[144px] lg:px-1',
        'xl:w-[190px] xl:min-w-[190px] xl:px-0',
        isTotal && 'xl:w-40 xl:min-w-[162px] xl:px-0.5',
        '2xl:min-w-[191px] 2xl:px-0',
        isTotal && '2xl:min-w-[197px]',
        '3xl:min-w-[284px]',
        isTotal && '3xl:min-w-[285px]',
        className,
      )}
    >
      <div className="flex flex-1 flex-col items-center">
        <div className="text-foreground mb-2 text-center text-base leading-normal font-bold lg:text-xl lg:font-semibold lg:tracking-[0.4px]">
          {quarterly}
        </div>
        <div className="flex flex-col lg:w-full lg:flex-row lg:justify-center">
          {activeMetrics.map((metric, index) => (
            <div
              key={index}
              className="3xl:min-w-20 flex min-w-[77.5px] flex-col xl:min-w-[83.5px] 2xl:min-w-[93.5px]"
            >
              <div className="text-muted-foreground mb-1 text-center text-xs leading-normal font-medium lg:font-normal">
                {getShortNameForMetric(metric)}
              </div>
              <div className="text-foreground text-center text-xs leading-normal font-semibold">
                {usLocalizedNumber(metrics[getKeyMetric(metric) as keyof MetricValues] ?? 0)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { CellQuarterly }
