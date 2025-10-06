import { CheckIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { cn } from '@/modules/shared/lib/utils'
import type { BreadcrumbItemNavigation } from '../types'

interface MobileItemProps {
  item: BreadcrumbItemNavigation
  index: number
  key: React.Key
}

export function MobileItem({ item, index, key }: MobileItemProps) {
  return (
    <div
      key={key}
      className={cn(
        'hover:bg-accent relative flex w-full rounded-md px-3 py-2 text-sm leading-tight',
        {
          'bg-accent': index === 0,
        },
      )}
    >
      <Link href={item.href} className="text-foreground w-full font-normal">
        {item.label}
      </Link>
      {index === 0 && <CheckIcon className="absolute top-1/2 right-2 -translate-y-1/2" />}
    </div>
  )
}
