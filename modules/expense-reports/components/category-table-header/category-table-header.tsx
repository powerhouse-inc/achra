import { CircleArrowOutUpRightIcon } from 'lucide-react'
import { useModalCategories } from '../../providers/categories-provider'

function CategoryTableHeader() {
  const { openModal } = useModalCategories()

  return (
    <div className="flex cursor-pointer items-center gap-2" onClick={openModal}>
      <span>Expense Category</span>
      <CircleArrowOutUpRightIcon className="size-4" />
    </div>
  )
}

export { CategoryTableHeader }
