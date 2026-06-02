import { useQueryStates } from 'nuqs'
import { useCallback, useMemo, useRef, useState } from 'react'
import { useMediaQuery } from '@/shared/hooks/use-media-query'
import {
  type CumulativeType,
  expensesMetricChartFiltersConfig,
} from '../../lib/expenses-metric-chart-search-params'
import { parseAnalyticsToSeriesExpensesMetricChart } from '../../lib/expenses-metric-chart-utils'
import { type Budget, type ExpensesMetricBudgetAnalytic, GRANULARITY_OPTIONS } from '../../types'
import type { EChartsOption } from 'echarts-for-react'

interface ExpensesMetricChartProps {
  budgetsAnalytics: ExpensesMetricBudgetAnalytic | undefined
  budgets: Budget[]
  allBudgets: Budget[]
  codePath: string
}

function useExpensesMetricChart({
  budgetsAnalytics,
  budgets,
  allBudgets,
  codePath,
}: Readonly<ExpensesMetricChartProps>) {
  const refExpensesMetricChart = useRef<EChartsOption>(null)
  const [filters, setFilters] = useQueryStates(expensesMetricChartFiltersConfig)
  const selectedGranularity = filters.granularity
  const isCumulative = filters.cumulative === 'true'
  const cumulativeType = filters.cumulativeType

  const [isChecked, setIsChecked] = useState(true)
  const isMobile = useMediaQuery({ to: 'sm' })

  const [inactiveSeries, setInactiveSeries] = useState<string[]>([])
  const levelNumber = codePath.split('/').length

  const allSeries = useMemo(() => {
    return parseAnalyticsToSeriesExpensesMetricChart(budgetsAnalytics, budgets, allBudgets, {
      isCumulative,
      cumulativeType,
    })
  }, [allBudgets, budgets, budgetsAnalytics, cumulativeType, isCumulative])

  const series = useMemo(() => {
    const parsedSeries = allSeries.map((item) => {
      if (inactiveSeries.includes(item.name)) {
        return {
          ...item,
          isVisible: false,
          itemStyle: {
            ...item.itemStyle,
            color: '#ccc',
            colorOriginal: '#ccc',
          },
          lineStyle: {
            ...item.lineStyle,
            color: '#ccc',
            colorOriginal: '#ccc',
          },
          data: item.data.map((point) => ({
            ...point,
            value: null,
          })),
        }
      }

      return {
        ...item,
        lineStyle: {
          ...item.lineStyle,
          width: 2,
          opacity: 1,
        },
        itemStyle: {
          ...item.itemStyle,
          opacity: 1,
        },
      }
    })

    return parsedSeries
  }, [allSeries, inactiveSeries])

  const handleSelectGranularity = useCallback(
    (granularity: GRANULARITY_OPTIONS) => {
      void setFilters({ granularity })
    },
    [setFilters],
  )

  const handleChangeCumulativeType = useCallback(
    (value: CumulativeType) => {
      void setFilters({
        cumulative: 'true',
        cumulativeType: value,
      })
    },
    [setFilters],
  )

  const handleToggleCumulative = useCallback(() => {
    void setFilters({
      cumulative: isCumulative ? 'false' : 'true',
      cumulativeType: 'relative',
    })
  }, [isCumulative, setFilters])

  const onReset = useCallback(() => {
    void setFilters({
      granularity: GRANULARITY_OPTIONS.Monthly,
      cumulative: 'false',
      cumulativeType: 'relative',
    })
  }, [setFilters])

  const isResetDisabled =
    selectedGranularity === GRANULARITY_OPTIONS.Monthly &&
    !isCumulative &&
    cumulativeType === 'relative'

  const handleToggleSeries = (toggleSeries: string) => {
    setInactiveSeries(
      inactiveSeries.includes(toggleSeries)
        ? inactiveSeries.filter((series) => series !== toggleSeries)
        : [...inactiveSeries, toggleSeries],
    )
  }

  const handleChangeSwitch = () => {
    if (!isChecked && inactiveSeries.length > 0) {
      setInactiveSeries([])
    } else {
      setInactiveSeries([...allSeries.map((series) => series.name)])
    }
    setIsChecked(!isChecked)
  }

  const onLegendItemHover = (legendName: string) => {
    const chartInstance = refExpensesMetricChart.current?.getEchartsInstance()
    chartInstance?.dispatchAction({
      type: 'highlight',
      seriesName: legendName,
    })
  }

  const onLegendItemLeave = (legendName: string) => {
    const chartInstance = refExpensesMetricChart.current?.getEchartsInstance()
    chartInstance?.dispatchAction({
      type: 'downplay',
      seriesName: legendName,
    })
  }

  const showScrollAndToggle = isMobile ? series.length > 6 : series.length > 8
  const showLegendValue = levelNumber <= 2

  return {
    series,
    showScrollAndToggle,
    handleToggleSeries,
    handleChangeSwitch,
    isChecked,
    onLegendItemHover,
    onLegendItemLeave,
    refExpensesMetricChart,
    showLegendValue,
    selectedGranularity,
    isCumulative,
    cumulativeType,
    handleSelectGranularity,
    handleChangeCumulativeType,
    handleToggleCumulative,
    onReset,
    isResetDisabled,
  }
}

export { useExpensesMetricChart }
