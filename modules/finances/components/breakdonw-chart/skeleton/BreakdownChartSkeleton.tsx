import React from 'react'
import { Card } from '@/modules/shared/components/ui/card'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { BarSkeletonItems } from './BarSkeletonItems'
import { BreakdownChartFilterSkeleton } from './BreakdownChartFilterSkeleton'
import { ItemLegendDesk } from './ItemLegendDesk'
import { ItemLegendValues } from './ItemLegendValues'
import { LegendAxisYItems } from './LegendAxisYItems'

function BreakdownChartSkeleton() {
  const arrayLegendAxisX = Array.from({ length: 12 }, () => 0)

  return (
    <Card className="bg-popover flex w-full flex-col items-center gap-6 border-none! px-4 md:gap-6 lg:gap-8 xl:gap-8">
      {/* Filter Section (New) */}
      <BreakdownChartFilterSkeleton />

      {/* Chart Wrapper to match flex direction logic */}
      <div className="flex w-full flex-col items-center md:flex-row md:items-start md:justify-between md:gap-6 xl:gap-8">
        {/* Chart Container */}
        <div className="relative flex w-full flex-col justify-center md:mt-0 md:h-[268px] md:max-w-[calc(100%-287px)] lg:h-[288px] lg:max-w-[calc(100%-416px)] xl:h-[356px] xl:max-w-[calc(100%-387px)] xl:pl-0 2xl:h-[356px] 2xl:max-w-[calc(100%-450px)]">
          {/* ContainerLegendsDesk (Y Axis + Bars + X Axis for Desktop) */}
          <div className="flex flex-col">
            {/* ContainerLegendY */}
            <div className="relative flex w-full flex-row items-end gap-2 md:justify-start lg:gap-4 xl:gap-6 2xl:gap-6">
              <LegendAxisYItems />
              <BarSkeletonItems />
            </div>

            {/* DeskAxisLegend (X Axis Labels for Desktop) */}
            <div className="mt-2 hidden w-full flex-row items-center justify-between md:flex md:pl-[76px] lg:mt-3 lg:pl-[84px] xl:justify-start xl:gap-[19px] xl:pl-[92px] 2xl:gap-6">
              {arrayLegendAxisX.map((_, index) => (
                <div
                  // it is okay to use index as key here because the skeleton is static
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className="flex w-[38px] flex-col items-center gap-[4.5px] md:h-[19px] md:w-[23px] lg:min-w-[30px] xl:min-w-[40px]"
                >
                  <Skeleton className="bg-accent h-[19px] w-3 rounded-md" />
                </div>
              ))}
            </div>
          </div>

          {/* ContainerAxisX (X Axis Labels for Mobile) */}
          <div className="flex w-full pl-10 md:hidden">
            <div className="mb-3 flex w-full flex-row items-end justify-between gap-2">
              {arrayLegendAxisX.map((_, index) => (
                // it is okay to use index as key here because the skeleton is static
                // eslint-disable-next-line react/no-array-index-key
                <div key={index} className="flex w-4 justify-center pt-1 text-end">
                  <Skeleton className="h-2 w-2 rounded-full" />
                </div>
              ))}
            </div>
          </div>

          {/* LineContainer (Mobile Only) */}
          <div className="mb-2 flex flex-row gap-1 overflow-hidden pl-8 md:hidden">
            <Skeleton className="border-input h-[11px] flex-1 rounded-l-[3px] rounded-r-none border-b border-l bg-transparent" />
            <Skeleton className="bg-input mx-3 mt-1 h-[13px] w-7 rounded-[12.5px]" />
            <Skeleton className="border-input h-[11px] flex-1 rounded-l-none rounded-r-[3px] border-r border-b bg-transparent" />
          </div>

          {/* ContainerLegends (Mobile Only) */}
          <div className="ml-8 flex flex-col flex-wrap items-center justify-center gap-6 gap-y-4 md:hidden">
            <ItemLegendValues />
            <ItemLegendValues />
            <ItemLegendValues />
          </div>
        </div>

        {/* LegendDesk (Side Legend for Tablet/Desktop) */}
        <div className="md:bg-accent hidden md:flex md:h-[268px] md:w-[265px] md:flex-col md:items-center md:gap-6 md:rounded-xl lg:h-72 lg:w-[362px] xl:h-[353px] xl:w-[355px] 2xl:h-[353px] 2xl:w-[392px]">
          <div className="flex h-full flex-col justify-center gap-6">
            <ItemLegendDesk widthName={116} widthValue={50} />
            <ItemLegendDesk widthName={126} widthValue={51} />
            <ItemLegendDesk widthName={143} widthValue={44} />
          </div>
        </div>
      </div>
    </Card>
  )
}

export default BreakdownChartSkeleton
