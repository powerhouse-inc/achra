import React from 'react'
import { ItemLegend } from './legend-item'
import { SpendingItem } from './spending-item'

export function SpendingCard() {
  return (
    <div className="relative flex w-full flex-col gap-4 sm:rounded-xl sm:bg-gray-50 sm:px-1 sm:pt-4 sm:pb-2 lg:flex-row xl:flex-col">
      <span className="w-full justify-center text-center sm:absolute sm:-top-4 sm:left-6 sm:w-fit sm:rounded-lg sm:bg-white sm:px-2">
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
