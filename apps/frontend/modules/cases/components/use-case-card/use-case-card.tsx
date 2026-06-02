import { TAG_CHIP_CONFIG } from '@/modules/cases/lib/constants'
import type { UseCase } from '@/modules/cases/types'
import { GenericChip } from '@/shared/components/chips/generic-chip/generic-chip'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'

interface UseCaseCardProps {
  useCase: UseCase
}

function UseCaseCard({ useCase }: UseCaseCardProps) {
  return (
    <Card className="gap-4 border-0 p-6 shadow-xs sm:p-8">
      <CardHeader className="flex flex-col gap-4 p-0">
        <div className="flex flex-wrap gap-2">
          {useCase.tags.map((tag) => {
            const config = TAG_CHIP_CONFIG[tag]
            return (
              <GenericChip
                key={tag}
                as="span"
                variant="filled"
                color={config?.color ?? 'gray'}
                className={
                  config?.className ??
                  'border-border bg-muted text-muted-foreground rounded-full border normal-case'
                }
              >
                {tag}
              </GenericChip>
            )
          })}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 p-0">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <CardTitle className="text-lg font-bold tracking-tight sm:text-xl">
              {useCase.title}
            </CardTitle>
            <p className="text-sm leading-relaxed sm:text-base">{useCase.description}</p>
          </div>

          <div className="flex flex-col gap-4">
            {useCase.benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <div key={Icon.displayName} className="flex items-start gap-3">
                  <div className="bg-primary/10 flex size-8 shrink-0 items-center justify-center rounded-lg">
                    <Icon className="text-primary size-5" />
                  </div>
                  <p className="text-foreground/80 text-sm">{benefit.text}</p>
                </div>
              )
            })}
          </div>
        </div>

        {useCase.note && (
          <div className="text-muted-foreground mt-2 text-sm leading-relaxed">{useCase.note}</div>
        )}
      </CardContent>
    </Card>
  )
}

export { UseCaseCard }
