'use client'

import { CircleArrowOutUpRightIcon } from 'lucide-react'
import { cn } from '@/modules/shared/lib/utils'
import { useModalCategories } from '../../providers/categories-provider'

interface OpenModalTransparencyProps {
  name: string
  className?: string
}

function OpenModalTransparency({ name, className }: OpenModalTransparencyProps) {
  const { openModal } = useModalCategories()

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span>{name}</span>
      <button
        className="text-foreground/30 hover:text-foreground size-5 cursor-pointer"
        onClick={openModal}
        aria-label="Open Expense Categories modal"
      >
        <CircleArrowOutUpRightIcon className="size-4" />
      </button>
    </div>
  )
}

export { OpenModalTransparency }
