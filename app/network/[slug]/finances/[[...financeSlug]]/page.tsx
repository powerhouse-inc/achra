import { BreadcrumbSelectYear } from '@/modules/finances/components/breadcrumb-select-year'
import { NavigationSection } from '@/modules/finances/components/navigation-section/navigation-section'
import { SummarySection } from '@/modules/finances/components/summary-section'
import { TitleComponent } from '@/modules/finances/components/title-component/title-component'
import { WalletSection } from '@/modules/finances/components/wallet-sections'
import { WALLET_GROUPS } from '@/modules/finances/mocks/group'
import { PageContent } from '@/modules/shared/components/page-containers'
import { UsdsIcon } from '@/modules/shared/components/svgs'

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
        <NavigationSection />
      </PageContent>
    </main>
  )
}
