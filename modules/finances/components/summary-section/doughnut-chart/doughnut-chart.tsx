'use client'

import ReactECharts from 'echarts-for-react'
import { startTransition, useEffect, useMemo, useRef, useState } from 'react'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, type SwiperProps, type SwiperRef, SwiperSlide } from 'swiper/react'
import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import { usLocalizedNumber } from '@/shared/lib/humanization'
import { cn } from '@/shared/lib/utils'
import { CardLegend } from './card-legend'
import { DoughnutChartSkeleton } from './doughnut-chart-skeleton'
import { UsdsTooltip } from './usds-tooltip'
import { chunkArray, getCorrectMetricValuesOverViewChart, sortDoughnutSeriesByValue } from './utils'
import type { AnalyticMetric, DoughnutSeries } from './types'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

interface DesktopChartProps {
  seriesData: DoughnutSeries[]
  selectedMetric: AnalyticMetric
  changeAlignment: boolean
  showSwiper: boolean
  numberSliderPerLevel?: number
}

const ECHART_TOOLTIP_Z_INDEX = 9999

export function DesktopChart({
  seriesData,
  selectedMetric,
  changeAlignment,
  showSwiper,
  numberSliderPerLevel = 6,
}: DesktopChartProps) {
  const chartRef = useRef<ReactECharts | null>(null)
  const swiperRef = useRef<SwiperRef>(null)
  // const { theme: currentTheme } = useTheme()
  const mountedRef = useRef<boolean>(false)
  // const isLight = currentTheme === 'light'

  const [visibleSeries, setVisibleSeries] = useState<DoughnutSeries[]>(seriesData)
  const [legends, setLegends] = useState<DoughnutSeries[]>(seriesData)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const isTable = useMediaQuery({ from: 'md', to: 'lg' })
  const isDesktop1024 = useMediaQuery({ from: 'lg', to: 'xl' })

  const isDeepLevel = seriesData.length > 6
  const haveMoreThanThreeItems = seriesData.length > 3

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      startTransition(() => {
        setIsLoading(false)
      })
    }
  }, [])

  useEffect(() => {
    // Resize chart on window resize to avoid UI flickering
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
        return 'Budget Cap'
      case 'Forecast':
        return 'Forecast'
      case 'Actuals':
        return 'Actuals'
      default:
        return selectedMetric
    }
  }, [selectedMetric])

  const doughnutSeriesChunks = chunkArray(
    sortDoughnutSeriesByValue(seriesData),
    numberSliderPerLevel,
  )
  const numberSlider = doughnutSeriesChunks.size

  const options = useMemo(
    () => ({
      color: visibleSeries.map((data) => data.color),
      tooltip: {
        extraCssText: `z-index:${ECHART_TOOLTIP_Z_INDEX};border-radius: 12px;overflow: hidden;`,
        show: true,
        trigger: 'item',
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          width: 40,
        },
        padding: 0,
        borderWidth: 1,
        formatter(params: DoughnutSeries) {
          const index = visibleSeries.findIndex((data) => data.name === params.name)

          if (index === -1) return ''

          const itemRender = visibleSeries[index]

          const selectedMetricKey = getCorrectMetricValuesOverViewChart(selectedMetric)

          // TODO: Impro this colors with the theme
          const backgroundColor = '#f8fafc'
          const textColor = '#0f172a'
          const mutedTextColor = '#64748b'

          const customTooltip = `
          <div style="background-color:${backgroundColor};padding:7px 15px;min-width:194px;">
            <div style="color:${textColor};font-size: 18px;font-weight: 700;line-height: 120%;">${
              itemRender.percent === 0
                ? 0
                : itemRender.percent && itemRender.percent < 0.1
                  ? '<0.1'
                  : itemRender.percent && itemRender.percent < 1
                    ? usLocalizedNumber(itemRender.percent, 2)
                    : itemRender.percent
                      ? usLocalizedNumber(itemRender.percent, 1)
                      : 0
            }%</div>
            <div style="margin-bottom:8px;color:${mutedTextColor};font-size: 14px;font-weight: 600;line-height: 22px;max-width: 300px; white-space: nowrap;overflow: hidden; text-overflow: ellipsis;">${
              itemRender.name
            }</div>
            <div style="display:flex;flex-direction:row;gap:32px">
                <div style="display:flex;flex-direction:column">
                  <div style="margin-bottom:4;color:${textColor};font-size: 16px;font-weight: 600;line-height: 24px;">${usLocalizedNumber(
                    itemRender.metrics[
                      selectedMetricKey === 'budget' ? 'paymentsOnChain' : selectedMetricKey
                    ]?.value ?? 0,
                    2,
                  )}</div>
                  <div style="color:${mutedTextColor};font-size: 12px;font-weight: 500;line-height: 18px;">${
                    selectedMetric === 'Budget'
                      ? 'Net Expenses On-Chain'
                      : tooltipSelectedMetricLabel
                  }</div>
               </div>
                <div style="display:flex;flex-direction:column">
                  <div style="margin-bottom:4;color:${textColor};font-size: 16px;font-weight: 600;line-height: 24px;">${usLocalizedNumber(
                    itemRender.metrics.budget.value || 0,
                    2,
                  )}</div>
                  <div style="color:${mutedTextColor};font-size: 12px;font-weight: 500;line-height: 18px;">Budget Cap</div>
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
          radius: isTable || isDesktop1024 ? [32, 64] : [37, 73],
          center: ['50%', '50%'],
          label: {
            normal: {
              show: false,
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: visibleSeries.map((data) => ({
            ...data,
            // Transform negative values to positive to avoid hidden values on the chart
            value: Math.abs(data.value),
          })),
        },
      ],
    }),
    [isDesktop1024, isTable, selectedMetric, tooltipSelectedMetricLabel, visibleSeries],
  )

  const toggleSeriesVisibility = (seriesName: string) => {
    const chartInstance = chartRef.current?.getEchartsInstance()
    if (!chartInstance) return

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

    // Iterate through legends
    const newLegend = legends.map((item) => {
      if (item.name === seriesName) {
        chartInstance.dispatchAction({
          type: 'hideTip',
        })
        const isVisible = !item.isVisible
        return {
          ...item,
          color: isVisible ? (item.originalColor ?? 'rgb(204, 204, 204)') : 'rgb(204, 204, 204)',
          isVisible,
          value: item.originalValue ?? 0,
        }
      }
      return item
    })

    setLegends(newLegend)
    setVisibleSeries(newArray)
  }

  const onLegendItemHover = (legendName: string) => {
    const dataIndex = visibleSeries.find((data) => data.name === legendName)
    if (dataIndex && dataIndex.value !== 0) {
      const chartInstance = chartRef.current?.getEchartsInstance()
      if (chartInstance) {
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
    const chartInstance = chartRef.current?.getEchartsInstance()
    if (chartInstance) {
      chartInstance.dispatchAction({
        type: 'downplay',
        name: legendName,
      })
      chartInstance.dispatchAction({
        type: 'hideTip',
      })
    }
  }

  // Options of Swiper
  const swiperOptions: SwiperProps = {
    pagination: {
      type: 'bullets',
      enabled: true,
      clickable: true,
    },
    breakpoints: {
      768: {
        spaceBetween: 16,
      },
      1024: {
        spaceBetween: 2,
      },
      1280: {
        spaceBetween: 2,
      },
      1440: {
        spaceBetween: 2,
      },
      1920: {
        spaceBetween: 2,
      },
    },
  }

  useEffect(() => {
    // Avoid merging data when moving between levels
    const chartInstance = chartRef.current?.getEchartsInstance()
    chartInstance?.setOption(options, { notMerge: true })
  }, [options])

  if (isLoading) {
    return <DoughnutChartSkeleton />
  }

  return (
    <div
      data-slot="desktop-chart-container"
      className={cn(
        'hidden w-full',
        'md:flex md:flex-row md:justify-center md:gap-5',
        'lg:gap-7.5',
        'xl:gap-8',
        isDeepLevel && 'xl:gap-10',
        haveMoreThanThreeItems && 'xl:ml-4 xl:justify-start',
        haveMoreThanThreeItems && '2xl:ml-10',
      )}
    >
      <div
        data-slot="chart-wrapper"
        className={cn(
          'relative flex justify-start overflow-visible',
          'md:w-[138px] md:min-w-[138px]',
          'xl:w-[158px] xl:min-w-[158px]',
        )}
      >
        <div className="relative z-[1] h-full w-full">
          <ReactECharts
            ref={chartRef}
            className="chart-container"
            option={options}
            style={{
              height: '100%',
              width: '100%',
            }}
            opts={{ renderer: 'svg' }}
          />
        </div>
        <div className="absolute inset-0 top-1/2 left-1/2 z-10 ml-1 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <UsdsTooltip />
        </div>
      </div>

      {showSwiper ? (
        <div
          data-slot="swiper-wrapper"
          className={cn(
            'relative hidden',
            'md:flex md:w-[200px]',
            'lg:mt-4 lg:w-[250px] lg:min-w-[250px]',
            isDeepLevel && 'lg:mt-0',
            numberSliderPerLevel === 12 && 'xl:min-w-[360px]',
            numberSliderPerLevel === 12 && '2xl:min-w-[410px]',
            // Swiper pagination styles
            '[&_.swiper-pagination-horizontal]:flex [&_.swiper-pagination-horizontal]:flex-row [&_.swiper-pagination-horizontal]:justify-center',
            '[&_.swiper-pagination-bullet]:bg-muted [&_.swiper-pagination-bullet]:size-2 [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:opacity-100',
            '[&_.swiper-pagination-bullet:first-of-type]:rounded-l-md [&_.swiper-pagination-bullet:first-of-type]:rounded-r-none',
            '[&_.swiper-pagination-bullet:last-of-type]:rounded-l-none [&_.swiper-pagination-bullet:last-of-type]:rounded-r-md',
            '[&_.swiper-pagination-bullet-active]:bg-foreground',
          )}
        >
          <Swiper
            direction="horizontal"
            ref={swiperRef}
            modules={[Pagination, Navigation]}
            centerInsufficientSlides
            pagination={true}
            {...swiperOptions}
          >
            {Array.from(doughnutSeriesChunks.entries()).map(([index, dataChunk]) => (
              <SwiperSlide key={index}>
                <div
                  data-slot="legend-container"
                  className={cn(
                    'relative flex max-w-full flex-col flex-wrap gap-3.5',
                    isDeepLevel && numberSlider >= 2 && 'flex-1',
                    isDeepLevel && changeAlignment
                      ? 'justify-start'
                      : changeAlignment
                        ? 'justify-start'
                        : 'justify-center',
                    'xl:gap-4',
                  )}
                >
                  <CardLegend
                    changeAlignment={changeAlignment}
                    doughnutSeriesData={dataChunk}
                    toggleSeriesVisibility={toggleSeriesVisibility}
                    onLegendItemHover={onLegendItemHover}
                    onLegendItemLeave={onLegendItemLeave}
                    isDeepLevel={isDeepLevel}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div
          data-slot="legend-container-no-swiper"
          className="relative flex max-w-full flex-col flex-wrap items-center justify-center"
        >
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
