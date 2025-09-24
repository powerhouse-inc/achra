'use client'
import React from 'react'
import { InternalLink } from '@/modules/shared/components/internal-link'
import { Card } from '@/modules/shared/components/ui/card'
import { FinacesTabs } from './componentes/finaces-tabs'
import { TabButton } from './componentes/tab-button'

export function CardStackedAreaChart() {
  return (
    <Card className="bg-popover gap:4 w-full rounded-lg border p-4 shadow-lg lg:px-6 xl:px-4 xl:pt-4 xl:pb-6 2xl:px-6 2xl:pt-4 2xl:pb-6">
      <div className="sm:gap:8 flex flex-col gap-4.5 sm:flex-row xl:flex-col xl:gap-2">
        <FinacesTabs />

        <div className="flex w-full justify-end gap-2">
          <TabButton label="Actuals" onClick={() => {}} isSelect />
          <TabButton label="Payments" onClick={() => {}} />
        </div>
      </div>
      <div className="lg:gap:6 flex h-full flex-col gap-4.5 sm:flex-row xl:flex-col xl:gap-4.5">
        <div className="flex h-[327px] w-[288px] border border-b-gray-200 text-center sm:h-[280px] sm:w-[385px] lg:h-[291px] lg:w-[530px] xl:h-[382px] xl:w-[655px]">
          Chart Component
        </div>
        <div className="flex h-[122px] border border-gray-200 sm:h-full xl:h-[144px]">
          Legend Component
        </div>
      </div>
      <div className="flex justify-center">
        <InternalLink href="/networks" className="w-fit">
          Realized Expenses
        </InternalLink>
      </div>
    </Card>
  )
}
