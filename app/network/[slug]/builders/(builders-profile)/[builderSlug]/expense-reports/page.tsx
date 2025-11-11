import { Suspense } from 'react'
import {
  AccountSnapshot,
  AccountSnapshotSkeleton,
} from '@/modules/expense-reports/components/account-snapshot'
import { Actuals, ActualsSkeleton } from '@/modules/expense-reports/components/actuals'
import { ExpenseReportTabs } from '@/modules/expense-reports/components/expense-report-tabs'
import {
  ExpenseReportsSection,
  ExpenseReportsSectionSkeleton,
} from '@/modules/expense-reports/components/expense-reports-section'
import { MonthNavigation } from '@/modules/expense-reports/components/month-navigation'
import { expenseReportsSearchParamsCache } from '@/modules/expense-reports/lib/search-params-server'
import {
  AuditorTabSection,
  CommonTabSection,
  DefaultTabSection,
  ViewMode,
} from '@/modules/expense-reports/types'
import { PageContent } from '@/modules/shared/components/page-containers'
import type { SearchParams } from 'nuqs/server'

interface ExpenseReportsPageProps {
  searchParams: Promise<SearchParams>
}

export default async function ExpenseReportsPage({ searchParams }: ExpenseReportsPageProps) {
  const searchParamsResolved = await searchParams
  const searchParamsData = expenseReportsSearchParamsCache.parse(searchParamsResolved)

  const viewMode = searchParamsData.view
  const section = searchParamsData.section
  const viewMonth = searchParamsData.viewMonth ?? ''

  return (
    <PageContent as="div">
      <Suspense fallback={<div>Loading...</div>}>
        <MonthNavigation />
      </Suspense>

      <div className="my-6">
        <Suspense fallback={<div>Loading...</div>}>
          <ExpenseReportTabs />
        </Suspense>
      </div>

      {/* CONTENT 👇 */}

      {section === CommonTabSection.ACCOUNT_SNAPSHOT && (
        <Suspense
          fallback={<AccountSnapshotSkeleton />}
          // TODO: find a better way to render the account snapshot, avoiding re-fetching of the section
          // while allowing smoth and instant transition between view modes when this section is active
          key={`${section}-${viewMonth}-${viewMode}`}
        >
          <AccountSnapshot month={viewMonth ? new Date(viewMonth) : null} />
        </Suspense>
      )}

      {viewMode === ViewMode.AUDITOR ? (
        <>
          {section === AuditorTabSection.EXPENSE_REPORTS && (
            <Suspense fallback={<ExpenseReportsSectionSkeleton />} key={`${section}-${viewMonth}`}>
              <ExpenseReportsSection month={viewMonth ? new Date(viewMonth) : null} />
            </Suspense>
          )}
        </>
      ) : (
        <>
          {section === DefaultTabSection.ACTUALS && (
            <Suspense fallback={<ActualsSkeleton />} key={`${section}-${viewMonth}`}>
              <Actuals month={viewMonth ? new Date(viewMonth) : null} />
            </Suspense>
          )}
        </>
      )}
    </PageContent>
  )
}
