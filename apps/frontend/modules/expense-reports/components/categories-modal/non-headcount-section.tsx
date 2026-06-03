'use client'

import { useMemo } from 'react'
import { Accordion } from '@/modules/shared/components/ui/accordion'
import { CategoryItem } from './category-item'
import type { CategoryTree } from '../../types'

interface NonHeadcountSectionProps {
  categories: CategoryTree[]
  onValueChange: (newValue: string[]) => void
}

function NonHeadcountSection({ categories, onValueChange }: NonHeadcountSectionProps) {
  // Split categories into two columns
  const columns = useMemo(() => {
    const mid = Math.ceil(categories.length / 2)
    return [categories.slice(0, mid), categories.slice(mid)]
  }, [categories])

  const values = useMemo(() => {
    return categories
      .filter((category) => category.children.length > 0 && !category.isCollapsed)
      .map((category) => category.id)
  }, [categories])

  if (categories.length === 0) return null

  return (
    <div>
      <h3 className="mb-3 border-b text-lg font-bold">Non-Headcount Expense Categories</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
        {columns.map((columnCategories, columnIndex) => {
          const columnIds = columnCategories.map((cat) => cat.id)
          return (
            <Accordion
              key={`column-${columnIds[0] ?? columnIndex}`}
              type="multiple"
              value={values}
              onValueChange={onValueChange}
            >
              {columnCategories.map((category) => (
                <CategoryItem key={category.id} category={category} />
              ))}
            </Accordion>
          )
        })}
      </div>
    </div>
  )
}

export { NonHeadcountSection }
