import { InfoIcon } from 'lucide-react'
import React from 'react'
import { cn } from '@/modules/shared/lib/utils'

interface SpendingItemProps extends React.PropsWithChildren {
  title: string
  mobileTitle?: string
  className?: string
}

export function SpendingItem({ title, mobileTitle, children, className }: SpendingItemProps) {
  return (
    <div
      className={cn(
        'relative flex w-full flex-col items-center rounded-xl sm:items-start md:justify-center md:bg-none xl:px-4 xl:py-1',
        // border
        'border-input border',
        // padding
        'p-2 pt-3 pr-2 pb-2 pl-4 sm:px-2 sm:py-1.5',
      )}
    >
      <div className="bg-popover sm:bg-accent absolute -top-2.5 left-8 flex items-center gap-2 px-2 sm:-top-3 sm:left-1 sm:px-2 md:-top-2 md:rounded-lg md:px-1">
        <span
          className={cn(
            // text
            'text-popover-foreground text-xs/4.5 font-medium xl:text-sm xl:leading-4',
            // position
            'md:left-8 md:py-0 xl:left-4',
          )}
        >
          {mobileTitle && <span className="block sm:hidden">{mobileTitle}</span>}
          <span className={mobileTitle ? 'hidden sm:block' : ''}>{title}</span>
        </span>
        <InfoIcon className="text-muted-foreground h-2.5 w-2.5" />
      </div>
      <div className={cn('flex gap-6 sm:flex-col sm:justify-start sm:gap-2', className)}>
        {children}
      </div>
    </div>
  )
}
