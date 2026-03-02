import React from 'react'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

import { cn } from '@/shared/lib/utils'
import LegendItemExpensesMetricChart from './expenses-metric-chart-item'
import SwitchComponent from './expenses-metric-chart-switch'
import type { ExpensesMetricChartSeriesData } from './types'

interface Props {
  handleToggleSeries: (series: string) => void
  series: ExpensesMetricChartSeriesData[]
  onLegendItemHover: (legendName: string) => void
  onLegendItemLeave: (legendName: string) => void
  isChecked: boolean
  handleChangeSwitch: () => void
  showLegendValue?: boolean
  showScrollAndToggle?: boolean
}

export default function LegendExpensesMetricChart({
  series,
  handleToggleSeries,
  onLegendItemHover,
  onLegendItemLeave,
  showLegendValue,
  showScrollAndToggle = false,
  isChecked,
  handleChangeSwitch,
}: Readonly<Props>) {
  const getLegendValue = (element: ExpensesMetricChartSeriesData) => {
    const points = element.data.map((item) => item.value ?? 0)
    const lastQuarter = points.slice(-3)
    return lastQuarter.reduce((prev, current) => prev + current, 0)
  }

  return (
    <>
      {/* Mobile Container */}
      <div
        data-slot="legend-mobile-container"
        className={cn(
          'mx-auto mt-[22px] flex w-fit flex-col items-start justify-center gap-4',
          showScrollAndToggle &&
            'w-full flex-row flex-wrap items-center justify-center gap-x-2 gap-y-4',
          'md:hidden',
        )}
      >
        {series.map((element) => {
          const value = getLegendValue(element)
          return (
            <LegendItemExpensesMetricChart
              element={element}
              key={element.name}
              handleToggleSeries={() => {
                handleToggleSeries(element.name)
              }}
              onLegendItemHover={() => {
                onLegendItemHover(element.name)
              }}
              onLegendItemLeave={() => {
                onLegendItemLeave(element.name)
              }}
              showLegendValue={showLegendValue}
              value={value}
            />
          )
        })}
      </div>

      {showScrollAndToggle ? (
        <div
          data-slot="legend-container"
          className={cn(
            'bg-card hidden',
            'md:flex md:h-full md:w-[231px] md:min-w-[231px] md:flex-1 md:flex-col md:justify-center md:gap-2 md:rounded-xl md:p-2 md:pb-4 md:pl-4',
            'lg:w-[362px] lg:min-w-[362px]',
            'xl:w-[355px] xl:min-w-[355px]',
            '2xl:w-[392px] 2xl:min-w-[392px]',
          )}
        >
          <div
            data-slot="switch-container"
            className="hidden md:flex md:w-full md:flex-row md:justify-end"
          >
            <SwitchComponent isChecked={isChecked} handleChangeSwitch={handleChangeSwitch} />
          </div>
          <div
            data-slot="scroll-container"
            className="relative flex h-full flex-col items-center gap-1"
          >
            <SimpleBar
              data-slot="simplebar-wrapper"
              className={cn(
                'flex h-full w-full flex-col items-center justify-center',
                '[&_.simplebar-scrollbar::before]:ml-1 [&_.simplebar-scrollbar::before]:h-16 [&_.simplebar-scrollbar::before]:w-1 [&_.simplebar-scrollbar::before]:rounded-xl',
                '[&_.simplebar-scrollbar::before]:bg-muted-foreground',
                // High fixed altitudes for the scroll area
                'md:h-[215px] md:max-h-[215px]',
                'lg:h-[235px] lg:max-h-[235px]',
                'xl:h-[300px] xl:max-h-[300px]',
                '2xl:h-[300px] 2xl:max-h-[300px]',
              )}
            >
              <div
                data-slot="series-container"
                className={cn(
                  // Use min-h-full to ensure it occupies at least the scroll height if there are few items
                  'flex min-h-full flex-row flex-wrap content-start items-center justify-start gap-x-4 gap-y-4',
                  'md:pr-3',
                )}
              >
                {series.map((element) => {
                  const value = getLegendValue(element)
                  return (
                    <LegendItemExpensesMetricChart
                      element={element}
                      key={element.name}
                      handleToggleSeries={() => {
                        handleToggleSeries(element.name)
                      }}
                      onLegendItemHover={() => {
                        onLegendItemHover(element.name)
                      }}
                      onLegendItemLeave={() => {
                        onLegendItemLeave(element.name)
                      }}
                      showLegendValue={showLegendValue}
                      value={value}
                    />
                  )
                })}
              </div>
            </SimpleBar>
          </div>
        </div>
      ) : (
        <div
          data-slot="simple-container"
          className={cn(
            'bg-accent hidden',
            'md:flex md:w-[231px] md:min-w-[231px] md:flex-1 md:flex-col md:items-center md:justify-center md:rounded-xl md:px-4',
            'lg:h-[288px]',
            'xl:h-[353px]',
            '2xl:h-[353px] 2xl:max-w-[392px]',
          )}
        >
          <div
            data-slot="simple-series-container"
            className={cn(
              'flex flex-col items-start justify-center',
              series.length === 7 ? 'gap-y-4' : 'gap-y-6',
              'md:h-[268px]',
              'lg:h-[288px]',
              'xl:h-[353px]',
            )}
          >
            {series.map((element) => {
              const value = getLegendValue(element)
              return (
                <LegendItemExpensesMetricChart
                  element={element}
                  key={element.name}
                  handleToggleSeries={() => {
                    handleToggleSeries(element.name)
                  }}
                  onLegendItemHover={() => {
                    onLegendItemHover(element.name)
                  }}
                  onLegendItemLeave={() => {
                    onLegendItemLeave(element.name)
                  }}
                  showLegendValue={showLegendValue}
                  value={value}
                />
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}
