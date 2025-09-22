import React from 'react'
import { ItemLegend } from './legend-item'

export function RevenueCard() {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="relative flex flex-col items-center rounded-xl border border-gray-200 p-2 sm:items-start sm:border-none sm:bg-slate-50 sm:py-4 sm:pr-4 sm:pl-8 xl:p-6">
        <span className="text-xs leading-6 font-medium text-gray-500 sm:absolute sm:-top-2.5 sm:left-10 sm:rounded-lg sm:bg-white sm:px-2 sm:py-0 md:text-sm md:leading-5 md:font-semibold xl:-top-3.5 xl:left-4 xl:text-base xl:leading-6">
          Revenue
        </span>
        <div className="flex gap-6 sm:flex-col sm:items-start sm:gap-2">
          <ItemLegend color="fill-status-success/50 text-transparent">Fees</ItemLegend>
          <ItemLegend color="fill-status-success/70 text-transparent">
            Liquidation Income
          </ItemLegend>
          <ItemLegend color="fill-status-success text-transparent">PSM</ItemLegend>
        </div>
      </div>
    </div>
  )
}
