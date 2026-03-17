'use client'

import ReactECharts, { type EChartsOption } from 'echarts-for-react'
import { useCallback, useEffect, useMemo } from 'react'

import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import { cn } from '@/modules/shared/lib/utils'
import { useFinancesYear } from '../../../hooks/use-finaces-year'
import {
  formatterExpensesMetricChart,
  getChartAxisLabelByGranularity,
  getCorrectGranularity,
  replaceAllNumberLetOneBeforeDot,
} from '../../../lib/expenses-metric-chart-utils'
import { getExpensesMetricTooltip } from '../expenses-metric-chart-tooltip/expenses-metric-chart-tooltip'
import type {
  AnalyticMetric,
  ExpensesMetricChartSeriesData,
  GRANULARITY_OPTIONS,
  LineChartSeries,
} from '../../../types'

interface ExpensesMetricChartProps {
  year: string
  selectedGranularity: GRANULARITY_OPTIONS
  series: ExpensesMetricChartSeriesData[]
  refExpensesMetricChart: React.RefObject<EChartsOption>
  selectedMetric?: AnalyticMetric
}

function ExpensesMetricChart({
  refExpensesMetricChart,
  series,
  selectedGranularity,
  selectedMetric,
}: Readonly<ExpensesMetricChartProps>) {
  const { year } = useFinancesYear()
  const granularity = getCorrectGranularity(selectedGranularity)
  const isLessMobile = useMediaQuery({ to: 'sm' })
  const isMobile = useMediaQuery({ from: 'sm', to: 'md' })
  const isTablet = useMediaQuery({ from: 'md', to: 'lg' })
  const isDesktop1024 = useMediaQuery({ from: 'lg', to: 'xl' })
  const isDesktop1280 = useMediaQuery({ from: 'xl', to: '2xl' })
  const isDesktop1440 = useMediaQuery({ from: '2xl' })

  const isMobileOrLess = isMobile || isLessMobile
  const showLineYear =
    (isMobile || isLessMobile) && (granularity === 'monthly' || granularity === 'quarterly')

  const getHeightGrid = useCallback(() => {
    if (isLessMobile || isMobile) return 170
    if (isTablet) return 230
    if (isDesktop1024) return 225
    if (isDesktop1280) return 312
    if (isDesktop1440) return 314
    return 312
  }, [isDesktop1024, isDesktop1280, isDesktop1440, isLessMobile, isMobile, isTablet])

  const getTopGrid = useCallback(() => {
    if (isLessMobile || isMobile || isTablet) return 10
    if (isDesktop1024) return 30
    if (isDesktop1280 || isDesktop1440) return 11
    return 11
  }, [isLessMobile, isMobile, isTablet, isDesktop1024, isDesktop1280, isDesktop1440])

  const getRightGrid = useCallback(() => {
    if (isMobile) return 4
    if (isTablet || isDesktop1024) return 0
    if (isDesktop1280 || isDesktop1440) return 4
    return 4
  }, [isMobile, isTablet, isDesktop1024, isDesktop1280, isDesktop1440])

  const getMarginYAxis = useCallback(() => {
    if (isLessMobile || isMobile) return 5
    if (isTablet) return 8
    if (isDesktop1024) return 24
    if (isDesktop1280) return 30
    if (isDesktop1440) return 32
    return 36
  }, [isDesktop1024, isDesktop1280, isDesktop1440, isLessMobile, isMobile, isTablet])

  const getMarginXAxis = useCallback(() => {
    if (isMobile || isTablet) return 12
    if (isDesktop1024 || isDesktop1280 || isDesktop1440) return 16
    return 16
  }, [isMobile, isTablet, isDesktop1024, isDesktop1280, isDesktop1440])

  const getXAxisFontSize = useCallback(() => {
    if (isTablet) return 12
    if (isLessMobile) return 8
    return 9
  }, [isLessMobile, isTablet])

  const getYAxisFontSize = useCallback(() => {
    if (isLessMobile || isMobile) return 12
    return 14
  }, [isLessMobile, isMobile])

  const xAxisStyles = useMemo(
    () => ({
      fontFamily: 'var(--font-open-sans-condensed)',
      textAlign: 'center' as const,
      color: '#708390',
      fontWeight: 600,
      fontSize: getXAxisFontSize(),
      verticalAlign: 'top' as const,
      interval: 0,
    }),
    [getXAxisFontSize],
  )

  const options: EChartsOption = useMemo(
    () => ({
      tooltip: {
        borderRadius: 12,
        show: !isMobile,
        trigger: 'axis',
        extraCssText: 'z-index: 6',
        backgroundColor: 'var(--color-card)',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: '#D4D9E1',
            opacity: 0.3,
            width: 1,
          },
        },
        padding: 0,
        borderColor: 'var(--color-card)',
        borderWidth: 1,
        position: (point: [number, number]) => {
          const margin = isTablet ? 0 : 8
          const xPos = point[0] + margin
          const yPos = point[1] + margin
          return [xPos, yPos]
        },
        formatter(params: LineChartSeries[]) {
          return getExpensesMetricTooltip({
            params,
            isMobile,
            isTablet,
            isDesktop1024,
            selectedGranularity,
            selectedMetric,
            year,
          })
        },
      },
      grid: {
        height: getHeightGrid(),
        top: getTopGrid(),
        right: getRightGrid(),
      },
      xAxis: {
        show: true,
        type: 'category',
        data: getChartAxisLabelByGranularity(granularity, isMobileOrLess, false, true),
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
          symbolOffset: 'left',
          lineStyle: {
            color: 'transparent',
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          margin: getMarginXAxis(),
          color: 'var(--color-border)',
          align: 'center',
          fontFamily: 'var(--font-open-sans-condensed)',
          fontWeight: 700,
          fontSize: isMobile ? 12 : 14,
          baseline: 'top',
          interval: 0,
          formatter(value: string) {
            const formatted = formatterExpensesMetricChart(
              granularity,
              isMobile,
              year,
              value,
              isLessMobile,
            )
            return formatted
          },
          rich: {
            month: xAxisStyles,
            year: xAxisStyles,
          },
        },
      },
      yAxis: {
        min: series.length === 0 ? 0 : null,
        max: series.length === 0 ? 1 : null,
        show: true,
        axisLabel: {
          show: true,
          fontFamily: 'var(--font-open-sans-condensed)',
          margin: getMarginYAxis(),
          formatter(value: number, index: number) {
            if (value === 0 && index === 0) {
              return value.toString()
            }
            return replaceAllNumberLetOneBeforeDot(value, true)
          },
          color: 'var(--color-foreground)',
          fontSize: getYAxisFontSize(),
          fontWeight: 700,
        },
        verticalAlign: 'middle',
        type: 'value',
        zlevel: -1,
        splitNumber: 9,
        axisLine: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            color: 'var(--color-border)',
            width: 0.25,
          },
        },
      },
      series,
    }),
    [
      isMobile,
      getHeightGrid,
      getTopGrid,
      getRightGrid,
      granularity,
      isMobileOrLess,
      getMarginXAxis,
      xAxisStyles,
      series,
      getMarginYAxis,
      getYAxisFontSize,
      isTablet,
      isDesktop1024,
      selectedGranularity,
      year,
      selectedMetric,
      isLessMobile,
    ],
  )

  useEffect(() => {
    const chartInstance = refExpensesMetricChart.current?.getEchartsInstance()
    chartInstance?.setOption(options, { notMerge: true })
  }, [options, refExpensesMetricChart])

  return (
    <div
      data-slot="chart-container"
      className={cn(
        'relative flex w-full flex-row justify-center',
        'h-56 w-full',
        'md:h-67 md:w-full',
        'lg:h-72 lg:w-full lg:pl-5',
        'xl:h-89 xl:pl-0',
        '2xl:-ml-2.5 2xl:h-89',
      )}
    >
      <ReactECharts
        ref={refExpensesMetricChart}
        option={options}
        style={{
          height: '100%',
          width: '100%',
        }}
        opts={{ renderer: 'svg' }}
      />

      {showLineYear && (
        <div
          data-slot="year-x-axis"
          className={cn(
            'absolute right-1 bottom-0 left-8 h-2.5',
            'rounded-b-sm border-r border-b border-l',
            'border-border',
            !isLessMobile && 'left-10',
          )}
        >
          <div
            data-slot="year-text"
            className={cn(
              'absolute -bottom-1.5 left-1/2 w-14 -translate-x-1/2',
              'bg-background text-center text-xs font-bold tracking-wide',
              'text-border',
              'font-(--font-open-sans-condensed)',
            )}
          >
            {year}
          </div>
        </div>
      )}
    </div>
  )
}

export { ExpensesMetricChart }
