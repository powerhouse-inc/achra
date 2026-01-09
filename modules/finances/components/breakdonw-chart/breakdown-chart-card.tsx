'use client'
import { Card } from '@/shared/components/ui/card'
import TitleFilterSection from './title-filter-section'
import type { ReactNode } from 'react'

interface BreakdownChartCardProps {
  children: ReactNode
}

export default function BreakdownChartCard({ children }: Readonly<BreakdownChartCardProps>) {
  return (
    <Card className="bg-popover flex w-full flex-col gap-4 border-none p-2 pb-4 shadow-xs md:p-4 lg:p-6">
      <TitleFilterSection />
      {children}
    </Card>
  )
}
