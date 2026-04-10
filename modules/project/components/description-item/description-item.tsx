import React from 'react'
import type { Maybe, ScopeOfWork_Unit } from '@/modules/__generated__/graphql/switchboard-generated'
import { cn } from '@/modules/shared/lib/utils'

export interface DescriptionItemProps {
  label: string
  value: Maybe<ScopeOfWork_Unit> | string | undefined
  className?: string
}

function DescriptionItem({ label, value, className }: DescriptionItemProps) {
  return (
    <div
      className={cn(
        'flex min-w-40 items-center justify-between px-2 sm:justify-start sm:gap-1 sm:p-0',

        className,
      )}
    >
      <span className="text-foreground/30 text-xs/4.5 font-medium">{label}:</span>
      <span className="text-foreground text-sm/5.5 font-semibold">{value}</span>
    </div>
  )
}

export { DescriptionItem }
