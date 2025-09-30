import { Copy } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/modules/shared/components/ui/tooltip'
import { cn } from '@/modules/shared/lib/utils'
import { Button } from '../ui/button'
import { useCopyButton } from './use-copy-button'

interface CopyButtonProps extends React.ComponentProps<typeof TooltipContent> {
  value: string
  tooltip?: string | null
  copiedTooltip?: string | null
  buttonClassName?: string
  tooltipClassName?: string
}

export function CopyButton({
  value,
  tooltip = 'Copy',
  copiedTooltip = 'Copied!',
  side = 'bottom',
  align = 'start',
  arrowPadding = 16,
  tooltipClassName,
  buttonClassName,
  ...props
}: CopyButtonProps) {
  const { currentTooltip, handleMouseEnter, handleMouseLeave, handleCopyAddress } = useCopyButton({
    tooltip,
    copiedTooltip,
  })

  return (
    <Tooltip open={!!currentTooltip} {...props}>
      <TooltipTrigger
        asChild
        onClick={(e) => void handleCopyAddress(e, value)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {props.children ?? (
          <Button variant="icon" size="iconXsm" className={buttonClassName}>
            <Copy className="size-4" />
          </Button>
        )}
      </TooltipTrigger>
      {currentTooltip && (
        <TooltipContent
          className={cn('pointer-events-none max-w-66', tooltipClassName)}
          side={side}
          align={align}
          arrowPadding={arrowPadding}
          {...props}
        >
          {currentTooltip}
        </TooltipContent>
      )}
    </Tooltip>
  )
}
