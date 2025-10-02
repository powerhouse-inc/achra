'use client'

import * as React from 'react'
import { cn } from '@/shared/lib/utils'
import type { Option } from './multiselect'

interface OverflowRendererProps {
  overflowItems: Option[]
  badgeClassName?: string
}

export function OverflowRenderer({ overflowItems, badgeClassName }: OverflowRendererProps) {
  return (
    <div
      className={cn(
        'bg-background text-secondary-foreground relative inline-flex h-7 shrink-0 cursor-default items-center rounded-md border px-2 text-xs font-medium',
        badgeClassName,
      )}
    >
      +{overflowItems.length}
    </div>
  )
}
