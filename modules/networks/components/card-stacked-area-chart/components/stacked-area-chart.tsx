'use client'
import ReactECharts, { type EChartsOption } from 'echarts-for-react'
import { useTheme } from 'next-themes'
import { useRef } from 'react'
import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import { cn } from '@/modules/shared/lib/utils'
import { formatNumberToShortScale } from '../../finances-section/utils'
import { getLegendSeries } from '../utils'
import type { BarChartSeries } from '../../card-bar-chart/types'

import type { StackedAreaSeries } from '../type'

interface StackedAreaChartProps {
  years: string[]
  series: StackedAreaSeries[]
}

function StackedAreaChart({ years, series }: StackedAreaChartProps) {
  const financesLineChartRef = useRef<EChartsOption>(null)
  const { theme } = useTheme()
  const isLightMode = theme === 'light'

  const isMobile = useMediaQuery({ to: 'sm' })
  const isTablet640 = useMediaQuery({ from: 'sm', to: 'md' })
  const isTable760 = useMediaQuery({ from: 'md', to: 'lg' })
  const isDesk1024 = useMediaQuery({ from: 'lg', to: 'xl' })
  const isDesk1280 = useMediaQuery({ from: 'xl', to: '2xl' })
  const isDesk1440 = useMediaQuery({ from: '2xl' })

  const options: EChartsOption = {
    grid: {
      top: 8,
      right: 10,
      bottom: 40,
      left: isTablet640 || isTable760 ? 40 : isDesk1280 ? 50 : isDesk1440 ? 50 : 40,
      width:
        isMobile || isTablet640
          ? 'calc(100% - 50px)'
          : isTable760
            ? 330
            : isDesk1024
              ? 470
              : isDesk1280
                ? 595
                : 645,
    },
    tooltip: {
      show: !isMobile,
      trigger: 'axis',
      borderRadius: 12,
      backgroundColor: 'var(--color-muted)',
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          opacity: 0.3,
        },
      },
      padding: 0,
      borderColor: 'var(--color-muted)',
      position: (
        point: number[],
        params: EChartsOption,
        dom: HTMLElement,
        rect: DOMRect,
        size: {
          contentSize: [number, number]
          viewSize: [number, number]
        },
      ) => {
        const tooltipWidth = size.contentSize[0]
        const containerWidth = size.viewSize[0]
        const margin = isTablet640 || isTable760 ? 0 : 8

        let xPos = point[0]
        const yPos = point[1] + margin

        if (isDesk1280 || isDesk1440) {
          if (xPos + tooltipWidth + margin > containerWidth) {
            xPos -= tooltipWidth + margin / 4
          } else {
            xPos += margin
          }
        } else {
          xPos += margin
        }

        return [xPos, yPos]
      },

      formatter: (params: BarChartSeries[]) => {
        const paramsArray = params as Array<{
          value: number
          color: string
          seriesName: string
          name: string
        }>
        const shortAmount = paramsArray.length > 10
        const flexDirection = shortAmount ? 'row' : 'column'
        const gap = 8
        if (paramsArray.every((item) => item.value === 0)) {
          return ''
        }
        const noZeroValues = paramsArray.filter((item) => item.value !== 0)
        return `
          <div style="background-color:var(--popover);box-shadow:none;padding:8px 16px;min-width:194px;overflow:auto;border-radius:12px; font-family:Inter,sans-serif">
            <div style="margin-bottom:8px;font-size:16px;font-weight:600;color:var(--color-muted-foreground);line-height:24px;">${noZeroValues[0]?.name}</div>
            <div style="display:flex;flex-direction:${flexDirection};gap:${gap}px;min-width:194px;max-width:450px;flex-wrap:wrap;">
              ${noZeroValues
                .reverse()
                .map(
                  (item) =>
                    `<div style="display: flex;align-items:center;gap: 4px">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 13 13" fill="none">
                    <circle cx="6.5" cy="6.5" r="4" fill="${item.color}" />
                  </svg>
                  <span style="font-size:14px;font-weight:600;line-height:22px;color:var(--color-muted-foreground);max-width:350px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${item.seriesName}:</span>
                  <span style="font-size:14px;margin-left:4px;font-weight:600;line-height:22px;color:var(--color-foreground)">${item.value.toLocaleString()}</span>
                </div>`,
                )
                .join('')}
            </div>
          </div>
          `
      },
    },
    xAxis: {
      data: getLegendSeries(years),
      axisLine: {
        lineStyle: {
          color: 'var(--color-input)',
        },
      },
      axisTick: { show: false },
      axisLabel: {
        margin: 4,
        fontFamily: 'Open Sans Condensed, sans-serif',
        fontWeight: 700,
        fontSize: isMobile || isTablet640 ? 10 : isTable760 ? 12 : 14,
        lineHeight: 18,
        color: 'var(--color-muted-foreground)',
        interval: 0,
        formatter: (value: string) => {
          const [quarterly, year] = value.split('-')
          if (year) {
            return `{quarterly|${quarterly}}\n{year|${year}}`
          }
          if (quarterly === 'Q2') {
            return `{quarterlyQ2|${quarterly}}`
          }
          return quarterly
        },
        rich: {
          quarterly: {
            verticalAlign: 'top',
            fontSize: isMobile || isTablet640 ? 10 : isTable760 ? 12 : 14,
            fontWeight: 700,
            lineHeight: 22,
            interval: 0,
            padding:
              isMobile || isTablet640
                ? [3, -1, 20, 12]
                : isTable760
                  ? [2, 4, 20, 20]
                  : [2, 0, 20, 20],
            fontFamily: 'Open Sans Condensed, sans-serif',
            color: 'var(--color-muted-foreground)',
            backgroundColor: {
              image: isLightMode ? '/chart/line.png' : '/chart/line_dark.png',
            },
          },
          year: {
            fontSize: isMobile || isTablet640 ? 10 : isTable760 ? 12 : 14,
            fontFamily: 'Open Sans Condensed, sans-serif',
            fontWeight: 700,
            color: 'var(--color-foreground)',
            lineHeight: 22,
            padding:
              isMobile || isTablet640
                ? [0, -4, 10, 20]
                : isTable760
                  ? [0, 4, 10, 32]
                  : [0, 0, 10, 32],
          },
          quarterlyQ2: {
            fontSize: isMobile || isTablet640 ? 10 : isTable760 ? 12 : 14,
            fontFamily: 'Open Sans Condensed, sans-serif',
            fontWeight: 700,
            color: 'var(--color-muted-foreground)',
            lineHeight: 22,
            padding:
              isMobile || isTablet640
                ? [4, 14, 10, 20]
                : isTable760
                  ? [5, 12, 10, 20]
                  : [4, 14, 10, 20],
          },
        },
      },
      boundaryGap: false,
      splitLine: {
        show: true,
        lineStyle: {
          color: 'var(--color-muted-foreground)',
          type: 'line',
          width: 1,
        },
      },
    },
    yAxis: {
      splitLine: {
        lineStyle: {
          type: 'line',
          color: 'var(--color-muted-foreground)',
        },
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'var(--color-muted-foreground)',
        },
      },
      axisLabel: {
        width: 48,
        margin: 16,
        fontFamily: 'Open Sans Condensed, sans-serif',
        fontWeight: 700,
        fontSize: isMobile ? 12 : 14,
        lineHeight: isMobile ? 16 : 19,
        color: 'var(--color-foreground)',
        formatter: (value: number, index: number) => {
          if (value === 0 && index === 0) {
            return value.toString()
          }
          return formatNumberToShortScale(value, true)
        },
      },
    },
    series,
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row xl:flex-col xl:gap-[14px]">
      <div
        className={cn(
          'relative flex flex-col items-center justify-center sm:mt-0',
          'h-[288px] w-full min-w-[327px]',
          'sm:h-[280px] sm:w-[337px] sm:min-w-[337px]',
          'md:h-[280px] md:w-[385px] md:min-w-[385px]',
          'lg:h-[296px] lg:w-[526px] lg:min-w-[526px]',
          'xl:h-[382px] xl:w-[655px] xl:min-w-[655px]',
          '2xl:h-[382px] 2xl:w-[704px]',
        )}
      >
        <ReactECharts
          ref={financesLineChartRef}
          option={options}
          style={{ width: '100%', height: '100%' }}
          opts={{ renderer: 'svg' }}
        />
      </div>
    </div>
  )
}

export default StackedAreaChart
