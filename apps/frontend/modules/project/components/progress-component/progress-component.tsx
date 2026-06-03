import { cn } from '@achra/ui/lib/utils'
import { Progress } from '@achra/ui/progress'
import React, { type ComponentProps } from 'react'

interface ProgressComponentProps extends Omit<ComponentProps<'div'>, 'ref'> {
  progress: number
  className?: string
  'aria-label'?: string
}

function ProgressComponent({
  progress,
  className,
  'aria-label': ariaLabel,
  ...props
}: ProgressComponentProps) {
  const defaultAriaLabel = `Progress: ${progress}%`
  const progressAriaLabel = ariaLabel ?? defaultAriaLabel

  return (
    <div {...props} className={cn('relative w-full', className)}>
      <Progress
        value={progress}
        aria-label={progressAriaLabel}
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

export { ProgressComponent }
