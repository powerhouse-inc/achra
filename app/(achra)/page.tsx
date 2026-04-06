import { BuildNetworkSection } from '@/modules/home/components/build-network-section'
import { FaqSection } from '@/modules/home/components/faq-section'
import { GovernanceOperationsSection } from '@/modules/home/components/governance-operations-section'
import { HomeHero } from '@/modules/home/components/home-hero'
import { HomeWaitlistSection } from '@/modules/home/components/home-waitlist-section'
import { OperationalHubSection } from '@/modules/home/components/operational-hub-section'
import { PowerhouseStackSection } from '@/modules/home/components/powerhouse-stack-section'
import { WhyAchraSection } from '@/modules/home/components/why-achra-section'

export default function HomePage() {
  return (
    <main className="-mt-18 sm:-mt-24.5">
      <HomeHero />
      <BuildNetworkSection />
      <OperationalHubSection />
      <WhyAchraSection />
      <GovernanceOperationsSection />
      <PowerhouseStackSection />
      <FaqSection />
      <HomeWaitlistSection />
    </main>
  )
}
