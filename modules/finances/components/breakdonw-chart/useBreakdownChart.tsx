import { useMemo, useRef, useState } from 'react'
import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import {
  getBarWidth,
  parseAnalyticsToSeriesBreakDownChart,
  setBorderRadiusForSeries,
} from './utils'
import type { BreakdownBudgetAnalytic, Budget } from '../../types'
import type { EChartsOption } from 'echarts-for-react'
interface BreakdownChartProps {
  budgetsAnalytics: BreakdownBudgetAnalytic | undefined
  budgets: Budget[]
  allBudgets: Budget[]
  year: string
  codePath: string
}

export default function useBreakdownChart({
  budgetsAnalytics,
  budgets,
  allBudgets,
  // This is a work still in progress this values are need when API is ready
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  year,
  // This is a work still in progress this values are need when API is ready
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  codePath,
}: Readonly<BreakdownChartProps>) {
  const refBreakDownChart = useRef<EChartsOption>(null)
  const [isChecked, setIsChecked] = useState(true)
  const isMobile = useMediaQuery({ to: 'sm' })
  const isTablet = useMediaQuery({ from: 'sm', to: 'lg' })
  const isDesktop1024 = useMediaQuery({ from: 'lg', to: 'xl' })
  const isDesktop1280 = useMediaQuery({ from: 'xl', to: '2xl' })

  const [inactiveSeries, setInactiveSeries] = useState<string[]>([])
  const levelNumber = codePath.split('/').length
  const barBorderRadius = isMobile ? 2 : 4

  // get this from the url using nuqs
  const selectedGranularity = 'monthly'
  const barWidth = getBarWidth(
    isMobile,
    isTablet,
    isDesktop1024,
    isDesktop1280,
    selectedGranularity,
  )
  // get this from the url using nuqs
  const selectedMetric = 'Budget'

  const allSeries = useMemo(() => {
    const seriesWithoutBorder = parseAnalyticsToSeriesBreakDownChart(
      budgetsAnalytics,
      budgets,
      barWidth,
      selectedMetric,
      allBudgets,
    )

    const series = setBorderRadiusForSeries(seriesWithoutBorder, barBorderRadius)
    // sort the series by the sum of the values in descending order
    return series.sort((a, b) => {
      const sumA = a.data.reduce((acc, cur) => acc + (cur.value ?? 0), 0)
      const sumB = b.data.reduce((acc, cur) => acc + (cur.value ?? 0), 0)
      return sumB - sumA
    })
  }, [allBudgets, barBorderRadius, barWidth, budgets, budgetsAnalytics, selectedMetric])

  const series = useMemo(() => {
    const parsedSeries = allSeries.map((item) => {
      if (inactiveSeries.includes(item.name)) {
        return {
          ...item,
          isVisible: false,
          itemStyle: {
            ...item.itemStyle,
            colorOriginal: '#ccc',
          },
          data: item.data.map(() => ({
            value: 0, // set value to 0 to hide the bar
            itemStyle: { borderRadius: [0, 0, 0, 0] },
          })),
        }
      }

      return item
    })

    return setBorderRadiusForSeries(parsedSeries, barBorderRadius)
  }, [allSeries, barBorderRadius, inactiveSeries])

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
    const chartInstance = refBreakDownChart.current?.getEchartsInstance()
    chartInstance?.dispatchAction({
      type: 'highlight',
      seriesName: legendName,
    })
  }

  const onLegendItemLeave = (legendName: string) => {
    const chartInstance = refBreakDownChart.current?.getEchartsInstance()
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
    refBreakDownChart,
    showLegendValue,
  }
}
