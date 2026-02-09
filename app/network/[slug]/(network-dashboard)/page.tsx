import { Suspense } from 'react'
import { BuildersSection } from '@/modules/dashboard/components/builders-section/builders-section'
import { FinancesSection } from '@/modules/dashboard/components/finances-section/finances-section'
import {
  HomepageBanner,
  HomepageBannerSkeleton,
} from '@/modules/networks/components/homepage-banner'
import { getNetworkBySlug } from '@/modules/networks/services/networks-service'
import { PageContent } from '@/modules/shared/components/page-containers'
import type { SearchParams } from 'nuqs/server'

interface NetworkDashboardPageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<SearchParams>
}

export default async function NetworkDashboardPage({
  params,
  searchParams,
}: NetworkDashboardPageProps) {
  const { slug } = await params

  const networkData = await getNetworkBySlug(slug)

  const networkName = networkData?.name ?? ''

  return (
    <PageContent className="gap-8">
      <Suspense fallback={<HomepageBannerSkeleton />}>
        <HomepageBanner
          backgroundImage="/networks/backgrounds/powerhouse.png"
          title="Powerhouse Dashboard"
          description="Lorem ipsum dolor sit amet consectetur. In et sed malesuada ornare bibendum nisl egestas. Tellus semper facilisis elit mauris aliquam. Venenatis nunc sapien duis adipiscing proin mauris. Amet sed mauris natoque nisi porttitor montes. Elit vel euismod quis."
          isLoggedIn={false}
        />
      </Suspense>
      <BuildersSection networkSlug={slug} searchParams={searchParams} networkName={networkName} />
      <FinancesSection params={params} searchParams={searchParams} />
    </PageContent>
  )
}
