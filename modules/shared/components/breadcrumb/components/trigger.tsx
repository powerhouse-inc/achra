'use client'

import { EllipsisIcon } from 'lucide-react'
import { forwardRef } from 'react'

export const TriggerIcon = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`sm:bg-accent flex cursor-pointer items-center justify-center rounded-lg bg-transparent px-1 ${className}`}
        {...props}
      >
        <EllipsisIcon />
      </div>
    )
  },
)

TriggerIcon.displayName = 'TriggerIcon'
