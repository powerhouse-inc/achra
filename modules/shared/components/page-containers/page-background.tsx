import React from 'react'
import { cn } from '@/shared/lib/utils'

interface PageBackgroundProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

export function PageBackground({ children, className, as: Element = 'div' }: PageBackgroundProps) {
  return (
    <div className="relative -mt-18 pt-18 md:-mt-21 md:pt-21">
      <div
        className={cn(
          'fixed inset-0 -z-1 max-h-[100vh] w-full',
          'bg-[radial-gradient(35.91%_31.42%_at_100%_50%,rgba(236,96,221,0.24)_0%,rgba(253,180,255,0.24)_50%,rgba(253,180,255,0.00)_100%)]',
          'dark:bg-[radial-gradient(70.6%_33.68%_at_100%_50%,rgba(236,96,221,0.24)_0%,rgba(253,180,255,0.24)_50%,rgba(253,180,255,0.00)_100%)] dark:opacity-20',
          className,
        )}
      />
      <Element className={className}>{children}</Element>
    </div>
  )
}
