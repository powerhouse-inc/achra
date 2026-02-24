import { headers } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { Suspense } from 'react'
import { getBuilderProfile } from '@/modules/builder-profile/services/builder-profile'
import {
  AccountSnapshotContainer,
  AccountSnapshotSkeleton,
} from '@/modules/expense-reports/components/account-snapshot'
import { BudgetStatementsEmptyState } from '@/modules/expense-reports/components/budget-statements-empty-state'
import { BudgetStatementsPageHeader } from '@/modules/expense-reports/components/budget-statements-page-header'
import {
  ExpenseReportTabs,
  ExpenseReportTabsSkeleton,
} from '@/modules/expense-reports/components/expense-report-tabs'
import {
  ExpenseReportsSection,
  ExpenseReportsSectionSkeleton,
} from '@/modules/expense-reports/components/expense-reports-section'
import {
  getSelectedMonth,
  shouldRedirectToCleanUrl,
} from '@/modules/expense-reports/lib/month-navigation-utils'
import { formatMonthString } from '@/modules/expense-reports/lib/month-utils'
import { expenseReportsSearchParamsCache } from '@/modules/expense-reports/lib/search-params-server'
import {
  getAccountSnapshotForMonth,
  getBudgetStatementForMonth,
  getBudgetStatementsAvailableMonths,
} from '@/modules/expense-reports/services/expense-reports-service'
import { TabSection } from '@/modules/expense-reports/types'
import { PageContent } from '@/modules/shared/components/page-containers'
import type { Route } from 'next'
import type { SearchParams } from 'nuqs/server'

interface ExpenseReportsPageProps {
  params: Promise<{ builderSlug: string }>
  searchParams: Promise<SearchParams>
}

export default async function ExpenseReportsPage({
  params,
  searchParams,
}: ExpenseReportsPageProps) {
  const { builderSlug } = await params
  const searchParamsResolved = await searchParams
  const searchParamsData = expenseReportsSearchParamsCache.parse(searchParamsResolved)

  const section = searchParamsData.section
  const viewMonthParam = searchParamsData.viewMonth ?? null

  const builder = await getBuilderProfile({ slug: builderSlug })
  if (!builder) {
    return notFound()
  }

  const availableMonthsWithMetadata = await getBudgetStatementsAvailableMonths(builder.id)

  if (availableMonthsWithMetadata.length === 0) {
    return (
      <div className="container my-6">
        <BudgetStatementsEmptyState />
      </div>
    )
  }

  const availableMonths = availableMonthsWithMetadata.map((m) => m.month)
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

  const accountSnapshotBuilderName =
    builder.operationalHubMember.name ?? builder.name ?? builder.slug ?? builder.code ?? ''

  const [budgetStatement, { snapshotReport }] = await Promise.all([
    getBudgetStatementForMonth(builder.id, selectedMonth),
    getAccountSnapshotForMonth(builder.id, selectedMonth),
  ])
  const areBothDataEmpty =
    (budgetStatement === null || budgetStatement.expenseReport.wallets.length === 0) &&
    (snapshotReport?.accounts?.length ?? 0) === 0

  return (
    <>
      <PageContent as="div" className="mt-4 mb-0 md:mt-6">
        <BudgetStatementsPageHeader
          availableMonthsWithMetadata={availableMonthsWithMetadata.map((m) => ({
            month: m.month.toISOString(),
            status: m.status,
            lastUpdate: m.lastUpdate,
          }))}
          defaultMonthIso={selectedMonth.toISOString()}
        />

        {!areBothDataEmpty && (
          <div className="my-6">
            <Suspense fallback={<ExpenseReportTabsSkeleton />}>
              <ExpenseReportTabs />
            </Suspense>
          </div>
        )}
      </PageContent>

      {/* CONTENT 👇 */}

      {areBothDataEmpty ? (
        <BudgetStatementsEmptyState />
      ) : (
        <>
          {section === TabSection.ACCOUNT_SNAPSHOT && (
            <div className="container">
              <Suspense
                fallback={<AccountSnapshotSkeleton />}
                key={`${section}-${formatMonthString(selectedMonth)}`}
              >
                <AccountSnapshotContainer
                  teamId={builder.id}
                  builderName={accountSnapshotBuilderName}
                  month={selectedMonth}
                />
              </Suspense>
            </div>
          )}

          {section === TabSection.EXPENSE_REPORTS && (
            <Suspense
              fallback={<ExpenseReportsSectionSkeleton />}
              key={`${section}-${formatMonthString(selectedMonth)}`}
            >
              <ExpenseReportsSection
                teamId={builder.id}
                month={selectedMonth}
                builderLabel={builder.name ?? builder.code ?? 'this builder'}
              />
            </Suspense>
          )}
        </>
      )}

      {/* simulate the margin bottom of 32px */}
      <div className="h-8" />
    </>
  )
}
