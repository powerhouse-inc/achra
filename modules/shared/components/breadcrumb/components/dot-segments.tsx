import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import Link from 'next/link'

import { useState } from 'react'
import { useMountedState } from 'react-use'
import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '../../ui/drawer'
import { MobileItem } from './mobile-item'
import { TriggerIcon } from './trigger-icon'
import type { BreadcrumbItemNavigation } from '../types'

interface DotsSegmentProps {
  items: BreadcrumbItemNavigation[]
  defaultOpen?: boolean
}

function DotsSegment({ items, defaultOpen = false }: DotsSegmentProps) {
  const [open, setOpen] = useState(defaultOpen)
  const isMounted = useMountedState()
  const isMobile = useMediaQuery({ to: 'md' })
  const isMobileOrTablet = useMediaQuery({ to: 'lg' })

  const itemsToRender = isMobileOrTablet ? items.slice(0, -1) : items

  const currentItemLabel = items[items.length - 1].label
  if (isMobile && isMounted()) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <TriggerIcon />
        </DrawerTrigger>

        <DrawerContent className="data-[vaul-drawer-direction=bottom]:bg-popover [&>div:first-child]:bg-foreground/30 mt-0 mb-0 rounded-t-xl border-none bg-transparent data-[vaul-drawer-direction=bottom]:bottom-0">
          <VisuallyHidden>
            <DrawerTitle />
          </VisuallyHidden>
          <div className="flex flex-col gap-2 overflow-hidden px-4 py-2 hover:rounded-md">
            {[...items].reverse().map((item) => (
              <MobileItem
                key={item.label}
                item={item}
                isCurrent={item.label === currentItemLabel}
              />
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <TriggerIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="bg-popover max-w-49 min-w-49.25 rounded-xl border-none px-2 py-1 shadow-lg"
      >
        <div className="flex flex-col gap-2 py-1">
          {itemsToRender.map((item: BreadcrumbItemNavigation) => (
            <DropdownMenuItem
              key={item.label}
              asChild
              className="focus:bg-accent block w-full min-w-0 cursor-pointer p-0 px-3 py-2 text-sm font-normal"
            >
              <Link
                href={item.href}
                className="text-foreground w-full truncate px-2 py-2 font-normal"
              >
                {item.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DotsSegment
