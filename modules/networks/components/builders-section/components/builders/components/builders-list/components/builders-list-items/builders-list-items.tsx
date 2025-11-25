'use client'

import SimpleBar from 'simplebar-react'
import type { Team } from '@/modules/shared/types/team'
import { BuildersItem } from '../../../builders-item/builders-item'
import { useBuildersListItems } from './use-builders-list-items'

interface BuildersListItemsProps {
  className?: string
  builders: Team[]
}

export function BuildersListItems({ className, builders }: BuildersListItemsProps) {
  const { simpleBarRef, cardContentRef, itemsWrapperRef } = useBuildersListItems({
    builders,
  })
  return (
    <div ref={cardContentRef} className={className}>
      <SimpleBar ref={simpleBarRef} autoHide={false}>
        <div ref={itemsWrapperRef} className="flex flex-col gap-2 p-2">
          {builders.map((team) => (
            <BuildersItem key={team.id} team={team} />
          ))}
        </div>
      </SimpleBar>
    </div>
  )
}
