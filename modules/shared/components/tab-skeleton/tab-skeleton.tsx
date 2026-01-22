import * as React from 'react'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { cn } from '@/modules/shared/lib/utils'

interface TabsSkeletonProps {
  children: React.ReactNode
  className?: string
}

function TabsSkeleton({ children, className }: TabsSkeletonProps) {
  return (
    <div data-slot="tabs-skeleton" className={cn('flex flex-col gap-2', className)}>
      <div
        data-slot="tabs-list-skeleton"
        className={cn(
          'bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]',
        )}
      >
        {children}
      </div>
    </div>
  )
}

interface TabSkeletonProps {
  active?: boolean
  className?: string
}

function TabSkeleton({ active = false, className }: TabSkeletonProps) {
  return (
    <div
      data-slot="tab-skeleton"
      data-active={active}
      className={cn(
        'flex h-[calc(100%-1px)] w-20 items-center justify-center rounded-md px-3 py-1.5',
        active && 'bg-popover shadow-sm',
        className,
      )}
    >
      <Skeleton className={cn('h-5 w-full rounded-md', active ? 'bg-muted' : 'bg-background')} />
    </div>
  )
}

export { TabsSkeleton, TabSkeleton }
