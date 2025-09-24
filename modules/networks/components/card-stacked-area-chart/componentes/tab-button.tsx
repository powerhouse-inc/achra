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
          ? 'bg-accent hover:bg-accent border-b-foreground hover:border-b-foreground border-b'
          : 'border-muted bg-muted border',

        className,
      )}
    >
      <div
        className={cn(
          'font-semibold',
          'text-base',
          'leading-6',

          'font-sans',
          'transition-colors',

          isSelect ? 'text-accent-foreground' : 'text-muted-foreground group-hover:text-foreground',
        )}
      >
        {label}
      </div>
    </Button>
  )
}
