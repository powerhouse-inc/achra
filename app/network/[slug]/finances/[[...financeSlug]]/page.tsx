import { BreadcrumbSelectYear } from '@/modules/finances/components/breadcrumb-select-year'
import { WalletSection } from '@/modules/finances/components/wallet-sections'
import { WALLET_GROUPS } from '@/modules/finances/mocks/group'
import { PageContent } from '@/modules/shared/components/page-containers'

interface FinancesPageProps {
  params: Promise<{
    slug: string
  }>
}

export default function FinancesPage({ params }: FinancesPageProps) {
  return (
    <main>
      <BreadcrumbSelectYear params={params} />
      <PageContent variant="with-breadcrumb" as="div">
        <WalletSection groupedWallets={WALLET_GROUPS} />
      </PageContent>
    </main>
  )
}
