import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { getBuilderProfile } from '@/modules/builder-profile/services/builder-profile'
import { AvailableMonthsFetcher } from '@/modules/expense-reports/components/available-months-fetcher'
import { MonthNavigationSkeleton } from '@/modules/expense-reports/components/month-navigation'
import { expenseReportsSearchParamsCache } from '@/modules/expense-reports/lib/search-params-server'
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

  return (
    <Suspense fallback={<MonthNavigationSkeleton />}>
      <AvailableMonthsFetcher
        builderId={builder.id}
        builderLabel={builder.name ?? builder.code ?? 'this builder'}
        viewMonthParam={viewMonthParam}
        section={section}
      />
    </Suspense>
  )
}
