'use client'

import { motion } from 'motion/react'
import { useState } from 'react'
import { Button } from '@/modules/shared/components/ui/button'

export function BuildersHeader() {
  const [showFullDescription, setShowFullDescription] = useState(true)

  const handleToogleDescription = () => {
    setShowFullDescription(!showFullDescription)
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-foreground text-2xl leading-[120%] font-bold">Builders</span>
      <motion.div
        className="overflow-hidden"
        initial={{
          height: 48,
        }}
        animate={{
          height: showFullDescription ? 'auto' : 48,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
          height: { duration: 0.3, ease: 'easeInOut' },
        }}
      >
        <div className="text-foreground/50 flex h-fit flex-col text-base/6">
          <p>
            Ecosystem Actors serve as external entities offering valuable services to both Maker
            Core and SubDAOs. These actors are further classified into two categories: Advisory
            Ecosystem Actors and Active Ecosystem Actors.
          </p>
          <p className="my-4.5">
            Active Ecosystem Actors work according to the specifications of Scope Alignment
            Artifacts to receive funding for performing specific projects such as developing new
            features, data collection, marketing, growth, and other operational activities that
            benefit the Sky Ecosystem.
          </p>
          <p>
            In contrast, Advisory Council Member Ecosystem Actors engage in research and offer
            guidance to the Sky Ecosystem, contributing to the refinement of Scopes Artifacts and
            their underlying procedures.
          </p>
        </div>
      </motion.div>
      <Button
        className="text-foreground relative self-end px-4"
        variant="link"
        size="lg"
        onClick={handleToogleDescription}
      >
        {showFullDescription ? 'Read less' : 'Read more'}
      </Button>
    </div>
  )
}
