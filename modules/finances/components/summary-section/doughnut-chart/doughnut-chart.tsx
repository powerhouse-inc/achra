import ReactECharts, { type EChartsOption } from 'echarts-for-react'
import { startTransition, useEffect, useMemo, useRef, useState } from 'react'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, type SwiperProps, type SwiperRef, SwiperSlide } from 'swiper/react'

import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import { usLocalizedNumber } from '@/modules/shared/lib/humanization'

import { cn } from '@/modules/shared/lib/utils'
import { CardLegend } from './card-legend'
import { DoughnutChartSkeleton } from './doughnut-chart-skeleton'
import { UsdsTooltip } from './usds-tooltip'
import {
  chunkArray,
  getCorrectMetricValuesOverViewChart,
  getPercentDisplay,
  sortDoughnutSeriesByValue,
} from './utils'
import type { AnalyticMetric, BudgetMetric, DoughnutSeries } from './types'

interface DesktopChartProps {
  seriesData: DoughnutSeries[]
  selectedMetric: AnalyticMetric
  changeAlignment: boolean
  showSwiper: boolean
  numberSliderPerLevel?: number
}

export function DesktopChart({
  seriesData,
  selectedMetric,
  changeAlignment,
  showSwiper,
  numberSliderPerLevel = 6,
}: DesktopChartProps) {
  const chartRef = useRef<EChartsOption>(null)
  const ref = useRef<SwiperRef>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [visibleSeries, setVisibleSeries] = useState<DoughnutSeries[]>(seriesData)
  const [legends, setLegends] = useState<DoughnutSeries[]>(seriesData)
  const isDeepLevel = seriesData.length > 6

  useEffect(() => {
    startTransition(() => {
      setVisibleSeries(seriesData)
      setLegends(seriesData)
      chartRef.current?.getEchartsInstance()?.resize()
    })
  }, [seriesData])

  const isTable = useMediaQuery({ from: 'sm', to: 'lg' })
  const isDesktop1024 = useMediaQuery({ from: 'lg', to: 'xl' })

  useEffect(() => {
    const onResize = () => {
      const chartInstance = chartRef.current?.getEchartsInstance()
      chartInstance?.resize()
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const tooltipSelectedMetricLabel = useMemo(() => {
    switch (selectedMetric) {
      case 'PaymentsOnChain':
        return 'Net Expenses On-Chain'
      case 'ProtocolNetOutflow':
        return 'Net Protocol Outflow'
      case 'Budget':
        return 'Budget'
      case 'Forecast':
        return 'Forecast'
      case 'Actuals':
        return 'Actuals'
      default:
        return 'Budget'
    }
  }, [selectedMetric])

  const doughnutSeriesChunks = chunkArray(
    sortDoughnutSeriesByValue(seriesData),
    numberSliderPerLevel,
  )

  const options = useMemo(
    () => ({
      color: visibleSeries.map((data) => data.color),
      tooltip: {
        extraCssText:
          'z-index:6;border-radius: 12px;overflow: hidden;box-shadow: var(--shadow-md);',
        show: true,
        trigger: 'item',
        label: { show: false, position: 'center' },
        emphasis: { width: 40 },
        padding: 0,
        borderWidth: 1,
        formatter(params: DoughnutSeries) {
          const index = visibleSeries.findIndex((data) => data.name === params.name)
          const itemRender = visibleSeries[index]
          const selectedMetricKey = getCorrectMetricValuesOverViewChart(
            selectedMetric,
          ) as keyof BudgetMetric

          const customTooltip = `
          <div style="background-color:var(--popover);padding:7px 15px;min-width:194px;">
            <div style="color:var(--foreground);font-size: 18px;font-weight: 700;line-height: 120%;">${getPercentDisplay(
              itemRender.percent,
            )}%</div>
            <div style="margin-bottom:8px;color:var(--muted-foreground);font-size: 14px;font-weight: 600;line-height: 22px;max-width: 300px; white-space: nowrap;overflow: hidden; text-overflow: ellipsis;">${
              itemRender.name
            }</div>
            <div style="display:flex;flex-direction:row;gap:32px">
                <div style="display:flex;flex-direction:column">
                  <div style="margin-bottom:4;color:var(--foreground);font-size: 16px;font-weight: 600;line-height: 24px;">${usLocalizedNumber(
                    itemRender.metrics[
                      selectedMetricKey === 'budget' ? 'paymentsOnChain' : selectedMetricKey
                    ].value,
                    2,
                  )}</div>
                  <div style="color:var(--muted-foreground);font-size: 12px;font-weight: 500;line-height: 18px;">${
                    selectedMetric === 'Budget'
                      ? 'Net Expenses On-Chain'
                      : tooltipSelectedMetricLabel
                  }</div>
               </div>
                <div style="display:flex;flex-direction:column">
                  <div style="margin-bottom:4;color:var(--foreground);font-size: 16px;font-weight: 600;line-height: 24px;">${usLocalizedNumber(
                    itemRender.metrics.budget.value,
                    2,
                  )}</div>
                  <div style="color:var(--muted-foreground);font-size: 12px;font-weight: 500;line-height: 18px;">Budget Cap</div>
               </div>
            </div>
          </div>
          `
          return customTooltip
        },
      },
      series: [
        {
          name: 'Overview Card',
          type: 'pie',
          radius: isTable || isDesktop1024 ? [32, 64] : [35, 70],
          center: ['50%', '50%'],
          label: { normal: { show: false } },
          labelLine: { normal: { show: false } },
          data: visibleSeries.map((data) => ({
            ...data,
            // transform negative values to positive to avoid hidden values on the chart
            value: Math.abs(data.value),
          })),
        },
      ],
    }),
    [isDesktop1024, isTable, selectedMetric, tooltipSelectedMetricLabel, visibleSeries],
  )

  const toggleSeriesVisibility = (seriesName: string) => {
    const chartInstance = chartRef.current?.getEchartsInstance()
    const newArray = visibleSeries.map((item) => {
      if (item.name === seriesName) {
        chartInstance.dispatchAction({
          type: 'hideTip',
        })
        const isVisible = !item.isVisible
        return {
          ...item,
          isVisible,
          value: isVisible ? item.originalValue || 0 : -1,
        }
      }
      return item
    })
    // iterate through legends
    const newLegend = legends.map((item) => {
      if (item.name === seriesName) {
        chartInstance.dispatchAction({
          type: 'hideTip',
        })
        const isVisible = !item.isVisible
        return {
          ...item,
          color: isVisible ? item.originalColor : 'rgb(204, 204, 204)',
          isVisible,
          value: item.originalValue ?? 0,
        }
      }
      return item
    })
    setLegends(newLegend as DoughnutSeries[])
    setVisibleSeries(newArray)
  }

  const onLegendItemHover = (legendName: string) => {
    const dataIndex = visibleSeries.find((data) => data.name === legendName)
    if (dataIndex) {
      if (dataIndex.value !== 0) {
        const chartInstance = chartRef.current.getEchartsInstance()
        chartInstance.dispatchAction({
          type: 'highlight',
          name: legendName,
          seriesIndex: 0,
        })
        chartInstance.dispatchAction({
          type: 'showTip',
          name: legendName,
          seriesIndex: 0,
        })
      }
    }
  }
  const onLegendItemLeave = (legendName: string) => {
    const chartInstance = chartRef.current.getEchartsInstance()
    chartInstance.dispatchAction({
      type: 'downplay',
      name: legendName,
    })
    chartInstance.dispatchAction({
      type: 'hideTip',
    })
  }

  const swiperOptions: SwiperProps = {
    pagination: { type: 'bullets', enabled: true, clickable: true },
    breakpoints: {
      768: { spaceBetween: 16 },
      1024: { spaceBetween: 2 },
      1280: { spaceBetween: 2 },
      1440: { spaceBetween: 2 },
      1920: { spaceBetween: 2 },
    },
  }

  useEffect(() => {
    chartRef.current?.getEchartsInstance()?.setOption(options, { notMerge: true })
  }, [options])

  useEffect(() => {
    startTransition(() => {
      setIsLoading(false)
    })
  }, [])

  if (isLoading)
    return (
      <div className="flex w-full justify-center">
        <DoughnutChartSkeleton />
      </div>
    )

  const haveMoreThanThreeItems = seriesData.length > 3

  return (
    <div
      className={cn(
        'flex w-full',
        'md:flex-row md:justify-center md:gap-5',
        'lg:gap-7.5',
        isDeepLevel ? 'xl:gap-10' : 'xl:gap-8',
        haveMoreThanThreeItems && 'xl:ml-4 xl:justify-start',
        haveMoreThanThreeItems && '2xl:ml-0',
      )}
    >
      {/* ContainerChart */}
      <div
        className={cn(
          'relative flex justify-start',
          'md:w-34.5 md:min-w-34.5',
          'xl:w-39.5 xl:min-w-39.5',
        )}
      >
        <ReactECharts
          ref={chartRef}
          className="chart-container"
          option={options}
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'svg' }}
        />
        <div className="absolute inset-0 m-auto flex h-16 w-16 flex-row items-center justify-center">
          <UsdsTooltip />
        </div>
      </div>

      {showSwiper ? (
        <div
          className={cn(
            'md:relative md:flex md:w-50',
            'lg:flex lg:w-62.5 lg:min-w-62.5',
            isDeepLevel ? 'lg:mt-0' : 'lg:mt-4',
            'xl:relative xl:flex',
            numberSliderPerLevel === 12 && 'xl:min-w-75',
            numberSliderPerLevel === 12 && '2xl:min-w-102.5',
            '[&_.swiper-pagination-horizontal]:flex [&_.swiper-pagination-horizontal]:justify-center',

            '[&_.swiper-pagination-horizontal]:bottom-0! [&_.swiper-pagination-horizontal]:-translate-x-6!',

            '[&_.swiper-pagination-horizontal]:z-8',
            '[&_.swiper-pagination-bullet]:bg-muted! [&_.swiper-pagination-bullet]:h-2! [&_.swiper-pagination-bullet]:w-2! [&_.swiper-pagination-bullet]:rounded-full',
            '[&_.swiper-pagination-bullet-active]:bg-foreground!',
            '[&_.swiper-pagination-bullet:first-of-type]:rounded-l-md',
            '[&_.swiper-pagination-bullet:last-of-type]:rounded-r-md',
          )}
        >
          <Swiper
            direction="horizontal"
            ref={ref}
            modules={[Pagination, Navigation]}
            centerInsufficientSlides
            pagination={true}
            {...swiperOptions}
            className="h-full w-full"
          >
            {Array.from(doughnutSeriesChunks.entries()).map(([index, dataChunk]) => (
              <SwiperSlide key={index}>
                <CardLegend
                  changeAlignment={changeAlignment}
                  doughnutSeriesData={dataChunk}
                  toggleSeriesVisibility={toggleSeriesVisibility}
                  onLegendItemHover={onLegendItemHover}
                  onLegendItemLeave={onLegendItemLeave}
                  isDeepLevel={isDeepLevel}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className={cn('relative flex max-w-full items-center justify-center')}>
          <CardLegend
            changeAlignment={changeAlignment}
            doughnutSeriesData={seriesData}
            toggleSeriesVisibility={toggleSeriesVisibility}
            onLegendItemHover={onLegendItemHover}
            onLegendItemLeave={onLegendItemLeave}
            isDeepLevel={isDeepLevel}
          />
        </div>
      )}
    </div>
  )
}

export default DesktopChart
