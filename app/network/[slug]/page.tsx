import { HomepageBanner } from '@/modules/networks/components/homepage-banner'
import { PROPOSALS } from '@/modules/networks/components/proposals-section/mocks/proposals'
import ProposalsSection from '@/modules/networks/components/proposals-section/proposals-section'
import { RoadmapSection } from '@/modules/networks/components/roadmap-section'
import { FinacesSection } from '@/modules/networks/sections/finances-section'
import { mockedRoadmap } from '@/modules/roadmap/mocks'

export default function NetworkPage() {
  return (
    <main className="container mt-8 mb-8 flex flex-col gap-8">
      <HomepageBanner
        title="Sky DAO Dashboard"
        description="Welcome to the Sky Fusion Dashboard, your hub for key insights into Sky Ecosystem's finances, governance, teams, and roadmaps. Get up-to-date data and explore strategic developments to stay informed about Sky's progress and plans."
        isLoggedIn={true}
      />

      <ProposalsSection proposals={PROPOSALS} />
      <RoadmapSection roadmap={mockedRoadmap} />
      <FinacesSection />
      <p className="text-muted-foreground sm:text-md mt-12 text-base">Coming soon</p>
    </main>
  )
}
