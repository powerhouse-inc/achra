'use client'
import { useState } from 'react'
import { BudgetMetricsDialog } from '../metric-dialog/metric-dialog'
import { SelectYear } from '../year-filter/select-bugdet'

export function YearFilterWithMetrics() {
  const [selectedYear, setSelectedYear] = useState('2023')
  const years = ['2023', '2024', '2025']

  const handleYearSelect = (year: string) => {
    setSelectedYear(year)
  }

  return (
    <div className="flex items-center justify-between py-4">
      <h1 className="text-foreground text-2xl font-semibold">Finances</h1>

      <div className="flex items-center gap-4">
        <BudgetMetricsDialog />
        <SelectYear selectedYear={selectedYear} years={years} onYearChange={handleYearSelect} />
      </div>
    </div>
  )
}
