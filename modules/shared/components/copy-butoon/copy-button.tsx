'use client'
import { Check, Copy } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/modules/shared/components/ui/tooltip'
import { cn } from '@/modules/shared/lib/utils'
import { Button } from '../ui/button'
import { useCopyToClipboard } from './use-copy-button'

interface CopyButtonProps extends React.ComponentProps<typeof TooltipContent> {
  value: string
  variant?: 'tooltip' | 'icon'
  tooltip?: string | null
  copiedTooltip?: string | null
  buttonClassName?: string
  tooltipClassName?: string
  resetDelay?: number
}

export function CopyButton({
  value,
  variant = 'tooltip',
  tooltip = 'Copy',
  copiedTooltip = 'Copied!',
  side = 'bottom',
  align = 'start',
  arrowPadding = 16,
  tooltipClassName,
  buttonClassName,
  resetDelay = 2000,
  ...props
}: CopyButtonProps) {
  const { isCopied, handleCopy } = useCopyToClipboard({ resetDelay })
  const [isHovered, setIsHovered] = useState(false)

  const onCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    void handleCopy(value)
  }

  if (variant === 'icon') {
    return (
      <Button
        variant="icon"
        size="iconXsm"
        className={cn('size-4', buttonClassName)}
        onClick={onCopy}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isCopied ? (
            <motion.div
              key="check"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: [0.5, 1.2, 1] }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <Check className="size-4" />
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <Copy className="size-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    )
  }

  const tooltipText = isCopied ? copiedTooltip : tooltip
  const isTooltipOpen = isCopied || isHovered

  return (
    <Tooltip open={isTooltipOpen} delayDuration={100}>
      <TooltipTrigger
        asChild
        onClick={onCopy}
        onMouseEnter={() => {
          setIsHovered(true)
        }}
        onMouseLeave={() => {
          setIsHovered(false)
        }}
      >
        {props.children ?? (
          <Button variant="icon" size="iconXsm" className={buttonClassName}>
            <Copy className="size-4" />
          </Button>
        )}
      </TooltipTrigger>
      {tooltipText && (
        <TooltipContent
          className={cn('pointer-events-none max-w-66', tooltipClassName)}
          side={side}
          align={align}
          arrowPadding={arrowPadding}
          {...props}
        >
          {tooltipText}
        </TooltipContent>
      )}
    </Tooltip>
  )
}
