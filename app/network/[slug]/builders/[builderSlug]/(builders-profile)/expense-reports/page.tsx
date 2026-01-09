import { Suspense } from 'react'
import {
  AccountSnapshot,
  AccountSnapshotSkeleton,
} from '@/modules/expense-reports/components/account-snapshot'
import {
  ExpenseReportTabs,
  ExpenseReportTabsSkeleton,
} from '@/modules/expense-reports/components/expense-report-tabs'
import {
  ExpenseReportsSection,
  ExpenseReportsSectionSkeleton,
} from '@/modules/expense-reports/components/expense-reports-section'
import {
  MonthNavigation,
  MonthNavigationSkeleton,
} from '@/modules/expense-reports/components/month-navigation'
import { expenseReportsSearchParamsCache } from '@/modules/expense-reports/lib/search-params-server'
import { TabSection } from '@/modules/expense-reports/types'
import { PageContent } from '@/modules/shared/components/page-containers'
import type { SearchParams } from 'nuqs/server'

interface ExpenseReportsPageProps {
  searchParams: Promise<SearchParams>
}

export default async function ExpenseReportsPage({ searchParams }: ExpenseReportsPageProps) {
  const searchParamsResolved = await searchParams
  const searchParamsData = expenseReportsSearchParamsCache.parse(searchParamsResolved)

  const section = searchParamsData.section
  const viewMonth = searchParamsData.viewMonth ?? ''

  // TODO: fetch the actual builder data and if it doesn't exist, return a 404 page

  return (
    <>
      <PageContent as="div" className="mt-4 mb-0 md:mt-6">
        <Suspense fallback={<MonthNavigationSkeleton />}>
          <MonthNavigation />
        </Suspense>

        <div className="my-6">
          <Suspense fallback={<ExpenseReportTabsSkeleton />}>
            <ExpenseReportTabs />
          </Suspense>
        </div>
      </PageContent>

      {/* CONTENT 👇 */}

      {section === TabSection.ACCOUNT_SNAPSHOT && (
        <div className="container">
          <Suspense fallback={<AccountSnapshotSkeleton />} key={`${section}-${viewMonth}`}>
            <AccountSnapshot month={viewMonth ? new Date(viewMonth) : null} />
          </Suspense>
        </div>
      )}

      {section === TabSection.EXPENSE_REPORTS && (
        <Suspense fallback={<ExpenseReportsSectionSkeleton />} key={`${section}-${viewMonth}`}>
          <ExpenseReportsSection month={viewMonth ? new Date(viewMonth) : null} />
        </Suspense>
      )}

      <div className="container mt-6 mb-8">
        <h3>Additional Notes</h3>
      </div>
    </>
  )
}
