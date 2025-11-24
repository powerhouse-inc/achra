'use client'

import { useState } from 'react'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Sow_Deliverable } from '@/modules/__generated__/graphql/switchboard-generated'
import { Button } from '@/modules/shared/components/ui/button'
import { useInfiniteArray } from '@/modules/shared/hooks/use-infinite-array'
import { createDeliverableTitle } from '../../lib/deliverable-helpers'
import ProposalApplyCard from './proposal-apply-card'

interface ProposalCardsGridProps {
  deliverables: Array<Pick<Sow_Deliverable, 'id' | 'code' | 'title' | 'description'>>
  shouldUsePagination?: boolean
}

export default function ProposalCardsGrid({
  deliverables,
  shouldUsePagination = true,
}: ProposalCardsGridProps) {
  const [_activeIndex, setActiveIndex] = useState<number>(0)

  const { visibleItems, hasMore, loadMore } = useInfiniteArray(deliverables, {
    firstPageSize: 6,
    pageSize: 9,
    enabled: shouldUsePagination,
  })

  return (
    <>
      {/* Mobile */}
      <div className="md:hidden">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.activeIndex)
          }}
        >
          {deliverables.map((deliverable) => (
            <SwiperSlide key={deliverable.id}>
              <div className="h-38 px-5 pb-2 sm:h-35.5 sm:px-10 [&>*:first-child]:h-full">
                <ProposalApplyCard
                  title={createDeliverableTitle(deliverable.code, deliverable.title)}
                  description={deliverable.description}
                  tags={[]}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* TODO: create a solution in the UI that works for cases when there are too many deliverables */}
        {/* <div className="mx-auto mt-2 flex w-fit gap-4">
          {deliverables.map((deliverable, index) => (
            <div
              key={deliverable.id}
              className={cn(
                'bg-muted size-3 rounded-full shadow-sm [&:first-child]:rounded-r-none [&:last-child]:rounded-l-none',
                { 'bg-primary': activeIndex === index },
              )}
            />
          ))}
        </div> */}
      </div>

      {/* Desktop */}
      <div className="hidden flex-col gap-4 md:flex">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-4 xl:grid-cols-3 xl:gap-6">
          {visibleItems.map((deliverable) => (
            <ProposalApplyCard
              key={deliverable.id}
              title={createDeliverableTitle(deliverable.code, deliverable.title)}
              description={deliverable.description}
              tags={[]}
            />
          ))}
        </div>
        {hasMore && (
          <div className="flex justify-center pt-2">
            <Button variant="outline" onClick={loadMore}>
              Load More
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
