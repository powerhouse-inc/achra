import { renderToStaticMarkup } from 'react-dom/server'
import { usLocalizedNumber } from '@/modules/shared/lib/humanization'
import { cn } from '@/modules/shared/lib/utils'
import {
  getMonthAbbreviationToolTip,
  getSelectMetricText,
} from '../../../lib/expenses-metric-chart-utils'
import { formatBudgetName, removeBudgetWord } from '../../../utils'
import type { AnalyticMetric, GRANULARITY_OPTIONS, LineChartSeries } from '../../../types'

interface ExpensesMetricTooltipProps {
  params: LineChartSeries[]
  isMobile: boolean
  isTablet: boolean
  isDesktop1024: boolean
  selectedGranularity: GRANULARITY_OPTIONS
  selectedMetric?: AnalyticMetric
  year: string
}

interface TooltipContentProps {
  filteredParams: LineChartSeries[]
  isMobile: boolean
  isTablet: boolean
  isDesktop1024: boolean
  selectedGranularity: GRANULARITY_OPTIONS
  selectedMetric?: AnalyticMetric
  year: string
}

function TooltipContent({
  filteredParams,
  isMobile,
  isTablet,
  isDesktop1024,
  selectedGranularity,
  selectedMetric,
  year,
}: Readonly<TooltipContentProps>) {
  const shortAmount = filteredParams.length > 10
  const title =
    (selectedGranularity as string) === 'Annually'
      ? year
      : getMonthAbbreviationToolTip(filteredParams[0]?.dataIndex ?? 0)

  return (
    <div className="bg-card rounded-xl p-4 shadow-md">
      <div className="mb-4 text-xs font-semibold text-[#B6BCC2]">
        {title}
        <span className="ml-1 inline-block">{getSelectMetricText(selectedMetric)}</span>
      </div>

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

function getExpensesMetricTooltip({
  params,
  isMobile,
  isTablet,
  isDesktop1024,
  selectedGranularity,
  selectedMetric,
  year,
}: Readonly<ExpensesMetricTooltipProps>) {
  if (params.every((item) => item.value === 0)) {
    return ''
  }

  const filteredParams = params.filter((item) => item.value !== 0 && Math.abs(item.value) > 0.004)

  if (filteredParams.length === 0) {
    return ''
  }

  return renderToStaticMarkup(
    <TooltipContent
      filteredParams={filteredParams}
      isMobile={isMobile}
      isTablet={isTablet}
      isDesktop1024={isDesktop1024}
      selectedGranularity={selectedGranularity}
      selectedMetric={selectedMetric}
      year={year}
    />,
  )
}

export { getExpensesMetricTooltip }
