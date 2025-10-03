'use client'

import { XIcon } from 'lucide-react'
import * as React from 'react'
import { cn } from '@/shared/lib/utils'
import type { Option } from './multiselect'

interface ItemRendererProps {
  option: Option
  badgeClassName?: string
  disabled?: boolean
  onUnselect: (option: Option) => void
}

export function ItemRenderer({ option, badgeClassName, disabled, onUnselect }: ItemRendererProps) {
  return (
    <div
      key={option.value}
      className={cn(
        'animate-fadeIn bg-background text-secondary-foreground hover:bg-background relative inline-flex h-7 shrink-0 cursor-default items-center rounded-md border ps-2 pe-7 pl-2 text-xs font-medium transition-all disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 data-fixed:pe-2',
        badgeClassName,
      )}
      data-fixed={option.fixed}
      data-disabled={disabled ?? undefined}
    >
      {option.label}
      <div
        className={cn(
          'text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute -inset-y-px -end-px flex size-7 cursor-pointer items-center justify-center rounded-e-md border border-transparent p-0 outline-hidden transition-[color,box-shadow] outline-none focus-visible:ring-[3px]',
          {
            hidden: option.fixed,
          },
        )}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !option.fixed) {
            e.preventDefault()
            e.stopPropagation()
            onUnselect(option)
          }
        }}
        onMouseDown={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          if (!option.fixed) {
            onUnselect(option)
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Remove"
      >
        <XIcon size={14} aria-hidden="true" />
      </div>
    </div>
  )
}
