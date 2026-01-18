import { CircleArrowOutUpRightIcon } from 'lucide-react'
import { useModalCategories } from '../../providers/categories-provider'

function CategoryTableHeader() {
  const { openModal } = useModalCategories()

  return (
    <div className="flex cursor-pointer items-center gap-2" onClick={openModal}>
      <div className="inline-block">
        <span className="lg:hidden">Exp. </span>
        <span className="hidden lg:inline">Expense </span>
        <span>Category</span>
      </div>
      <CircleArrowOutUpRightIcon className="size-4" />
    </div>
  )
}

export { CategoryTableHeader }
