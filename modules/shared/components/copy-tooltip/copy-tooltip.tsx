import { Copy } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/modules/shared/components/ui/tooltip'
import { cn } from '@/modules/shared/lib/utils'
import { Button } from '../ui/button'

interface CopyTooltipProps extends React.ComponentProps<typeof Tooltip> {
  icon?: React.ReactNode
  tooltip: string | null
  onTriggerClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  onTriggerMouseEnter: () => void
  onTriggerMouseLeave: () => void
  tooltipClassName?: string
}

export function CopyTooltip({
  icon = <Copy className="size-4" />,
  tooltip,
  onTriggerClick,
  onTriggerMouseEnter,
  onTriggerMouseLeave,
  tooltipClassName,
  ...props
}: CopyTooltipProps) {
  return (
    <Tooltip {...props}>
      <TooltipTrigger asChild>
        <Button
          variant="icon"
          size="iconXsm"
          onClick={onTriggerClick}
          onMouseEnter={onTriggerMouseEnter}
          onMouseLeave={onTriggerMouseLeave}
        >
          {icon}
        </Button>
      </TooltipTrigger>
      {tooltip && (
        <TooltipContent
          className={cn('pointer-events-none max-w-66', tooltipClassName)}
          side="bottom"
          align="start"
          arrowPadding={16}
        >
          {tooltip}
        </TooltipContent>
      )}
    </Tooltip>
  )
}
