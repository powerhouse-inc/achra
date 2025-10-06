import { EllipsisIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { useMediaQuery } from 'usehooks-ts'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import type { BreadcrumbItemNavigation } from '../types'

interface DotsSegmentProps {
  items: BreadcrumbItemNavigation[]
  defaultOpen?: boolean
}

function DotsSegment({ items, defaultOpen = false }: DotsSegmentProps) {
  const [open, setOpen] = useState(defaultOpen)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isMobileOrTablet = useMediaQuery('(max-width: 1024px)')

  useEffect(() => {
    setOpen(defaultOpen)
  }, [defaultOpen])

  const triggerIcon = (
    <div className="sm:bg-accent flex cursor-pointer items-center justify-center rounded-lg bg-transparent px-1">
      <EllipsisIcon />
    </div>
  )

  if (isMobile) {
    // TODO: Add mobile view
    return (
      <div>
        {items.map((item: BreadcrumbItemNavigation) => (
          <div key={item.label}>{item.label}</div>
        ))}
      </div>
    )
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>{triggerIcon}</DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="bg-popover max-w-49 min-w-[197px] rounded-xl border-none px-2 py-1 shadow-lg"
      >
        <div className="flex flex-col gap-2 overflow-hidden py-1">
          {items.map((item: BreadcrumbItemNavigation, index: number) => (
            <DropdownMenuItem
              key={item.label}
              asChild
              className="focus:bg-accent cursor-pointer p-0 px-3 py-2 text-sm font-normal"
            >
              {isMobileOrTablet && index === items.length - 1 ? (
                <span className="text-foreground w-full overflow-hidden px-2 py-2 text-ellipsis whitespace-nowrap">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-foreground w-full overflow-hidden px-2 py-2 font-normal text-ellipsis whitespace-nowrap"
                >
                  {item.label}
                </Link>
              )}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DotsSegment
