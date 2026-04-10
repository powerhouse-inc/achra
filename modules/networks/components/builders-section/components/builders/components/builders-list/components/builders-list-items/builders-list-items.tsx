'use client'

import SimpleBar from 'simplebar-react'
import type { Builder } from '@/modules/__generated__/graphql/switchboard-generated'
import { BuildersItem } from '../../../builders-item/builders-item'
import { useBuildersListItems } from './use-builders-list-items'

interface BuildersListItemsProps {
  className?: string
  builders: Builder[]
}

function BuildersListItems({ className, builders }: BuildersListItemsProps) {
  const { simpleBarRef, cardContentRef, itemsWrapperRef } = useBuildersListItems({
    builders,
  })
  return (
    <div ref={cardContentRef} className={className}>
      <SimpleBar ref={simpleBarRef} autoHide={false}>
        <div ref={itemsWrapperRef} className="flex flex-col gap-2 p-2">
          {builders.map((builder) => (
            <BuildersItem key={builder.id} builder={builder} />
          ))}
        </div>
      </SimpleBar>
    </div>
  )
}

export { BuildersListItems }
