'use client'

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/modules/shared/components/ui/accordion'
import { cn } from '@/modules/shared/lib/utils'
import { pascalCaseToNormalString } from '../../lib/strings'
import type { CategoryTree } from '../../types'

interface CategoryItemProps {
  category: CategoryTree
}

function flattenDescendants(category: CategoryTree): CategoryTree[] {
  return category.children.flatMap((child) => [child, ...flattenDescendants(child)])
}

function CategoryItem({ category }: CategoryItemProps) {
  const hasChildren = category.children.length > 0
  const flattened = flattenDescendants(category)

  return (
    <AccordionItem value={category.id} className="border-0">
      <AccordionTrigger
        className={cn('py-2 text-base/6 font-medium capitalize hover:no-underline', {
          '[&>svg]:hidden': !hasChildren,
          'cursor-pointer': hasChildren,
        })}
      >
        {pascalCaseToNormalString(category.name)}
      </AccordionTrigger>
      {hasChildren && (
        <AccordionContent>
          <ul className="space-y-1 pl-4">
            {flattened.map((node) => (
              <li key={node.id} className="text-foreground/50 text-base/6 capitalize">
                {pascalCaseToNormalString(node.name)}
              </li>
            ))}
          </ul>
        </AccordionContent>
      )}
    </AccordionItem>
  )
}

export { CategoryItem }
