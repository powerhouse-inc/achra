'use client'

import { ChevronDown } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { Markdown } from '@/modules/shared/components/markdown/markdown'
import { Button } from '@/modules/shared/components/ui/button'
import { cn } from '@/modules/shared/lib/utils'

interface ExpandableSectionProps {
  title: string
  description: string
}

export default function ExpandableSection({ title, description }: ExpandableSectionProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSection = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        className="bg-popover flex cursor-pointer items-center justify-between gap-4 rounded-lg px-3 py-2 shadow-lg"
        onClick={toggleSection}
      >
        <span className="text-ring text-sm/5.5 font-medium lg:text-base/6 lg:font-semibold">
          {title}
        </span>
        <Button variant="icon" size="iconXsm">
          <ChevronDown
            className={cn('text-foreground size-4 transition-transform duration-300 ease-out', {
              'rotate-180': isOpen,
              'rotate-0': !isOpen,
            })}
          />
        </Button>
      </div>
      <motion.div
        className="overflow-hidden"
        initial={{
          opacity: 0,
          height: 0,
          marginBottom: 0,
        }}
        animate={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? 'auto' : 0,
          marginTop: isOpen ? 'calc(var(--spacing) * 2)' : 0,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
          height: { duration: 0.3, ease: 'easeInOut' },
          marginTop: { duration: 0.3, ease: 'easeInOut' },
          opacity: { duration: isOpen ? 0.5 : 0.1, ease: 'easeInOut' },
        }}
      >
        <Markdown className="text-foreground">{description}</Markdown>
      </motion.div>
    </div>
  )
}
