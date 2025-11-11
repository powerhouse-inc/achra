'use client'

import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { Breadcrumb } from '@/modules/shared/components/breadcrumb'
import type { Route } from 'next'

function BuilderBreadcrumb() {
  const pathname = usePathname()
  const isExpenseReports = pathname.includes('expense-reports')

  const items = useMemo(() => {
    const breadcrumbItems = [
      { label: 'Powerhouse', href: '/network/powerhouse' as Route },
      { label: 'Builders', href: '/network/powerhouse/builders' as Route },
      { label: 'Powerhouse', href: '/network/powerhouse/builders/powerhouse' as Route },
    ]

    if (isExpenseReports) {
      breadcrumbItems.push({
        label: 'Expense reports',
        href: '/network/powerhouse/builders/powerhouse/expense-reports' as Route,
      })
    }

    return breadcrumbItems
  }, [isExpenseReports])

  return (
    <div>
      <Breadcrumb items={items} />
    </div>
  )
}

export { BuilderBreadcrumb }
