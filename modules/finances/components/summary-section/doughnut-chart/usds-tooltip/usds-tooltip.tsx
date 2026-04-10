import { InfoIcon } from 'lucide-react'

import { UsdsIconWithInfo } from '@/modules/shared/components/svgs'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/components/ui/tooltip'
import { cn } from '@/shared/lib/utils'

function UsdsTooltip() {
  return (
    <div
      data-slot="usds-tooltip-wrapper"
      className="flex h-full w-full items-center justify-center"
    >
      <div className="relative">
        <div className="text-secondary-foreground size-12">
          <UsdsIconWithInfo className="size-full" />
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              data-slot="icon-wrapper"
              className={cn(
                'absolute -bottom-1 left-6 flex cursor-pointer items-center justify-center rounded-full p-0.75',
                'bg-popover',
                '[&_path]:fill-secondary',
                'hover:[&_path]:fill-foreground',
              )}
            >
              <InfoIcon className="text-muted-foreground size-3.5 xl:size-4" />
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-xs">
            All amounts are in USDS
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}

export { UsdsTooltip }
