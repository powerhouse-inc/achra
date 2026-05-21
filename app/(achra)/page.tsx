import { BuildNetworkSection } from '@/modules/home/components/build-network-section'
import { FadeInSection } from '@/modules/home/components/fade-in-section'
import { FaqSection } from '@/modules/home/components/faq-section'
import { GovernanceOperationsSection } from '@/modules/home/components/governance-operations-section'
import { HomeHero } from '@/modules/home/components/home-hero'
import { HomeWaitlistSection } from '@/modules/home/components/home-waitlist-section'
import { OperationalHubSection } from '@/modules/home/components/operational-hub-section'
import { PowerhouseStackSection } from '@/modules/home/components/powerhouse-stack-section'
import { WhyAchraSection } from '@/modules/home/components/why-achra-section'

export default function HomePage() {
  return (
    <main className="-mt-18 bg-[#faf9f7] sm:-mt-24.5">
      <HomeHero />

      <FadeInSection>
        <BuildNetworkSection />
      </FadeInSection>
      <FadeInSection>
        <OperationalHubSection />
      </FadeInSection>
      <FadeInSection>
        <WhyAchraSection />
      </FadeInSection>
      <FadeInSection>
        <GovernanceOperationsSection />
      </FadeInSection>
      <FadeInSection>
        <PowerhouseStackSection />
      </FadeInSection>
      <FadeInSection>
        <FaqSection />
      </FadeInSection>
      <FadeInSection>
        <HomeWaitlistSection />
      </FadeInSection>
    </main>
  )
}
