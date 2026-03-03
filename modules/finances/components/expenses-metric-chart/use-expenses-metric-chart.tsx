import { parseAsStringEnum, useQueryState } from 'nuqs'
import { useMemo, useRef, useState } from 'react'
import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import { type Budget, GRANULARITY_OPTIONS, METRIC_OPTIONS } from '../../types'
import { getMetricValue, parseAnalyticsToSeriesExpensesMetricChart } from './utils'
import type { ExpensesMetricBudgetAnalytic } from './types'
import type { EChartsOption } from 'echarts-for-react'
interface ExpensesMetricChartProps {
  budgetsAnalytics: ExpensesMetricBudgetAnalytic | undefined
  budgets: Budget[]
  allBudgets: Budget[]
  codePath: string
}

export function useExpensesMetricChart({
  budgetsAnalytics,
  budgets,
  allBudgets,
  codePath,
}: Readonly<ExpensesMetricChartProps>) {
  const refExpensesMetricChart = useRef<EChartsOption>(null)
  const [selectedGranularity] = useQueryState(
    'granularity',
    parseAsStringEnum(Object.values(GRANULARITY_OPTIONS)).withDefault(GRANULARITY_OPTIONS.Monthly),
  )
  const [selectedMetric] = useQueryState(
    'metric',
    parseAsStringEnum(Object.values(METRIC_OPTIONS)).withDefault(METRIC_OPTIONS.Budget),
  )

  const [isChecked, setIsChecked] = useState(true)
  const isMobile = useMediaQuery({ to: 'sm' })

  const [inactiveSeries, setInactiveSeries] = useState<string[]>([])
  const levelNumber = codePath.split('/').length

  const selectedMetricAnalytic = getMetricValue(selectedMetric)
  const selectedMetricLabel =
    selectedMetric === METRIC_OPTIONS.NetExpensesOnChain
      ? 'Net Expenses On-chain'
      : selectedMetric === METRIC_OPTIONS.NetProtocolOutflow
        ? 'Net Protocol Outflow'
        : selectedMetric

  const allSeries = useMemo(() => {
    return parseAnalyticsToSeriesExpensesMetricChart(budgetsAnalytics, budgets, allBudgets)
  }, [allBudgets, budgets, budgetsAnalytics])

  const series = useMemo(() => {
    const parsedSeries = allSeries.map((item) => {
      const isSelectedMetric = item.name === selectedMetricLabel
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
          data: item.data.map(() => ({
            value: null,
          })),
        }
      }

      return {
        ...item,
        lineStyle: {
          ...item.lineStyle,
          width: isSelectedMetric ? 3 : 2,
          opacity: isSelectedMetric ? 1 : 0.35,
        },
        itemStyle: {
          ...item.itemStyle,
          opacity: isSelectedMetric ? 1 : 0.35,
        },
      }
    })

    return parsedSeries
  }, [allSeries, inactiveSeries, selectedMetricLabel])

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
    selectedMetric: selectedMetricAnalytic,
  }
}
