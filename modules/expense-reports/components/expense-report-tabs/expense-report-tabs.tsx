'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { cn } from '@/modules/shared/lib/utils'
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

  const isAccountSnapshotActive = section === TabSection.ACCOUNT_SNAPSHOT
  const isExpenseReportsActive = section === TabSection.EXPENSE_REPORTS

  return (
    <nav aria-label="Expense report sections">
      <div
        className={cn(
          'bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]',
        )}
      >
        <Link
          href={createUrl(TabSection.ACCOUNT_SNAPSHOT)}
          aria-current={isAccountSnapshotActive ? 'page' : undefined}
          className={cn(
            'text-foreground dark:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1',
            isAccountSnapshotActive
              ? 'dark:border-input dark:bg-input/30 bg-background text-accent-foreground shadow-sm'
              : 'cursor-pointer',
          )}
        >
          Account Snapshot
        </Link>

        <Link
          href={createUrl(TabSection.EXPENSE_REPORTS)}
          aria-current={isExpenseReportsActive ? 'page' : undefined}
          className={cn(
            'text-foreground dark:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1',
            isExpenseReportsActive
              ? 'dark:border-input dark:bg-input/30 bg-background text-accent-foreground shadow-sm'
              : 'cursor-pointer',
          )}
        >
          Expense Reports
        </Link>
      </div>
    </nav>
  )
}

export { ExpenseReportTabs }
