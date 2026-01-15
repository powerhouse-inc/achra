'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { Tabs, TabsList, TabsTrigger } from '@/modules/shared/components/ui/tabs'
import { sectionSearchParamParser } from '../../lib/search-params-client'
import { TabSection } from '../../types'
import type { Route } from 'next'

function ExpenseReportTabs() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [section] = useQueryState('section', sectionSearchParamParser)

  const createUrl = (sectionValue: string): Route => {
    const params = new URLSearchParams(searchParams.toString())

    if (sectionValue == TabSection.ACCOUNT_SNAPSHOT) {
      // we don't show the first tab in the url to keep it cleaner
      params.delete('section')
    } else {
      params.set('section', sectionValue)
    }

    return `${pathname}?${params.toString()}` as Route
  }

  return (
    <Tabs value={section}>
      <TabsList aria-label="Expense report sections">
        <TabsTrigger value={TabSection.ACCOUNT_SNAPSHOT} asChild>
          <Link href={createUrl(TabSection.ACCOUNT_SNAPSHOT)}>Account Snapshot</Link>
        </TabsTrigger>

        <TabsTrigger value={TabSection.EXPENSE_REPORTS} asChild>
          <Link href={createUrl(TabSection.EXPENSE_REPORTS)}>Expense Reports</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export { ExpenseReportTabs }
