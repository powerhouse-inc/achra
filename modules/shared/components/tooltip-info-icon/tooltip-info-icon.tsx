'use client'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { InfoIcon } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { MobileDialogContent } from '@/modules/shared/components/mobile-dialog-content'
import { cn } from '@/modules/shared/lib/utils'

interface TooltipInfoIconProps {
  tooltipContent: React.ReactNode
  className?: string
}
const TOOLTIP_WIDTH = 320

function TooltipInfoIcon({ tooltipContent, className }: TooltipInfoIconProps) {
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

  return (
    <div className={cn('flex cursor-pointer items-center', className)}>
      <div className="md:hidden">
        <DialogPrimitive.Root>
          <DialogPrimitive.Trigger asChild>
            <button type="button" aria-label="View more information">
              <InfoIcon className="text-muted-foreground h-4 w-4" />
            </button>
          </DialogPrimitive.Trigger>
          <MobileDialogContent>
            <VisuallyHidden>
              <DialogPrimitive.Title>Tooltip</DialogPrimitive.Title>
            </VisuallyHidden>
            <div className="text-muted-foreground text-sm">{tooltipContent}</div>
          </MobileDialogContent>
        </DialogPrimitive.Root>
      </div>
      <div className="hidden md:block">
        <TooltipPrimitive.Provider delayDuration={200}>
          <TooltipPrimitive.Root onOpenChange={handleOpenChange}>
            <TooltipPrimitive.Trigger asChild>
              <button
                ref={triggerRef}
                type="button"
                aria-label="View more information"
                className="flex cursor-pointer items-center"
              >
                <InfoIcon className="text-muted-foreground h-4 w-4" />
              </button>
            </TooltipPrimitive.Trigger>
            <TooltipPrimitive.Portal>
              <TooltipPrimitive.Content
                side="bottom"
                sideOffset={10}
                collisionPadding={16}
                align={alignment}
                className={cn(
                  'bg-popover text-popover-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-80 origin-(--radix-tooltip-content-transform-origin) rounded-xl border p-4 shadow-md',
                )}
              >
                <div className="text-sm">{tooltipContent}</div>
              </TooltipPrimitive.Content>
            </TooltipPrimitive.Portal>
          </TooltipPrimitive.Root>
        </TooltipPrimitive.Provider>
      </div>
    </div>
  )
}

export { TooltipInfoIcon }
