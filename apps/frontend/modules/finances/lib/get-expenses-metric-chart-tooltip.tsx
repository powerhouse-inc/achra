import { renderToStaticMarkup } from 'react-dom/server'
import { ExpensesMetricChartTooltip } from '@/modules/finances/components/expenses-metric-chart/expenses-metric-chart-tooltip'
import type { CumulativeType } from '@/modules/finances/lib/expenses-metric-chart-search-params'
import type { GRANULARITY_OPTIONS, LineChartSeries } from '@/modules/finances/types'

interface ExpensesMetricTooltipProps {
  params: LineChartSeries[]
  isMobile: boolean
  isTablet: boolean
  isDesktop1024: boolean
  selectedGranularity: GRANULARITY_OPTIONS
  isCumulative: boolean
  cumulativeType: CumulativeType
  year: string
}

function getExpensesMetricTooltip({
  params,
  isMobile,
  isTablet,
  isDesktop1024,
  selectedGranularity,
  isCumulative,
  cumulativeType,
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
    <ExpensesMetricChartTooltip
      filteredParams={filteredParams}
      isMobile={isMobile}
      isTablet={isTablet}
      isDesktop1024={isDesktop1024}
      selectedGranularity={selectedGranularity}
      isCumulative={isCumulative}
      cumulativeType={cumulativeType}
      year={year}
    />,
  )
}

export { getExpensesMetricTooltip }
