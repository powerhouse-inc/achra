import React from 'react'
import { ItemLegend } from './legend-item'
import { SpendingItem } from './spending-item'

export function SpendingCard() {
  return (
    <div className="md:bg-red relative flex flex-col gap-4 md:rounded-xl md:bg-gray-50 md:px-1 md:pt-4 md:pb-2">
      <span className="w-full justify-center text-center md:absolute md:-top-4 md:left-6 md:w-fit md:rounded-lg md:bg-white md:px-2">
        Spending
      </span>
      <SpendingItem title="Oper Expenses" mobileTitle="Operational Expenses">
        <ItemLegend color="fill-red-500">USDS Expensed</ItemLegend>
        <ItemLegend color="fill-red-700">SKY Vesting</ItemLegend>
      </SpendingItem>
      <SpendingItem title="Protocol Costs">
        <ItemLegend color="fill-orange-700">DSR Cost</ItemLegend>
      </SpendingItem>
    </div>
  )
}
