import React from 'react'
import { Card, CardTitle } from '@/modules/shared/components/ui/card'
import { FinancesLegends } from './legend-card-section'

export function CardBarChart() {
  return (
    <Card className="bg-popover h-full w-full rounded-xl p-4 shadow-lg lg:px-6 xl:px-4 xl:pt-4 xl:pb-6 2xl:px-6 2xl:pt-4 2xl:pb-6">
      <CardTitle>Ecosystem</CardTitle>
      <FinancesLegends />
    </Card>
  )
}
