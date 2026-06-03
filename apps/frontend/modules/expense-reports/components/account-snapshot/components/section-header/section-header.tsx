import { cva, type VariantProps } from 'class-variance-authority'
import { InfoIcon } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/modules/shared/components/ui/tooltip'

const titleVariants = cva('font-bold text-foreground leading-[120%]', {
  variants: {
    level: {
      h1: 'text-xl',
      h2: 'text-lg',
      h3: 'text-base/6',
    },
  },
  defaultVariants: {
    level: 'h1',
  },
})

interface SectionHeaderProps {
  title: string
  subtitle?: React.ReactNode
  tooltip?: React.ReactNode
  level?: VariantProps<typeof titleVariants>['level']
}

function SectionHeader({ title, subtitle, tooltip, level = 'h1' }: SectionHeaderProps) {
  const TitleElement = (level ?? 'h1') as React.ElementType

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <TitleElement className={titleVariants({ level })}>{title}</TitleElement>

        {tooltip && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label={`Information about ${title}`}
                className="flex cursor-pointer items-center"
              >
                <InfoIcon className="text-foreground/50 size-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="start" className="max-w-70" arrowPadding={16}>
              {tooltip}
            </TooltipContent>
          </Tooltip>
        )}
      </div>

      <div className="text-foreground/50 text-sm/4.5 lg:text-base/5.5">{subtitle}</div>
    </div>
  )
}

export { SectionHeader }
