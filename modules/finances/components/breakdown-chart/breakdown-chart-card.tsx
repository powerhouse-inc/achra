'use client'
import { type ReactNode, Suspense } from 'react'
import { Card } from '@/shared/components/ui/card'
import { TitleFilterSection } from './title-filter-section'

interface BreakdownChartCardProps {
  children: ReactNode
}

export function BreakdownChartCard({ children }: Readonly<BreakdownChartCardProps>) {
  return (
    <Card className="bg-popover flex w-full flex-col gap-4 border-none p-2 pb-4 shadow-xs md:p-4 lg:p-6">
      <Suspense fallback={<div className="h-20 animate-pulse" />}>
        <TitleFilterSection />
      </Suspense>
      {children}
    </Card>
  )
}
