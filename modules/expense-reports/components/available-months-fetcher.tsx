import { FileX } from 'lucide-react'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
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
import {
  getSelectedMonth,
  shouldRedirectToCleanUrl,
} from '@/modules/expense-reports/lib/month-navigation-utils'
import { formatMonthString } from '@/modules/expense-reports/lib/month-utils'
import { getBudgetStatementsAvailableMonths } from '@/modules/expense-reports/services/expense-reports-service'
import { TabSection } from '@/modules/expense-reports/types'
import { PageContent } from '@/modules/shared/components/page-containers'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/modules/shared/components/ui/empty'
import type { Route } from 'next'

interface AvailableMonthsFetcherProps {
  builderId: string
  builderLabel: string
  viewMonthParam: string | null
  section: TabSection
}

/**
 * Fetches available months for a team and renders the page content.
 * This component is wrapped in Suspense to make it dynamic (not cached),
 * ensuring fresh data on every request in production.
 */
export async function AvailableMonthsFetcher({
  builderId,
  builderLabel,
  viewMonthParam,
  section,
}: AvailableMonthsFetcherProps) {
  const availableMonths = await getBudgetStatementsAvailableMonths(builderId)

  if (availableMonths.length === 0) {
    return (
      <div className="container my-6">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FileX />
            </EmptyMedia>
            <EmptyTitle>No Expense Reports Data</EmptyTitle>
            <EmptyDescription>
              There&apos;s no Expense reports data for this builder.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    )
  }

  const selectedMonth = getSelectedMonth(availableMonths, viewMonthParam)
  const shouldRedirectToClean = shouldRedirectToCleanUrl(selectedMonth, viewMonthParam)

  if (shouldRedirectToClean) {
    // redirect to an URL with the correct viewMonth param
    const headersList = await headers()
    const url = headersList.get('x-url')
    if (!url) {
      throw new Error('URL header is not set. This is an error in the proxy configuration.')
    }
    const urlObject = new URL(url)
    urlObject.searchParams.set('viewMonth', formatMonthString(selectedMonth))
    return redirect(urlObject.toString() as Route)
  }

  return (
    <>
      <PageContent as="div" className="mt-4 mb-0 md:mt-6">
        <Suspense fallback={<MonthNavigationSkeleton />}>
          <MonthNavigation availableMonths={availableMonths} defaultMonth={selectedMonth} />
        </Suspense>

        <div>
          <div>Testing:</div>
          <div className="flex gap-2">
            {availableMonths.map((month) => (
              <div key={month.toISOString()}>{formatMonthString(month)}</div>
            ))}
          </div>
        </div>

        <div className="my-6">
          <Suspense fallback={<ExpenseReportTabsSkeleton />}>
            <ExpenseReportTabs />
          </Suspense>
        </div>
      </PageContent>

      {/* CONTENT 👇 */}

      {section === TabSection.ACCOUNT_SNAPSHOT && (
        <div className="container">
          <Suspense
            fallback={<AccountSnapshotSkeleton />}
            key={`${section}-${formatMonthString(selectedMonth)}`}
          >
            <AccountSnapshot month={selectedMonth} />
          </Suspense>
        </div>
      )}

      {section === TabSection.EXPENSE_REPORTS && (
        <Suspense
          fallback={<ExpenseReportsSectionSkeleton />}
          key={`${section}-${formatMonthString(selectedMonth)}`}
        >
          <ExpenseReportsSection
            teamId={builderId}
            month={selectedMonth}
            builderLabel={builderLabel}
          />
        </Suspense>
      )}

      {/* simulate the margin bottom of 32px */}
      <div className="h-8" />
    </>
  )
}
