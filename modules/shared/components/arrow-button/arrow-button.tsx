import { ArrowRight } from 'lucide-react'
import React from 'react'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'

interface ArrowButtonProps extends React.ComponentProps<typeof Button> {
  onClick: () => void
}

export function ArrowButton({
  children,
  className,
  variant = 'secondary',
  onClick,
  ...buttonProps
}: ArrowButtonProps) {
  return (
    <Button
      variant={variant}
      className={cn('group/link', className)}
      onClick={onClick}
      {...buttonProps}
    >
      {children}{' '}
      <ArrowRight className="size-4 transition-transform duration-200 ease-in-out group-hover/link:translate-x-1.5" />
    </Button>
  )
}
