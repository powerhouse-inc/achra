import { GenericChip } from '@/modules/shared/components/chips/generic-chip/generic-chip'
import type { VariantColorType } from '@/modules/shared/components/chips/generic-chip/variant-styles'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import type { UseCase } from '../../data/use-cases-data'

interface TagChipStyle {
  color: VariantColorType
  className: string
}

/** Filled chip colors aligned with use-case tag design (light bg + saturated text). */
const TAG_CHIP_CONFIG: Partial<Record<string, TagChipStyle>> = {
  'Open Source': {
    color: 'purple',
    className: 'normal-case bg-[#E0D7FF] text-[#7C5CFF]',
  },
  'Public Goods': {
    color: 'red',
    className: 'normal-case bg-[#FAD8F4] text-[#E056D2]',
  },
  'Network States': {
    color: 'blue',
    className: 'normal-case bg-[#D1E9FF] text-[#007AFF]',
  },
  'Community Organizations': {
    color: 'green',
    className: 'normal-case bg-[#D1FADF] text-[#34D399]',
  },
  'Network Organizations': {
    color: 'blue',
    className: 'normal-case bg-[#D1E9FF] text-[#007AFF]',
  },
}

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
