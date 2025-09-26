'use client'
import React from 'react'
import { Button } from '@/modules/shared/components/ui/button'
import { cn } from '@/modules/shared/lib/utils'

interface TabsProps {
  label: string
  className?: string
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  isSelect?: boolean
}

export function TabButton({ label, className, onClick, isSelect = false }: TabsProps) {
  return (
    <Button
      variant="default"
      onClick={onClick}
      className={cn(
        'group',
        'h-8',
        'flex',
        'items-center',
        'rounded-lg',
        'cursor-pointer',
        'px-6',
        'py-1',
        'transition-colors',

        isSelect
          ? 'bg-accent hover:bg-accent border-b-foreground hover:border-b-foreground text-accent-foreground border-b'
          : 'bg-muted hover:bg-muted text-muted-foreground hover:border-b-foreground/50 border-b-0 hover:border-b',

        className,
      )}
    >
      <div
        className={cn(
          'font-semibold',
          'text-base',
          'leading-6',
          'transition-colors',

          isSelect
            ? 'text-accent-foreground hover:none'
            : 'text-muted-foreground hover:text-muted-foreground',
        )}
      >
        {label}
      </div>
    </Button>
  )
}
