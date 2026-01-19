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
  const isBudgetStatements = pathname.includes('budget-statements')

  const items = [
    { label: networkName, href: `/network/${networkSlug}` as Route },
    { label: 'Builders', href: `/network/${networkSlug}/builders` as Route },
    { label: builderName, href: `/network/${networkSlug}/builders/${builderSlug}` as Route },
  ]

  if (isBudgetStatements) {
    items.push({
      label: 'Budget Statements',
      href: `/network/${networkSlug}/builders/${builderSlug}/budget-statements` as Route,
    })
  }

  return (
    <div>
      <Breadcrumb items={items} />
    </div>
  )
}

export { BuilderBreadcrumb }
