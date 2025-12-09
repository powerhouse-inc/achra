'use client'

import {
  type ComponentProps,
  type ComponentRef,
  createContext,
  forwardRef,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { useDebounceValue } from 'usehooks-ts'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

interface HoverPopoverContextValue {
  open: boolean
  debouncedOpen: boolean
  setOpen: (nextOpen: boolean) => void
  handleMouseEnter: () => void
  handleMouseLeave: () => void
}

const HoverPopoverContext = createContext<HoverPopoverContextValue | null>(null)

function useHoverPopoverContext(component: string) {
  const context = useContext(HoverPopoverContext)

  if (!context) {
    throw new Error(`${component} must be used within HoverPopover`)
  }

  return context
}

interface HoverPopoverRootProps extends ComponentProps<typeof Popover> {
  children: ReactNode
  delay?: number
}

function HoverPopoverRoot({
  children,
  delay = 200,
  onOpenChange,
  ...popoverProps
}: HoverPopoverRootProps) {
  const [open, setOpen] = useState(false)
  const [debouncedOpen] = useDebounceValue(open, delay)

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      setOpen(nextOpen)
      onOpenChange?.(nextOpen)
    },
    [onOpenChange],
  )

  const handleMouseEnter = useCallback(() => {
    handleOpenChange(true)
  }, [handleOpenChange])

  const handleMouseLeave = useCallback(() => {
    handleOpenChange(false)
  }, [handleOpenChange])

  const contextValue = useMemo(
    () => ({
      open,
      debouncedOpen,
      setOpen: handleOpenChange,
      handleMouseEnter,
      handleMouseLeave,
    }),
    [open, debouncedOpen, handleOpenChange, handleMouseEnter, handleMouseLeave],
  )

  return (
    <HoverPopoverContext.Provider value={contextValue}>
      <Popover open={debouncedOpen} onOpenChange={handleOpenChange} {...popoverProps}>
        {children}
      </Popover>
    </HoverPopoverContext.Provider>
  )
}

type HoverPopoverTriggerProps = ComponentProps<typeof PopoverTrigger>

const HoverPopoverTrigger = forwardRef<
  ComponentRef<typeof PopoverTrigger>,
  HoverPopoverTriggerProps
>(({ onMouseEnter, onMouseLeave, onClick, ...props }, ref) => {
  const { handleMouseEnter, handleMouseLeave } = useHoverPopoverContext('HoverPopover.Trigger')

  const handleTriggerMouseEnter: HoverPopoverTriggerProps['onMouseEnter'] = (event) => {
    onMouseEnter?.(event)
    if (!event.defaultPrevented) {
      handleMouseEnter()
    }
  }

  const handleTriggerMouseLeave: HoverPopoverTriggerProps['onMouseLeave'] = (event) => {
    onMouseLeave?.(event)
    if (!event.defaultPrevented) {
      handleMouseLeave()
    }
  }

  const handleTriggerClick: HoverPopoverTriggerProps['onClick'] = (event) => {
    event.preventDefault()
    event.stopPropagation()
    onClick?.(event)
  }

  return (
    <PopoverTrigger
      ref={ref}
      {...props}
      onMouseEnter={handleTriggerMouseEnter}
      onMouseLeave={handleTriggerMouseLeave}
      onClick={handleTriggerClick}
    />
  )
})

HoverPopoverTrigger.displayName = 'HoverPopoverTrigger'

type HoverPopoverContentProps = ComponentProps<typeof PopoverContent>

const HoverPopoverContent = forwardRef<
  ComponentRef<typeof PopoverContent>,
  HoverPopoverContentProps
>(({ onMouseEnter, onMouseLeave, onClick, ...props }, ref) => {
  const { handleMouseEnter, handleMouseLeave } = useHoverPopoverContext('HoverPopover.Content')

  const handleContentMouseEnter: HoverPopoverContentProps['onMouseEnter'] = (event) => {
    onMouseEnter?.(event)
    if (!event.defaultPrevented) {
      handleMouseEnter()
    }
  }

  const handleContentMouseLeave: HoverPopoverContentProps['onMouseLeave'] = (event) => {
    onMouseLeave?.(event)
    if (!event.defaultPrevented) {
      handleMouseLeave()
    }
  }

  const handleContentClick: HoverPopoverContentProps['onClick'] = (event) => {
    event.preventDefault()
    event.stopPropagation()
    onClick?.(event)
  }

  return (
    <PopoverContent
      ref={ref}
      {...props}
      onMouseEnter={handleContentMouseEnter}
      onMouseLeave={handleContentMouseLeave}
      onClick={handleContentClick}
    />
  )
})

HoverPopoverContent.displayName = 'HoverPopoverContent'

const HoverPopover = Object.assign(HoverPopoverRoot, {
  Trigger: HoverPopoverTrigger,
  Content: HoverPopoverContent,
})

export { HoverPopover, HoverPopoverContent, HoverPopoverRoot, HoverPopoverTrigger }
