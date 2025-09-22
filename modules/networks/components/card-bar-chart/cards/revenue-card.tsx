import React from 'react'
import { ItemLegend } from './legend-item'

export function RevenueCard() {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative flex flex-col items-center rounded-xl border border-gray-200 p-2 md:flex-1 md:items-start md:justify-center md:border-none md:bg-slate-50 md:py-4 md:pr-4 md:pl-8 xl:p-6">
        <span className="text-xs leading-6 font-medium text-gray-500 md:absolute md:-top-2.5 md:left-10 md:rounded-lg md:bg-white md:px-2 md:py-0 md:text-sm md:leading-5 md:font-semibold md:text-gray-600 xl:-top-3.5 xl:left-4 xl:text-base xl:leading-6">
          Revenue
        </span>
        <div className="flex gap-6 md:flex-col md:gap-2">
          <ItemLegend color="fill-green-300">Fees</ItemLegend>
          <ItemLegend color="fill-green-500">Liquidation Income</ItemLegend>
          <ItemLegend color="fill-green-700">PSM</ItemLegend>
        </div>
      </div>
    </div>
  )
}
