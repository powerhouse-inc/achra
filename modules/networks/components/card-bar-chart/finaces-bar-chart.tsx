'use client'
import ReactECharts, { type EChartsOption } from 'echarts-for-react'
import { useMemo, useRef } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { useIsMobile } from '@/modules/shared/hooks/use-mobile'
import { cn } from '@/modules/shared/lib/utils'
import {
  barChartSeriesConfig,
  createTooltipFormatter,
  formatNumberToShortScale,
} from '../finances-section/utils'
import type { BarChartSeries, RevenueAndSpendingRecords } from '../finances-section/types'

interface FinancesBarChartProps {
  revenueAndSpendingData: RevenueAndSpendingRecords
  years: string[]
}

function FinancesBarChart({ revenueAndSpendingData }: FinancesBarChartProps) {
  const financesBarChartRef = useRef<EChartsOption>(null)
  const isMobile = useIsMobile()

  const isTablet = useMediaQuery('(min-width: 680px) and (max-width: 1024px)')

  const { chartSeries } = useMemo(() => {
    const series: Record<string, number[]> = {
      psm: [],
      liquidationIncome: [],
      fees: [],
      dsr: [],
      mkrVesting: [],
      daiSpent: [],
    }

    const years = Object.keys(revenueAndSpendingData)
      // limit the years to 2021-2024 as there's no UI space for more years
      .filter((year) => Number(year) >= 2021 && Number(year) <= 2024)
      .sort((a, b) => Number(a) - Number(b))

    years.forEach((year) => {
      const record = revenueAndSpendingData[year]
      series.psm.push(record.psm)
      series.liquidationIncome.push(record.liquidationIncome)
      series.fees.push(record.fees)
      series.dsr.push(record.dsr)
      series.mkrVesting.push(record.mkrVesting)
      series.daiSpent.push(record.daiSpent)
    })

    return {
      chartSeries: series,
    }
  }, [revenueAndSpendingData])

  const barWidth = isMobile ? 24 : isTablet ? 32 : 40

  const series = barChartSeriesConfig.map((config) => ({
    data: chartSeries[config.key],
    type: 'bar',
    stack: config.stack,
    name: config.key,
    barWidth,
    itemStyle: {
      color: config.color,
      borderRadius: config.radius,
    },
    emphasis: {
      itemStyle: { color: 'inherit' },
    },
  }))
  const options: EChartsOption = {
    tooltip: {
      show: true,
      trigger: 'axis',
      borderRadius: 12,
      backgroundColor: '#F2F4F7',
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: '#D4D9E1',
          opacity: 0.15,
        },
      },
      padding: 0,
      borderColor: '#F2F4F7',
      formatter: (value: BarChartSeries) => {
        const toolTipStyle = createTooltipFormatter(isMobile)(value)
        return toolTipStyle
      },
    },
    grid: {
      top: 8,
      right: 0,
      bottom: 20,
      left: isMobile ? 40 : 49,
    },
    xAxis: {
      data: ['2021', '2022', '2023', '2024'],
      type: 'category',
      axisLine: {
        lineStyle: {
          color: '#D4D9E1',
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        margin: 4,
        fontFamily: 'OpenSansCondensed, san-serif',
        fontWeight: 700,
        fontSize: isMobile ? 12 : 14,
        lineHeight: isMobile ? 16 : 19,
        color: '#B6BCC2',
      },
      axisPointer: {
        show: !isMobile,
        type: 'shadow',
        label: {
          show: false,
        },
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          color: '#B6BCC2',
        },
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#B6BCC2',
        },
      },
      axisLabel: {
        fontFamily: 'OpenSansCondensed, san-serif',
        fontWeight: 700,
        fontSize: isMobile ? 12 : 14,
        color: '#B6BCC2',
        formatter(value: number, index: number) {
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
    <div
      className={cn(
        'relative mt-2 flex flex-col justify-center',
        // Dimensions
        'h-[216px] w-full',
        'sm:h-[310px] sm:w-[337px]',
        'md:h-[290px] md:w-[385px]',
        'lg:h-[282px] lg:w-[526px]',
        'lg:w-[526px]',
      )}
    >
      <ReactECharts
        ref={financesBarChartRef}
        option={options}
        style={{
          width: '100%',
          height: '100%',
        }}
        opts={{ renderer: 'svg' }}
      />
    </div>
  )
}

export default FinancesBarChart
