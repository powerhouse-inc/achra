'use client'

import { CircleArrowOutUpRightIcon } from 'lucide-react'
import { useModalCategories } from '../../providers/categories-provider'

function CategoryTableHeader() {
  const { openModal } = useModalCategories()

  return (
    <button
      type="button"
      className="hover:text-foreground/50 flex cursor-pointer items-center gap-2"
      onClick={openModal}
      aria-label="Open Expense Categories"
    >
      <span className="inline-block">
        <span className="lg:hidden">Exp. </span>
        <span className="hidden lg:inline">Expense </span>
        <span>Category</span>
      </span>
      <CircleArrowOutUpRightIcon className="size-4" aria-hidden />
    </button>
  )
}

export { CategoryTableHeader }
