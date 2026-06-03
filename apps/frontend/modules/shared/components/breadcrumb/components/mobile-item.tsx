import { CheckIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { cn } from '@/modules/shared/lib/utils'
import type { BreadcrumbItemNavigation } from '@/modules/shared/types/breadcrumb'

interface MobileItemProps {
  item: BreadcrumbItemNavigation
  isCurrent: boolean
  onClick: () => void
}

function MobileItem({ item, isCurrent, onClick }: MobileItemProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'md:hover:bg-accent flex w-full items-center justify-between gap-2 rounded-md px-3 py-2',
        {
          'bg-accent': isCurrent,
        },
      )}
    >
      <Link href={item.href} className="text-foreground w-full gap-2 truncate text-sm/5.5">
        {item.label}
      </Link>
      {isCurrent && <CheckIcon className="text-foreground h-4 w-4" />}
    </div>
  )
}

export { MobileItem }
