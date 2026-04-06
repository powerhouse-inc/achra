import { BuildNetworkSection } from '@/modules/home/components/build-network-section'
import { HomeHero } from '@/modules/home/components/home-hero'
import { OperationalHubSection } from '@/modules/home/components/operational-hub-section'
import { WhyAchraSection } from '@/modules/home/components/why-achra-section'
import { PageContent } from '@/modules/shared/components/page-containers'

export default function HomePage() {
  return (
    <main className="-mt-18 sm:-mt-24.5">
      <HomeHero />
      <BuildNetworkSection />
      <OperationalHubSection />
      <WhyAchraSection />
      <PageContent as="div">
        <p className="text-muted-foreground text-lg">TBD</p>
      </PageContent>
    </main>
  )
}
