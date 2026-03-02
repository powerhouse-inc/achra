'use client'

import ReactECharts, { type EChartsOption } from 'echarts-for-react'
import { useCallback, useEffect, useMemo } from 'react'

import {
  formatterBreakdownChart,
  getChartAxisLabelByGranularity,
  getCorrectGranularity,
  getMonthAbbreviationToolTip,
  getSelectMetricText,
  replaceAllNumberLetOneBeforeDot,
} from '@/modules/finances/lib/breakdown-chart-utils'
import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import { usLocalizedNumber } from '@/modules/shared/lib/humanization'
import { cn } from '@/modules/shared/lib/utils'
import { useFinancesYear } from '../../hooks/use-finaces-year'
import { formatBudgetName, removeBudgetWord } from '../../utils'
import type {
  AnalyticMetric,
  BarChartSeries,
  BreakdownChartSeriesData,
  GRANULARITY_OPTIONS,
} from '../../types'

interface BreakdownChartProps {
  year: string
  selectedGranularity: GRANULARITY_OPTIONS
  series: BreakdownChartSeriesData[]
  refBreakDownChart: React.RefObject<EChartsOption>
  selectedMetric?: AnalyticMetric
}

export function BreakdownChart({
  refBreakDownChart,
  series,
  selectedGranularity,
  selectedMetric,
}: Readonly<BreakdownChartProps>) {
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

  // Values for the grid
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
          type: 'shadow',
          shadowStyle: {
            color: '#D4D9E1',
            opacity: 0.15,
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
        formatter(params: BarChartSeries[]) {
          // If all values are zero, don't show tooltip
          if (params.every((item) => item.value === 0)) {
            return ''
          }

          const filteredParams = params.filter(
            (item) => item.value !== 0 && Math.abs(item.value) > 0.004,
          )

          const shortAmount = params.length > 10
          const flexDirection = shortAmount ? 'row' : 'column'
          const wrap = shortAmount ? 'flex-wrap:wrap;' : ''
          const gap = shortAmount ? '16px' : '12px'

          const minMaxValues = {
            tablet: 'max-width:300px',
            desktop1024: 'max-width:400px',
            default: 'min-width:190px;max-width:450px',
          }

          let minMax: string
          if (isTablet) {
            minMax = minMaxValues.tablet
          } else if (isDesktop1024) {
            minMax = minMaxValues.desktop1024
          } else {
            minMax = minMaxValues.default
          }

          const maxWithTableValues = {
            tablet: 'max-width:190px',
            desktop1024: 'max-width:450px',
            default: '',
          }

          let maxWithTable: string
          if (isTablet) {
            maxWithTable = maxWithTableValues.tablet
          } else if (isDesktop1024) {
            maxWithTable = maxWithTableValues.desktop1024
          } else {
            maxWithTable = maxWithTableValues.default
          }

          return `
            <div style="border-radius:12px;background-color:var(--color-card);box-shadow:var(--shadow-md);padding:16px;overflow:auto; font-family:var(--font-inter) ,sans-serif">
              <div style="margin-bottom:16px;font-size:12px;font-weight:600;color:#B6BCC2">${
                (selectedGranularity as string) === 'Annually'
                  ? year
                  : getMonthAbbreviationToolTip(filteredParams[0]?.dataIndex ?? 0)
              }<span style="display:inline-block;margin-left:4px">${getSelectMetricText(
                selectedMetric,
              )}</span></div>
              <div style="display:flex;flex-direction:${flexDirection};gap:${gap};${wrap}${minMax}">
                ${filteredParams
                  .reverse()
                  .map(
                    (item) =>
                      `<div style="display: flex;align-items:center;gap: 6px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="${isMobile ? 13 : 16}" height="${
                          isMobile ? 13 : 16
                        }" viewBox="0 0 13 13" fill="none" style="min-width:${isMobile ? 13 : 16};min-height:${
                          isMobile ? 13 : 16
                        }">
                          <circle cx="6.5" cy="6.5" r="5.5" stroke="${item.color}" />
                          <circle cx="6.5" cy="6.5" r="4" fill="${item.color}" />
                        </svg>
                        <span style="display: inline-block;font-size:14px;color:var(--color-muted-foreground);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;${maxWithTable}"> ${removeBudgetWord(
                          formatBudgetName(item.seriesName),
                        )}:</span>
                        <span style="font-size:16px;font-weight:700;color:var(--color-foreground)
                  };display: inline-block;">${usLocalizedNumber(item.value, 2)}</span>
                      </div>`,
                  )
                  .join('')}
              </div>
            </div>
      `
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
            const formatted = formatterBreakdownChart(
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
    // avoid to merge data when moving between levels
    const chartInstance = refBreakDownChart.current?.getEchartsInstance()
    chartInstance?.setOption(options, { notMerge: true })
  }, [options, refBreakDownChart])
  return (
    <div
      data-slot="chart-container"
      className={cn(
        'relative flex w-full flex-row justify-center',
        'h-[227px] w-full',
        'md:h-[268px] md:w-full',
        'lg:h-[288px] lg:w-full lg:pl-5',
        'xl:h-[356px] xl:pl-0',
        '2xl:ml-[-10px] 2xl:h-[356px]',
      )}
    >
      <ReactECharts
        ref={refBreakDownChart}
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
            'absolute right-[5px] bottom-0 left-[30px] h-[11px]',
            'rounded-b-sm border-r border-b border-l',
            'border-border',
            !isLessMobile && 'left-10',
          )}
        >
          <div
            data-slot="year-text"
            className={cn(
              'absolute bottom-[-6px] left-1/2 w-[52px] -translate-x-1/2',
              'bg-background text-center text-xs font-bold tracking-[1px]',
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
