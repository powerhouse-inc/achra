import { BreadcrumbSelectYear } from '@/modules/finances/components/breadcrumb-select-year'
import { NavigationCard } from '@/modules/finances/components/navigation-section'
import { SummarySection } from '@/modules/finances/components/summary-section'
import { TitleComponent } from '@/modules/finances/components/title-component/title-component'
import { WalletSection } from '@/modules/finances/components/wallet-sections'
import { WALLET_GROUPS } from '@/modules/finances/mocks/group'
import { PageContent } from '@/modules/shared/components/page-containers'
import { UsdsIcon } from '@/modules/shared/components/svgs'
import type { Route } from 'next'

interface FinancesPageProps {
  params: Promise<{
    slug: string
  }>
}

export default function FinancesPage({ params }: FinancesPageProps) {
  return (
    <main>
      <BreadcrumbSelectYear params={params} />
      <PageContent variant="with-breadcrumb" as="div" className="flex flex-col gap-4">
        <TitleComponent
          levelNumber={2}
          title="Powerhouse"
          code="atlas/immutable"
          description="Powerhouse is a network of power plants that produce electricity."
        />

        <WalletSection groupedWallets={WALLET_GROUPS} />
        <div className="mt-2 flex items-center justify-end gap-2 text-xs/5 font-semibold xl:text-sm">
          <UsdsIcon className="size-5 md:size-6" />
          *All values are converted to USDS
        </div>
        <SummarySection />

        <div className="flex flex-row flex-wrap gap-2">
          {/* TODO: replace with the actual data  and swipper*/}
          <NavigationCard
            image="https://raw.githubusercontent.com/makerdao-ses/makerdao-ses.github.io/16f73df6917a57915cd07e79f7a42e55293b8225/ecosystem-dashboard/budgets/endgame_atlas_budgets.svg"
            title="Powerhouse"
            description="Powerhouse is a network of power plants that produce electricity."
            href={'/network/powerhouse' as Route}
            code="atlas/immutable"
            isCompact={false}
          />
          <NavigationCard
            image="https://raw.githubusercontent.com/makerdao-ses/makerdao-ses.github.io/16f73df6917a57915cd07e79f7a42e55293b8225/ecosystem-dashboard/budgets/endgame_atlas_budgets.svg"
            title="Powerhouse"
            description="Powerhouse is a network of power plants that produce electricity."
            href={'/network/powerhouse' as Route}
            code="atlas/immutable"
            isCompact={false}
          />
          <NavigationCard
            image="https://raw.githubusercontent.com/makerdao-ses/makerdao-ses.github.io/16f73df6917a57915cd07e79f7a42e55293b8225/ecosystem-dashboard/budgets/endgame_atlas_budgets.svg"
            title="Powerhouse"
            description="Powerhouse is a network of power plants that produce electricity."
            href={'/network/powerhouse' as Route}
            code="atlas/immutable"
            isCompact={false}
          />
        </div>
      </PageContent>
    </main>
  )
}
