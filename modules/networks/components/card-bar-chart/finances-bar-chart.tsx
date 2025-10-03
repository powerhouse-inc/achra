'use client'
import ReactECharts, { type EChartsOption } from 'echarts-for-react'
import { useMemo, useRef } from 'react'
import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import { cn } from '@/modules/shared/lib/utils'
import {
  barChartSeriesConfig,
  createTooltipFormatter,
  formatNumberToShortScale,
} from '../finances-section/utils'
import type { BarChartSeries, RevenueAndSpendingRecords } from './types'

interface FinancesBarChartProps {
  revenueAndSpendingData: RevenueAndSpendingRecords
  years: string[]
}

function FinancesBarChart({ revenueAndSpendingData }: FinancesBarChartProps) {
  const financesBarChartRef = useRef<EChartsOption>(null)
  const isMobile = useMediaQuery({ from: 'xs', to: 'sm' })
  const isTablet = useMediaQuery({ from: 'sm', to: 'lg' })

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
      backgroundColor: 'var(--color-muted)',
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'var(--color-muted-foreground)',
          opacity: 0.15,
        },
      },
      padding: 0,
      borderColor: 'var(--color-muted)',
      formatter: (value: BarChartSeries) => {
        const toolTipStyle = createTooltipFormatter(isMobile)(value)
        return toolTipStyle
      },
    },
    grid: {
      top: isTablet ? 40 : isMobile ? 6 : 40,
      right: 0,
      bottom: 20,
      left: isMobile ? 40 : 49,
    },
    xAxis: {
      data: ['2021', '2022', '2023', '2024'],
      type: 'category',
      axisLine: {
        lineStyle: {
          color: 'var(--color-input)',
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        margin: 4,
        fontFamily: 'var(--font-open-sans-condensed)',
        fontWeight: 700,
        fontSize: isMobile ? 12 : 14,
        lineHeight: isMobile ? 16 : 19,
        color: 'var(--color-muted-foreground)',
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
          color: 'var(--color-border)',
        },
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'var(--color-border)',
        },
      },

      axisLabel: {
        fontFamily: 'var(--font-open-sans-condensed)',
        fontWeight: 700,
        fontSize: isMobile ? 12 : 14,
        color: 'var(--color-foreground)',
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
        'relative mt-2.5 flex flex-col justify-center sm:mt-0',
        // Dimensions
        'h-[216px] w-full',
        'sm:h-[282px] sm:w-[337px]',
        'md:h-[282px] md:w-[385px]',
        'lg:h-[282px] lg:w-[526px]',
        'xl:h-[386px] xl:w-[449px]',
        '2xl:h-[386px] 2xl:w-[480px]',
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
