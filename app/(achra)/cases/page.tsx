import { CasesHero } from '@/modules/cases/components/cases-hero'
import { UseCaseCardsSection } from '@/modules/cases/components/use-case-cards-section'

export default function CasesPage() {
  return (
    <main className="-mt-18 sm:-mt-24.5">
      <CasesHero />
      <UseCaseCardsSection />
    </main>
  )
}
