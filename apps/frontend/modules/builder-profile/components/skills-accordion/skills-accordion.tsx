'use client'

import { ChevronDown } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import type { BuilderSkill } from '@/modules/__generated__/graphql/switchboard-generated'
import { BuildersSkillsChip } from '@/modules/shared/components/chips/builders-skills-chip/builders-skills-chip'
import { Button } from '@/modules/shared/components/ui/button'
import { cn } from '@/modules/shared/lib/utils'

interface SkillsAccordionProps {
  skills: BuilderSkill[]
  className?: string
}

function SkillsAccordion({ skills, className }: SkillsAccordionProps) {
  const [isOpen, setIsOpen] = useState(true)

  const toggleSection = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div
      className={cn(
        'bg-popover flex w-full flex-col rounded-lg px-4 pt-2 pb-4 shadow-sm',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-ring text-sm/5.5 font-medium lg:text-base/6 lg:font-semibold">
          Skills
        </span>
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
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <BuildersSkillsChip key={skill} skill={skill} />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export { SkillsAccordion }
