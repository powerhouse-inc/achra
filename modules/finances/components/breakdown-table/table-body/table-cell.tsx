import type { MetricValues } from '@/modules/finances/types'
import { usLocalizedNumber } from '@/modules/shared/lib/humanization'
import { getKeyMetric } from '../table-header/cell-semi-annually'
import { filterMetricValues } from '../utils'
import { LinkCell } from './link-cell'

interface TableCellProps {
  metrics: string[]
  value: MetricValues
  href: string
  isSummaryRow?: boolean
}

function TableCell({ metrics, value, href, isSummaryRow }: TableCellProps) {
  const filteredData = filterMetricValues(value, metrics)

  return (
    <td className="border-border relative border-r px-2 py-4 text-center text-xs xl:px-5">
      <LinkCell href={href} isSummaryRow={isSummaryRow}>
        <div className="flex flex-row items-center justify-center gap-0">
          {metrics.map((metric, index) => {
            const key = getKeyMetric(metric) as keyof MetricValues
            const numValue = filteredData[key] ?? 0
            return (
              <span
                key={index}
                className="text-foreground min-w-[77.5px] text-center xl:min-w-[83.5px] 2xl:min-w-[80px]"
              >
                {usLocalizedNumber(numValue, 0)}
              </span>
            )
          })}
        </div>
      </LinkCell>
    </td>
  )
}

export { TableCell }
