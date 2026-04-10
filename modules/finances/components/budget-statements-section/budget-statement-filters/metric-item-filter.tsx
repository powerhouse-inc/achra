'use client'

import { CheckIcon } from 'lucide-react'
import { Button } from '@/modules/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'

interface SortItemProps {
  label: string
  isSelected?: boolean
  onClick?: () => void
  className?: string
}

function MetricItemFilter({ label, isSelected, onClick, className }: Readonly<SortItemProps>) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(
        // Base styles mimicking Shadcn SelectItem
        'relative flex w-full cursor-pointer items-center justify-start rounded-sm py-1.5 pr-8 pl-2 text-sm transition-colors outline-none select-none',
        // Hover and Focus states
        'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
        // Active state background
        isSelected && 'bg-accent text-accent-foreground font-medium',
        className,
      )}
    >
      <span>{label}</span>

      <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
        {isSelected && <CheckIcon className="size-4" />}
      </span>
    </Button>
  )
}

export { MetricItemFilter }
