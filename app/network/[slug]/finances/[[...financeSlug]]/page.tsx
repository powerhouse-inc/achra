import { Suspense } from 'react'
import { FinancesBreadcrumb } from '@/modules/finances/components/breadcrumb-select-year/finances-breadcrumb'
// import { BreakdownChartCardWrapper } from '@/modules/finances/components/breakdonw-chart/breakdown-chart-card-content'
import { BreakdownChartCardWrapper } from '@/modules/finances/components/breakdonw-chart/breakdown-chart-card-wrapper'
import BudgetStatementsSection from '@/modules/finances/components/budget-statements-section/budget-statements-section'
import { BudgetStatementsSectionSkeleton } from '@/modules/finances/components/budget-statements-section/budget-statements-skeleton/budget-statements-section-skeleton'
import { FINANCES_SECTIONS_ENCODED } from '@/modules/finances/components/config/const'
import { NavigationSection } from '@/modules/finances/components/navigation-section'
import { NavigationCardSkeletons } from '@/modules/finances/components/navigation-section/navigation-card-skeleton'
import { SummarySectionSkeleton } from '@/modules/finances/components/summary-section/summary-section-skeleton'
import { SummarySectionWrapper } from '@/modules/finances/components/summary-section/summary-section-wrapper'
import { TitleComponentSkeleton } from '@/modules/finances/components/title-component/title-component-skeleton'
import { TitleComponentWrapper } from '@/modules/finances/components/title-component/title-component-wrapper'
import { WalletSection } from '@/modules/finances/components/wallet-sections'
import { WALLET_GROUPS } from '@/modules/finances/mocks/group-wallets'

import { BreadcrumbSkeleton, PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb'
import { PageContent } from '@/modules/shared/components/page-containers'
import { SectionActivation } from '@/modules/shared/components/section-activation'
import { UsdsIcon } from '@/modules/shared/components/svgs'
import ff from '@/modules/shared/lib/feature-flags'

interface FinancesPageProps {
  params: Promise<{
    slug: string
    financeSlug?: string[]
  }>
  searchParams: Promise<{
    year: string
  }>
}

export default function FinancesPage({ params, searchParams }: FinancesPageProps) {
  return (
    <main>
      <PageBreadcrumbContainer>
        <Suspense fallback={<BreadcrumbSkeleton segments={3} />}>
          <FinancesBreadcrumb params={params} />
        </Suspense>
      </PageBreadcrumbContainer>
      <PageContent variant="with-breadcrumb" as="div" className="flex flex-col gap-4">
        <Suspense fallback={<TitleComponentSkeleton />}>
          <TitleComponentWrapper params={params} />
        </Suspense>

        {ff.finances.WALLETS_ENABLED && <WalletSection groupedWallets={WALLET_GROUPS} />}

        {ff.finances.SUMMARY_SECTION_ENABLED && (
          <>
            <div className="mt-2 flex items-center justify-end gap-2 text-xs/5 font-semibold xl:text-sm">
              <UsdsIcon className="size-5 md:size-6" />
              *All values are converted to USDS
            </div>
            <Suspense fallback={<SummarySectionSkeleton />}>
              <SummarySectionWrapper params={params} />
            </Suspense>
          </>
        )}

        {ff.finances.NAVIGATION_SECTION_ENABLED && (
          <Suspense fallback={<NavigationCardSkeletons />}>
            <NavigationSection params={params} />
          </Suspense>
        )}

        {ff.finances.BREAKDOWN_CHART_SECTION_ENABLED && (
          <Suspense fallback={<div>loading....</div>}>
            <BreakdownChartCardWrapper params={params} searchParams={searchParams} />
          </Suspense>
        )}

        <Suspense fallback={<BudgetStatementsSectionSkeleton />}>
          <BudgetStatementsSection />
        </Suspense>

        <SectionActivation sections={FINANCES_SECTIONS_ENCODED} />
      </PageContent>
    </main>
  )
}
