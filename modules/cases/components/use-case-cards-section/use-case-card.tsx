import type { UseCase } from '../../data/use-cases-data'

const TAG_STYLES: Record<string, string> = {
  'Network Organizations': 'border-green-400 text-green-700',
  'Open Source': 'border-green-400 text-green-700',
  'Public Goods': 'border-rose-400 text-rose-700',
  'Network States': 'border-blue-400 text-blue-700',
  'Community Organizations': 'border-green-400 text-green-700',
}

interface UseCaseCardProps {
  useCase: UseCase
}

function UseCaseCard({ useCase }: UseCaseCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-[rgb(250,249,247)] p-6 sm:p-8">
      <div className="flex flex-wrap gap-2">
        {useCase.tags.map((tag) => (
          <span
            key={tag}
            className={`rounded-full border px-3 py-1 text-xs font-medium ${TAG_STYLES[tag] ?? 'border-gray-400 text-gray-700'}`}
          >
            {tag}
          </span>
        ))}
      </div>

      <h3 className="text-lg font-bold tracking-tight sm:text-xl">{useCase.title}</h3>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-3">
          <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
            {useCase.description}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {useCase.benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <div key={Icon.displayName} className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-purple-100">
                  <Icon className="size-5 text-purple-500" />
                </div>
                <p className="text-sm leading-relaxed sm:text-base">{benefit.text}</p>
              </div>
            )
          })}
        </div>
      </div>

      {useCase.note && (
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{useCase.note}</p>
      )}
    </div>
  )
}

export { UseCaseCard }
