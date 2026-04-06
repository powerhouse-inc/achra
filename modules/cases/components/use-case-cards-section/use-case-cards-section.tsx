import { useCasesData } from '../../data/use-cases-data'
import { UseCaseCard } from './use-case-card'

function UseCaseCardsSection() {
  return (
    <section
      className="bg-background w-full px-6 py-14 sm:px-10 sm:py-16 lg:py-20"
      aria-labelledby="use-cases-heading"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10">
        <h2 id="use-cases-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Use Cases
        </h2>
        <div className="flex flex-col gap-8">
          {useCasesData.map((useCase) => (
            <UseCaseCard key={useCase.title} useCase={useCase} />
          ))}
        </div>
      </div>
    </section>
  )
}

export { UseCaseCardsSection }
