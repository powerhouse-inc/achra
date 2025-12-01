'use client'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { InfoIcon } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { MobileDialogContent } from '@/modules/networks/components/card-bar-chart/tooltips/mobile-tooltip-modal'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/modules/shared/components/ui/hover-card'
import { cn } from '@/modules/shared/lib/utils'

interface TooltipInfoIconProps {
  tooltipContent: React.ReactNode
  className?: string
}
const TOOLTIP_WIDTH = 320

export function TooltipInfoIcon({ tooltipContent, className }: TooltipInfoIconProps) {
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
        <HoverCard openDelay={200} closeDelay={100} onOpenChange={handleOpenChange}>
          <HoverCardTrigger asChild>
            <button
              ref={triggerRef}
              type="button"
              aria-label="View more information"
              className="flex cursor-pointer items-center"
            >
              <InfoIcon className="text-muted-foreground h-4 w-4" />
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
      </div>
    </div>
  )
}
