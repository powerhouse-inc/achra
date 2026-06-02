import { BuildersSectionSkeleton } from '@/modules/dashboard/components/builders-section/builders-section-skeleton'
import { FinancesSectionSkeleton } from '@/modules/dashboard/components/finances-section/finances-section-skeleton'
import { HomepageBannerSkeleton } from '@/modules/networks/components/homepage-banner/homepage-banner-skeleton'
import { PageContent } from '@/modules/shared/components/page-containers'

export default function NetworkPageLoading() {
  return (
    <PageContent className="gap-8">
      <HomepageBannerSkeleton />
      <BuildersSectionSkeleton />
      <FinancesSectionSkeleton />
    </PageContent>
  )
}
