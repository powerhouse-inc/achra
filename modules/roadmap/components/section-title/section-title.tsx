import { Info } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/components/ui/tooltip'

interface SectionTitleProps {
  title: string
  tooltip?: string
}

function SectionTitle({ title, tooltip }: SectionTitleProps) {
  return (
    <div className="flex items-center gap-2">
      <h2 className="text-secondary-foreground m-0 text-lg font-bold md:text-xl md:leading-6 xl:text-xl">
        {title}
      </h2>
      {tooltip && (
        <Tooltip>
          <TooltipTrigger>
            <Info className="text-foreground/30 size-4" />
          </TooltipTrigger>
          <TooltipContent className="max-w-66" side="bottom" align="start" arrowPadding={16}>
            {tooltip}
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  )
}

export { SectionTitle }
