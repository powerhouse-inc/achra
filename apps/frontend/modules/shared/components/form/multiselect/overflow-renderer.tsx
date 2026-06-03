'use client'

import { cn } from '@achra/ui/lib/utils'
import * as React from 'react'
import type { Option } from './multiselect'

interface OverflowRendererProps {
  overflowItems: Option[]
  badgeClassName?: string
}

function OverflowRenderer({ overflowItems, badgeClassName }: OverflowRendererProps) {
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

export { OverflowRenderer }
