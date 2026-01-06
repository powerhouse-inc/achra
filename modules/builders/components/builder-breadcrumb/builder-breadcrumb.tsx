'use client'

import { usePathname } from 'next/navigation'
import { Breadcrumb } from '@/modules/shared/components/breadcrumb'
import type { Route } from 'next'

interface BuilderBreadcrumbProps {
  networkSlug: string
  builderSlug: string
  networkName: string
  builderName: string
}

function BuilderBreadcrumb({
  networkName,
  networkSlug,
  builderName,
  builderSlug,
}: BuilderBreadcrumbProps) {
  const pathname = usePathname()
  const isExpenseReports = pathname.includes('expense-reports')

  const items = [
    { label: networkName, href: `/network/${networkSlug}` as Route },
    { label: 'Builders', href: `/network/${networkSlug}/builders` as Route },
    { label: builderName, href: `/network/${networkSlug}/builders/${builderSlug}` as Route },
  ]

  if (isExpenseReports) {
    items.push({
      label: 'Expense reports',
      href: `/network/${networkSlug}/builders/${builderSlug}/expense-reports` as Route,
    })
  }

  return (
    <div>
      <Breadcrumb items={items} />
    </div>
  )
}

export { BuilderBreadcrumb }
