import type { CumulativeType } from '@/modules/finances/lib/expenses-metric-chart-search-params'
import { getMonthAbbreviationToolTip } from '@/modules/finances/lib/expenses-metric-chart-utils'
import type { GRANULARITY_OPTIONS, LineChartSeries } from '@/modules/finances/types'
import { formatBudgetName, removeBudgetWord } from '@/modules/finances/utils'
import { usLocalizedNumber } from '@/shared/lib/humanization'
import { cn } from '@/shared/lib/utils'

interface ExpensesMetricChartTooltipProps {
  filteredParams: LineChartSeries[]
  isMobile: boolean
  isTablet: boolean
  isDesktop1024: boolean
  selectedGranularity: GRANULARITY_OPTIONS
  isCumulative: boolean
  cumulativeType: CumulativeType
  year: string
}

function ExpensesMetricChartTooltip({
  filteredParams,
  isMobile,
  isTablet,
  isDesktop1024,
  selectedGranularity,
  isCumulative,
  cumulativeType,
  year,
}: Readonly<ExpensesMetricChartTooltipProps>) {
  const shortAmount = filteredParams.length > 10
  const title =
    (selectedGranularity as string) === 'Annually'
      ? year
      : getMonthAbbreviationToolTip(filteredParams[0]?.dataIndex ?? 0)

  return (
    <div className="bg-card rounded-xl p-4 shadow-md">
      <div className="mb-4 text-xs font-semibold text-[#B6BCC2]">{title}</div>
      {isCumulative && (
        <div className="text-muted-foreground mb-4 text-[11px] font-light uppercase">
          {cumulativeType} cumulative
        </div>
      )}

      <div
        className={cn(
          'flex',
          shortAmount ? 'flex-row flex-wrap gap-4' : 'flex-col gap-3',
          isTablet ? 'max-w-80' : isDesktop1024 ? 'max-w-96' : 'max-w-md min-w-48',
        )}
      >
        {[...filteredParams].reverse().map((item) => (
          <div key={`${item.seriesName}-${item.value}`} className="flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={isMobile ? 13 : 16}
              height={isMobile ? 13 : 16}
              viewBox="0 0 13 13"
              fill="none"
              className="shrink-0"
            >
              <circle cx="6.5" cy="6.5" r="5.5" stroke={item.color} />
              <circle cx="6.5" cy="6.5" r="4" fill={item.color} />
            </svg>

            <span
              className={cn(
                'text-muted-foreground inline-block truncate text-sm whitespace-nowrap',
                isTablet ? 'max-w-48' : isDesktop1024 ? 'max-w-md' : undefined,
              )}
            >
              {removeBudgetWord(formatBudgetName(item.seriesName))}:
            </span>

            <span className="text-foreground inline-block text-base font-bold">
              {usLocalizedNumber(item.value, 2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export { ExpensesMetricChartTooltip }
