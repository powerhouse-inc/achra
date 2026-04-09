'use client'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { InfoIcon } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { MobileDialogContent } from '@/modules/shared/components/mobile-dialog-content'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/modules/shared/components/ui/hover-card'
import { useIsMobile } from '@/modules/shared/hooks/use-mobile'
import { cn } from '@/modules/shared/lib/utils'

interface SpendingItemProps extends React.PropsWithChildren {
  title: string
  shortTitle?: string
  tooltipContent: React.ReactNode
  className?: string
}
const TOOLTIP_WIDTH = 320

export function SpendingItem({
  title,
  shortTitle,
  tooltipContent,
  children,
  className,
}: SpendingItemProps) {
  const isMobile = useIsMobile()

  const [alignment, setAlignment] = useState<'start' | 'end'>('start')
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const calculateAlignment = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const newAlignment = rect.right + TOOLTIP_WIDTH > viewportWidth ? 'end' : 'start'
      setAlignment(newAlignment)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return

    window.addEventListener('resize', calculateAlignment)

    return () => {
      window.removeEventListener('resize', calculateAlignment)
    }
  }, [calculateAlignment, isOpen])

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open)
      if (open) {
        calculateAlignment()
      }
    },
    [calculateAlignment],
  )

  const triggerAriaLabel = 'View more information'
  const TriggerIcon = <InfoIcon className="text-muted-foreground h-2.5 w-2.5" />

  return (
    <div
      className={cn(
        'relative flex w-full flex-col items-center rounded-xl sm:items-start md:justify-center md:bg-none xl:px-4 xl:py-1',
        'border-input border',
        'p-2 pt-3 pr-2 pb-2 pl-4 sm:px-2 sm:py-1.5',
      )}
    >
      <div className="bg-popover sm:bg-accent absolute -top-2.5 left-8 flex items-center gap-2 px-2 sm:-top-3 sm:left-1 sm:px-2 md:-top-2 md:rounded-lg md:px-1">
        <span
          className={cn(
            // text
            'text-popover-foreground text-xs/4.5 font-medium xl:text-sm xl:leading-4',
            // position
            'md:left-8 md:py-0 xl:left-4',
          )}
        >
          {shortTitle && <span className="hidden sm:block xl:hidden">{shortTitle}</span>}
          {shortTitle && <span className="block sm:hidden xl:block">{title}</span>}
          {!shortTitle && <span className="block">{title}</span>}
        </span>

        {isMobile ? (
          <DialogPrimitive.Root>
            <DialogPrimitive.Trigger asChild>
              <button type="button" aria-label={triggerAriaLabel}>
                {TriggerIcon}
              </button>
            </DialogPrimitive.Trigger>
            <MobileDialogContent>
              <VisuallyHidden>
                <DialogPrimitive.Title>{title}</DialogPrimitive.Title>
              </VisuallyHidden>
              <div className="text-muted-foreground text-sm">{tooltipContent}</div>
            </MobileDialogContent>
          </DialogPrimitive.Root>
        ) : (
          <HoverCard openDelay={200} closeDelay={100} onOpenChange={handleOpenChange}>
            <HoverCardTrigger asChild>
              <button
                ref={triggerRef}
                type="button"
                aria-label={triggerAriaLabel}
                className="flex cursor-pointer items-center"
              >
                {TriggerIcon}
              </button>
            </HoverCardTrigger>
            <HoverCardContent
              side="bottom"
              sideOffset={10}
              collisionPadding={16}
              align={alignment}
              className="bg-popover w-80 rounded-xl border p-4 shadow-md"
            >
              <div className="text-sm">{tooltipContent}</div>
            </HoverCardContent>
          </HoverCard>
        )}
      </div>
      <div className={cn('flex gap-6 sm:flex-col sm:justify-start sm:gap-2', className)}>
        {children}
      </div>
    </div>
  )
}
