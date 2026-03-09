'use client'

import { type ReactNode, Suspense } from 'react'
import { Card } from '@/shared/components/ui/card'
import { FinancesReservesChartSkeleton } from '../skeletons/finances-reserves-chart-skeleton'
import { TitleFilterSection } from '../title-filter-section'

interface FinancesReservesChartCardProps {
  children: ReactNode
}

export function FinancesReservesChartCard({ children }: Readonly<FinancesReservesChartCardProps>) {
  return (
    <Card className="bg-popover flex w-full flex-col gap-4 border-none p-2 pb-4 shadow-xs md:p-4 lg:p-6">
      <Suspense fallback={<div className="h-20 animate-pulse" />}>
        <TitleFilterSection />
      </Suspense>
      <Suspense fallback={<FinancesReservesChartSkeleton />}>{children}</Suspense>
    </Card>
  )
}
