'use client'
import { type ReactNode, Suspense } from 'react'
import { Card } from '@/shared/components/ui/card'
import TitleFilterSection from './title-filter-section'

interface ExpensesMetricChartCardProps {
  children: ReactNode
}

export default function ExpensesMetricChartCard({ children }: Readonly<ExpensesMetricChartCardProps>) {
  return (
    <Card className="bg-popover flex w-full flex-col gap-4 border-none p-2 pb-4 shadow-xs md:p-4 lg:p-6">
      <Suspense fallback={<div className="h-20 animate-pulse" />}>
        <TitleFilterSection />
      </Suspense>
      {children}
    </Card>
  )
}
