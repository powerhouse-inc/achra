import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { BarSkeletonItems } from './bar-skeleton-items'
import { ItemLegendDesk } from './item-legend-desk'
import { ItemLegendValues } from './item-legend-values'
import { LegendAxisYItems } from './legend-axis-y-items'

function BreakdownChartSkeleton() {
  const arrayLegendAxisX = Array.from({ length: 12 }, () => 0)

  return (
    <div className="flex w-full flex-col items-center md:flex-row md:items-start md:justify-between md:gap-6 xl:gap-8">
      {/* Chart Container */}
      <div className="relative flex w-full flex-col justify-center md:mt-0 md:h-67 md:max-w-[calc(100%-287px)] lg:h-72 lg:max-w-[calc(100%-416px)] xl:h-89 xl:max-w-[calc(100%-387px)] xl:pl-0 2xl:h-89 2xl:max-w-[calc(100%-450px)]">
        {/* ContainerLegendsDesk (Y Axis + Bars + X Axis for Desktop) */}
        <div className="flex flex-col">
          {/* ContainerLegendY */}
          <div className="relative flex w-full flex-row items-end gap-2 md:justify-start lg:gap-4 xl:gap-6 2xl:gap-6">
            <LegendAxisYItems />
            <BarSkeletonItems />
          </div>

          {/* DeskAxisLegend (X Axis Labels for Desktop) */}
          <div className="mt-2 hidden w-full flex-row items-center justify-between md:flex md:pl-19 lg:mt-3 lg:pl-24 xl:justify-start xl:gap-4.75 xl:pl-24 2xl:gap-6">
            {arrayLegendAxisX.map((_, index) => (
              <div
                // it is okay to use index as key here because the skeleton is static
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className="flex w-9.5 flex-col items-center gap-1 md:h-4.75 md:w-6 lg:min-w-7.5 xl:min-w-10"
              >
                <Skeleton className="bg-accent h-4.75 w-3 rounded-md" />
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
          <Skeleton className="border-input h-2.75 flex-1 rounded-l-[3px] rounded-r-none border-b border-l bg-transparent" />
          <Skeleton className="bg-input rounded-3 mx-3 mt-1 h-3 w-7" />
          <Skeleton className="border-input h-2.75 flex-1 rounded-l-none rounded-r-[3px] border-r border-b bg-transparent" />
        </div>

        {/* ContainerLegends (Mobile Only) */}
        <div className="ml-8 flex flex-col flex-wrap items-center justify-center gap-6 gap-y-4 md:hidden">
          <ItemLegendValues />
          <ItemLegendValues />
          <ItemLegendValues />
        </div>
      </div>

      {/* LegendDesk (Side Legend for Tablet/Desktop) */}
      <div className="md:bg-accent hidden md:flex md:h-67 md:w-66 md:flex-col md:items-center md:gap-6 md:rounded-xl lg:h-72 lg:w-90.5 xl:h-88 xl:w-88 2xl:h-88 2xl:w-98">
        <div className="flex h-full flex-col justify-center gap-6">
          <ItemLegendDesk widthName={116} widthValue={50} />
          <ItemLegendDesk widthName={126} widthValue={51} />
          <ItemLegendDesk widthName={143} widthValue={44} />
        </div>
      </div>
    </div>
  )
}

export { BreakdownChartSkeleton }
