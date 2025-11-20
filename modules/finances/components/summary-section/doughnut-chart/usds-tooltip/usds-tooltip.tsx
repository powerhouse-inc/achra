import { InfoIcon } from 'lucide-react'

import { UsdsIconWithInfo } from '@/modules/shared/components/svgs'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/components/ui/tooltip'
import { cn } from '@/shared/lib/utils'

export function UsdsTooltip() {
  return (
    <div
      data-slot="usds-tooltip-wrapper"
      className="flex h-full w-full items-center justify-center"
    >
      <div className="relative">
        <UsdsIconWithInfo />
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              data-slot="icon-wrapper"
              className={cn(
                'absolute -bottom-2 left-4.5 flex cursor-pointer items-center justify-center rounded-full p-0.75',
                'bg-popover',
                '[&_path]:fill-secondary',
                'hover:[&_path]:fill-foreground',
              )}
            >
              <InfoIcon className="text-muted-foreground size-4" />
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
