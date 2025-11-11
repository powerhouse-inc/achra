import { BreadcrumbSelectYear } from '@/modules/finances/components/breadcrumb-select-year'
import { SummarySection } from '@/modules/finances/components/summary-section'
import { WalletSection } from '@/modules/finances/components/wallet-sections'
import { WALLET_GROUPS } from '@/modules/finances/mocks/group'
import { PageContent } from '@/modules/shared/components/page-containers'

export default function FinancesPage() {
  return (
    <main>
      <BreadcrumbSelectYear />
      <PageContent variant="with-breadcrumb" as="div" className="flex flex-col gap-4">
        <WalletSection groupedWallets={WALLET_GROUPS} />
        <SummarySection />
      </PageContent>
    </main>
  )
}
