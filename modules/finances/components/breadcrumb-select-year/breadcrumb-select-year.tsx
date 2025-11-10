'use client'
import { useState } from 'react'
import { Breadcrumb } from '@/modules/shared/components/breadcrumb'
import { PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb/page-breadcrumb-container'
import { YearSelect } from '../year-select'
import type { Route } from 'next'

export function BreadcrumbSelectYear() {
  const [selectedYear, setSelectedYear] = useState('2025')
  const years = ['2023', '2024', '2025']

  const handleYearSelect = (year: string) => {
    setSelectedYear(year)
  }

  const items = [
    { label: 'Networks', href: '/networks' as Route },
    { label: 'Powerhouse', href: '/network/powerhouse' as Route },
  ]
  return (
    <PageBreadcrumbContainer>
      <div className="flex w-full items-center gap-4">
        <div className="min-w-0 flex-1">
          <Breadcrumb items={items} className="w-full" />
        </div>
        <div className="shrink-0">
          <YearSelect selectedYear={selectedYear} years={years} onYearChange={handleYearSelect} />
        </div>
      </div>
    </PageBreadcrumbContainer>
  )
}
