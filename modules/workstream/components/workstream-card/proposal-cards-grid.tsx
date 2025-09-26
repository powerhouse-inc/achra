'use client'

import { useState } from 'react'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Button } from '@/modules/shared/components/ui/button'
import { cn } from '@/modules/shared/lib/utils'
import ProposalApplyCard from './proposal-apply-card'

// TODO: remove this mocked data once the API is integrated
const mockedData = [
  {
    title: 'D1: Conduct Business Analysis',
    description:
      'Lorem ipsum dolor sit amet consectetur. Feugiat tellus consectetur nulla at nullam.',
    tags: ['BA', 'Balsamiq', 'UI Design'],
  },
  {
    title: 'D2: Deploy the smart contracts',
    description:
      'Lorem ipsum dolor sit amet consectetur. Feugiat tellus consectetur nulla at nullam.',
    tags: ['GraphQL', 'JavaScript', 'UI Design', 'Smart Contracts', 'React'],
  },
  {
    title: 'D3: Conduct Business Analysis',
    description:
      'Lorem ipsum dolor sit amet consectetur. Feugiat tellus consectetur nulla at nullam.',
    tags: ['BA', 'Balsamiq', 'UI Design'],
  },
  {
    title: 'D4: Conduct Business Analysis',
    description:
      'Lorem ipsum dolor sit amet consectetur. Feugiat tellus consectetur nulla at nullam.',
    tags: ['BA', 'Balsamiq', 'UI Design', 'Smart Contracts'],
  },
  {
    title: 'D5: Conduct Business Analysis',
    description:
      'Lorem ipsum dolor sit amet consectetur. Feugiat tellus consectetur nulla at nullam.',
    tags: ['BA', 'Balsamiq', 'UI Design', 'Smart Contracts', 'React', 'Figma'],
  },
  {
    title: 'D6: Conduct Business Analysis',
    description:
      'Lorem ipsum dolor sit amet consectetur. Feugiat tellus consectetur nulla at nullam.',
    tags: ['BA', 'Balsamiq', 'UI Design', 'Smart Contracts', 'React', 'Figma'],
  },
]

export default function ProposalCardsGrid() {
  const [activeIndex, setActiveIndex] = useState<number>(0)

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
          {mockedData.map((proposal) => (
            <SwiperSlide key={proposal.title}>
              <div className="h-38 px-5 pb-2 sm:h-35.5 sm:px-10 [&>*:first-child]:h-full">
                <ProposalApplyCard
                  title={proposal.title}
                  description={proposal.description}
                  tags={proposal.tags}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mx-auto mt-2 flex w-fit gap-4">
          {mockedData.map((proposal, index) => (
            <div
              key={proposal.title}
              className={cn(
                'bg-muted size-3 rounded-full shadow-sm [&:first-child]:rounded-r-none [&:last-child]:rounded-l-none',
                { 'bg-primary': activeIndex === index },
              )}
            />
          ))}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden flex-col gap-4 md:flex">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-4 xl:grid-cols-3 xl:gap-6">
          {mockedData.map((proposal) => (
            <ProposalApplyCard
              key={proposal.title}
              title={proposal.title}
              description={proposal.description}
              tags={proposal.tags}
            />
          ))}
        </div>
        <div className="flex justify-center pt-2">
          <Button variant="outline">Load More</Button>
        </div>
      </div>
    </>
  )
}
