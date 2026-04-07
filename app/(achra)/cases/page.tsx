import { CasesHero } from '@/modules/cases/components/cases-hero'
import { UseCaseCard } from '@/modules/cases/components/use-case-card'
import { useCasesData } from '@/modules/cases/data/use-cases-data'

export default function CasesPage() {
  return (
    <main className="-mt-18 bg-[#faf9f7] sm:-mt-24.5">
      <CasesHero />

      <section
        className="relative z-10 -mt-18 w-full px-6 pb-14 sm:px-10 sm:pb-16 lg:pb-20"
        aria-labelledby="use-cases-heading"
      >
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          <h2 id="use-cases-heading" className="text-2xl font-semibold tracking-tight">
            Use Cases
          </h2>
          <div className="flex flex-col gap-8">
            {useCasesData.map((useCase) => (
              <UseCaseCard key={useCase.title} useCase={useCase} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
