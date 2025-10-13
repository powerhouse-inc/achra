import { CheckIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { cn } from '@/modules/shared/lib/utils'
import type { BreadcrumbItemNavigation } from '../types'

interface MobileItemProps {
  item: BreadcrumbItemNavigation
  isCurrent: boolean
}

export function MobileItem({ item, isCurrent }: MobileItemProps) {
  return (
    <div
      className={cn('md:hover:bg-accent relative flex w-full rounded-md px-3 py-2', {
        'bg-accent': isCurrent,
      })}
    >
      <Link href={item.href} className="text-foreground w-full text-sm/5.5">
        {item.label}
      </Link>
      {isCurrent && (
        <CheckIcon className="text-foreground absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2" />
      )}
    </div>
  )
}
