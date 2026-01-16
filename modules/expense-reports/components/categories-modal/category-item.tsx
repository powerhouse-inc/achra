'use client'

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/modules/shared/components/ui/accordion'
import { pascalCaseToNormalString } from '../../lib/strings'
import type { CategoryTree } from '../../types'

interface CategoryItemProps {
  category: CategoryTree
}

function CategoryItem({ category }: CategoryItemProps) {
  return (
    <AccordionItem value={category.id} className="border-0">
      <AccordionTrigger className="py-2 text-base/6 font-medium capitalize hover:no-underline">
        {pascalCaseToNormalString(category.name)}
      </AccordionTrigger>
      <AccordionContent>
        {category.children.length > 0 ? (
          <ul className="space-y-1 pl-4">
            {category.children.map((child) => (
              <li key={child.id} className="text-foreground/50 text-base/6 capitalize">
                {pascalCaseToNormalString(child.name)}
              </li>
            ))}
          </ul>
        ) : null}
      </AccordionContent>
    </AccordionItem>
  )
}

export { CategoryItem }
