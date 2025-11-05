'use client'

import { useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

interface HoverPopoverProps {
  trigger: React.ReactNode
  children: React.ReactNode
  popoverProps?: React.ComponentProps<typeof Popover>
  triggerProps?: React.ComponentProps<typeof PopoverTrigger>
  contentProps?: React.ComponentProps<typeof PopoverContent>
}

export function HoverPopover({
  trigger,
  children,
  popoverProps,
  triggerProps,
  contentProps,
}: HoverPopoverProps) {
  const [open, setOpen] = useState(false)
  const [debouncedOpen] = useDebounceValue(open, 200)

  const handleMouseEnter = () => {
    setOpen(true)
  }

  const handleMouseLeave = () => {
    setOpen(false)
  }

  return (
    <Popover {...popoverProps} open={debouncedOpen} onOpenChange={setOpen}>
      <PopoverTrigger
        {...triggerProps}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {trigger}
      </PopoverTrigger>
      <PopoverContent
        {...contentProps}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </PopoverContent>
    </Popover>
  )
}

export default HoverPopover
