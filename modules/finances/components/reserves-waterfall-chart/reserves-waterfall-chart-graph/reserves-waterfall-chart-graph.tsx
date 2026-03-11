'use client'

import ReactECharts, { type EChartsOption } from 'echarts-for-react'
import { useEffect, useMemo, useRef } from 'react'
import { replaceAllNumberLetOneBeforeDot } from '@/modules/finances/lib/expenses-metric-chart-utils'
import {
  formatterReservesWaterfallChart,
  getReservesWaterfallXAxisRichStyles,
  getWaterfallAxisLabels,
} from '@/modules/finances/lib/reserves-waterfall-chart-utils'
import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import { cn } from '@/modules/shared/lib/utils'
import { LegendItem } from './legend-item'

interface ReservesWaterfallChartGraphProps {
  year: string
  selectedGranularity: 'monthly' | 'quarterly' | 'annual'
  series: NonNullable<EChartsOption['series']>
}

function ReservesWaterfallChartGraph({
  year,
  selectedGranularity,
  series,
}: Readonly<ReservesWaterfallChartGraphProps>) {
  const chartRef = useRef<ReactECharts>(null)

  const isLessMobile = useMediaQuery({ to: 'sm' })
  const isMobile = useMediaQuery({ from: 'sm', to: 'md' })
  const isTablet = useMediaQuery({ from: 'md', to: 'lg' })
  const isDesktop1024 = useMediaQuery({ from: 'lg', to: 'xl' })

  const isMobileOrLess = isMobile || isLessMobile
  const showLineYear =
    isMobileOrLess && (selectedGranularity === 'monthly' || selectedGranularity === 'quarterly')
  const axisLabels = useMemo(
    () => getWaterfallAxisLabels(selectedGranularity, isMobileOrLess),
    [isMobileOrLess, selectedGranularity],
  )
  const xAxisRichStyles = useMemo(() => getReservesWaterfallXAxisRichStyles(isMobile), [isMobile])

  const yAxisMax = useMemo(() => {
    let maxValue = 0

    for (const serie of series) {
      if (!serie || typeof serie !== 'object' || !('data' in serie)) continue
      const serieData = serie.data
      if (!Array.isArray(serieData)) continue

      for (const point of serieData) {
        if (typeof point === 'number') {
          if (point > maxValue) maxValue = point
          continue
        }

        if (
          point &&
          typeof point === 'object' &&
          'value' in point &&
          typeof point.value === 'number'
        ) {
          if (point.value > maxValue) maxValue = point.value
        }
      }
    }

    if (maxValue === 0) return undefined
    return Math.ceil(maxValue * 1.14)
  }, [series])

  const options: EChartsOption = useMemo(
    () => ({
      tooltip: { show: false },
      grid: {
        containLabel: true,
        height: isLessMobile || isMobile ? 170 : isTablet ? 230 : isDesktop1024 ? 225 : 312,
        top: isLessMobile || isMobile || isTablet ? 10 : isDesktop1024 ? 30 : 11,
        right: isLessMobile ? 28 : isMobile ? 36 : isTablet ? 48 : isDesktop1024 ? 56 : 64,
        left: isMobileOrLess ? 24 : isTablet ? 30 : 40,
      },
      xAxis: {
        type: 'category',
        data: axisLabels,
        splitLine: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          margin: isMobile ? 12 : 16,
          color: 'color-mix(in srgb, var(--color-foreground) 70%, transparent)',
          align: 'center',
          fontFamily: 'var(--font-open-sans-condensed)',
          fontWeight: 700,
          fontSize: isMobile ? 12 : 14,
          interval: 0,
          padding: [0, 5, 0, 5],
          formatter: (value: string, index: number) =>
            formatterReservesWaterfallChart({
              axisLabels,
              isMobileOrLess,
              year,
              value,
              index,
            }),
          rich: xAxisRichStyles,
        },
      },
      yAxis: {
        min: 0,
        max: yAxisMax,
        show: true,
        axisLabel: {
          show: true,
          fontFamily: 'var(--font-open-sans-condensed)',
          margin: isMobileOrLess ? 6 : 12,
          formatter(value: number, index: number) {
            if (value === 0 && index === 0) return value.toString()
            return replaceAllNumberLetOneBeforeDot(value, true)
          },
          color: 'var(--color-foreground)',
          fontSize: isMobileOrLess ? 12 : 14,
          fontWeight: 700,
        },
        type: 'value',
        splitNumber: 9,
        axisLine: { show: false },
        splitLine: {
          lineStyle: {
            color: 'var(--color-border)',
            width: 1,
          },
        },
      },
      series,
    }),
    [
      isDesktop1024,
      isLessMobile,
      isMobile,
      isMobileOrLess,
      isTablet,
      axisLabels,
      xAxisRichStyles,
      series,
      year,
      yAxisMax,
    ],
  )

  useEffect(() => {
    chartRef.current?.getEchartsInstance().setOption(options, { notMerge: true })
  }, [options])

  return (
    <div className="flex w-full flex-col items-center">
      <div
        className={cn(
          'relative flex w-full flex-row justify-center',
          'h-57 md:h-67 lg:h-72 xl:h-89 2xl:h-89',
        )}
      >
        <ReactECharts
          ref={chartRef}
          option={options}
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'svg' }}
        />
        {showLineYear && (
          <div className="border-border absolute right-1.5 bottom-0 left-8 h-3 rounded-b-sm border-r border-b border-l">
            <div className="bg-background text-border absolute -bottom-1.5 left-1/2 w-13 -translate-x-1/2 text-center text-xs font-(--font-open-sans-condensed) tracking-wide">
              {year}
            </div>
          </div>
        )}
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-4 md:gap-8">
        <LegendItem color="#329DFF" label="Reserves Balance" />
        <LegendItem color="#EA4335" label="Outflow" />
        <LegendItem color="#34A853" label="Inflow" />
      </div>
    </div>
  )
}
export { ReservesWaterfallChartGraph }
