import { CircleCheckBigIcon } from 'lucide-react'
import { Badge } from '@/shared/components/ui/badge'
import type { UseCase } from '../../data/use-cases-data'

type UseCaseCardProps = {
  useCase: UseCase
}

function UseCaseCard({ useCase }: UseCaseCardProps) {
  return (
    <div className="flex flex-col gap-5 border-t pt-6">
      <div className="flex flex-wrap gap-2">
        {useCase.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="rounded-full">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold tracking-tight sm:text-xl">{useCase.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{useCase.description}</p>
          {useCase.note && (
            <p className="text-muted-foreground/80 text-xs leading-relaxed italic">
              {useCase.note}
            </p>
          )}
        </div>

        <ul className="flex flex-col gap-3">
          {useCase.benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2.5 text-sm leading-relaxed">
              <CircleCheckBigIcon className="text-primary mt-0.5 size-4 shrink-0" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export { UseCaseCard }
