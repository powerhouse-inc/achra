'use client'

import { ChevronDown } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
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
    <div className="bg-popover flex flex-col rounded-lg px-3 py-2 shadow-lg">
      <div className="flex items-center justify-between">
        <span className="text-ring text-base/6 font-semibold">{title}</span>
        <Button variant="icon" size="iconXsm" onClick={toggleSection}>
          <ChevronDown
            className={cn('text-foreground size-4 transition-transform duration-300 ease-out', {
              'rotate-180': isOpen,
              'rotate-0': !isOpen,
            })}
          />
        </Button>
      </div>
      <motion.div
        initial={{
          opacity: 0,
          height: 0,
          marginBottom: 0,
        }}
        animate={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? 'auto' : 0,
          margin: isOpen ? 'calc(var(--spacing) * 2)' : 0,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
          height: { duration: 0.3, ease: 'easeInOut' },
          marginBottom: { duration: 0.3, ease: 'easeInOut' },
          opacity: { duration: isOpen ? 0.5 : 0.1, ease: 'easeInOut' },
        }}
      >
        <span className="text-foreground text-base/6">{description}</span>
      </motion.div>
    </div>
  )
}
