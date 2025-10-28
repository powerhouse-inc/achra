import React, { type ComponentProps } from 'react'
import { Progress } from '@/modules/shared/components/ui/progress'
import { cn } from '@/modules/shared/lib/utils'

interface ProgressComponentProps extends Omit<ComponentProps<'div'>, 'ref'> {
  progress: number
  className?: string
}

export function ProgressComponent({ progress, className, ...props }: ProgressComponentProps) {
  return (
    <div {...props} className={cn('relative w-full', className)}>
      <Progress
        value={progress}
        className={cn(
          'bg-accent [&>div]:bg-status-progress h-4 rounded',
          progress === 100 && '[&>div]:bg-status-success',
        )}
      />

      <div
        className={cn(
          'absolute inset-0 z-10 flex items-center justify-end pr-2 text-xs font-bold',
          progress === 100 ? 'text-primary-foreground' : 'text-accent-foreground/30',
        )}
        aria-hidden="true"
      >
        {progress}%
      </div>
    </div>
  )
}
