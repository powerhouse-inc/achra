'use client'

import { useMemo } from 'react'
import { Accordion } from '@/modules/shared/components/ui/accordion'
import { CategoryItem } from './category-item'
import type { CategoryTree } from '../../types'

interface HeadcountSectionProps {
  categories: CategoryTree[]
  onValueChange: (newValue: string[]) => void
}

function HeadcountSection({ categories, onValueChange }: HeadcountSectionProps) {
  const values = useMemo(() => {
    return categories
      .filter((category) => category.children.length > 0 && !category.isCollapsed)
      .map((category) => category.id)
  }, [categories])

  if (categories.length === 0) return null

  return (
    <div>
      <h3 className="mb-3 border-b text-lg font-bold">Headcount Expense Categories</h3>
      <div className="w-full md:w-[calc(50%-0.5rem)]">
        <Accordion type="multiple" value={values} onValueChange={onValueChange}>
          {categories.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </Accordion>
      </div>
    </div>
  )
}

export { HeadcountSection }
