'use client'

import { Check, Copy, type LucideIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import React, { createContext, useContext } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/modules/shared/components/ui/tooltip'
import { cn } from '@/modules/shared/lib/utils'
import { Button } from '../ui/button'
import { useCopyButton } from './use-copy-button'

type Value = string | (() => string)

interface CopyButtonContextValue extends ReturnType<typeof useCopyButton> {
  value: Value
}

const CopyButtonContext = createContext<CopyButtonContextValue | null>(null)

function useCopyButtonContext() {
  const context = useContext<CopyButtonContextValue | null>(CopyButtonContext)
  if (!context) {
    throw new Error('CopyButton components must be used within a <CopyButton>')
  }
  return context
}

/**
 * @name CopyButton
 * @description
 * Initializes the state and provides the context for its subcomponents.
 */
interface CopyButtonProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: Value
  resetDelay?: number
  children: React.ReactNode
}

function CopyButton({ value, resetDelay, children, ...props }: CopyButtonProps) {
  const clipboardState = useCopyButton({ resetDelay })
  const contextValue = { ...clipboardState, value }

  return (
    <CopyButtonContext.Provider value={contextValue}>
      <span className="inline-flex" {...props}>
        {children}
      </span>
    </CopyButtonContext.Provider>
  )
}

/**
 * @name CopyTooltip
 * @description Wraps its child with a Tooltip that reacts to the copy state.
 * Accepts all props of TooltipContent from ShadCN/UI.
 */
interface CopyTooltipProps extends Omit<React.ComponentProps<typeof TooltipContent>, 'children'> {
  tooltip?: string
  copiedTooltip?: string
  children: React.ReactNode
  className?: string
}

function CopyTooltip({
  tooltip = 'Copy',
  copiedTooltip = 'Copied!',
  children,
  className,
  ...props
}: CopyTooltipProps) {
  const { isCopied, isHovered, setIsHovered } = useCopyButtonContext()
  const tooltipText = isCopied ? copiedTooltip : tooltip

  const handleMouseEnter = React.useCallback(() => {
    setIsHovered(true)
  }, [setIsHovered])

  const handleMouseLeave = React.useCallback(() => {
    setIsHovered(false)
  }, [setIsHovered])

  return (
    <Tooltip open={isHovered}>
      <TooltipTrigger asChild onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </TooltipTrigger>
      {tooltipText && (
        <TooltipContent
          className={cn('pointer-events-none', className)}
          sideOffset={4}
          avoidCollisions={true}
          collisionPadding={8}
          {...props}
        >
          {tooltipText}
        </TooltipContent>
      )}
    </Tooltip>
  )
}

/**
 * @name CopyTrigger
 * @description The button that triggers the copy action.
 * Accepts all props of a Button from ShadCN/UI.
 */
const Trigger = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ onClick, children, ...props }, ref) => {
    const { handleCopy, value } = useCopyButtonContext()

    const onCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      void handleCopy(typeof value === 'function' ? value() : value)
      onClick?.(e)
    }

    return (
      <Button
        ref={ref}
        onClick={onCopy}
        variant="icon"
        size="iconXsm"
        aria-label="Copy to clipboard"
        {...props}
      >
        {children}
      </Button>
    )
  },
)
Trigger.displayName = 'CopyTrigger'

/**
 * @name CopyAnimatedIcon
 * @description
 * Shows an icon that animates from 'Copy' to a custom icon (defaults to 'Check')
 * when the state changes to copied.
 */
interface AnimatedIconProps extends React.ComponentProps<typeof Copy> {
  copiedIcon?: LucideIcon
}

function AnimatedIcon({ copiedIcon: CopiedIcon = Check, ...props }: AnimatedIconProps) {
  const { isCopied } = useCopyButtonContext()

  return (
    <AnimatePresence mode="wait" initial={false}>
      {isCopied ? (
        <motion.div
          key="check"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: [0.5, 1.2, 1] }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <CopiedIcon className="size-4" {...props} />
        </motion.div>
      ) : (
        <motion.div
          key="copy"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <Copy className="size-4" {...props} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { CopyButton, CopyTooltip, Trigger as CopyTrigger, AnimatedIcon as CopyAnimatedIcon }
