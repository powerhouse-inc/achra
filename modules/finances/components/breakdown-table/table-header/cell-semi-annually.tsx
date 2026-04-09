import type { MetricValues } from '@/modules/finances/types'
import { usLocalizedNumber } from '@/modules/shared/lib/humanization'
import { cn } from '@/modules/shared/lib/utils'

export function getShortNameForMetric(metric: string): string {
  if (metric === 'Net Expenses On-Chain') {
    return 'On-Chain'
  }
  if (metric === 'Net Expenses Off-chain') {
    return 'Off-chain'
  }
  if (metric === 'Net Protocol Outflow') {
    return 'Prtcol Outfl'
  }
  return metric
}

export function getKeyMetric(metric: string): string {
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

interface SemiAnnualCellProps {
  semiannual: string
  isTotal?: boolean
  className?: string
  metrics: Partial<MetricValues>
  activeMetrics: string[]
}

function SemiAnnualCell({
  metrics,
  semiannual,
  isTotal = false,
  className,
  activeMetrics,
}: SemiAnnualCellProps) {
  return (
    <div
      className={cn(
        'flex flex-1 flex-row items-center justify-center',
        isTotal && 'bg-muted -my-2',
        !isTotal && 'w-[78px]',
        isTotal && 'w-[71px]',
        'not-last-of-type:after:border-border not-last-of-type:after:relative not-last-of-type:after:block not-last-of-type:after:h-12 not-last-of-type:after:border-l not-last-of-type:after:content-[""]',
        className,
      )}
    >
      <div className="flex flex-1 flex-col items-center">
        <div className="text-foreground mb-2 text-sm leading-[22px] font-semibold">
          {semiannual}
        </div>
        <div className="flex flex-col">
          {activeMetrics.map((metric) => (
            <div key={metric} className="flex min-w-[70px] flex-col">
              <div className="text-muted-foreground mb-1 text-center text-xs font-normal">
                {getShortNameForMetric(metric)}
              </div>
              <div className="text-foreground text-center text-xs leading-[18px] font-semibold">
                {usLocalizedNumber(metrics[getKeyMetric(metric) as keyof MetricValues] ?? 0)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { SemiAnnualCell }
