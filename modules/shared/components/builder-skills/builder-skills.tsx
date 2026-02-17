'use client'

import type { BuilderSkill } from '@/modules/__generated__/graphql/switchboard-generated'
import BuildersSkillsChip from '@/modules/shared/components/chips/builders-skills-chip'
import { cn } from '@/modules/shared/lib/utils'
import { SkillsPopover } from './skills-popover'

export interface BuilderSkillsProps {
  skills: BuilderSkill[]
  className?: string
}

function BuilderSkills({ skills, className }: BuilderSkillsProps) {
  const handlePopoverClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div className={cn('grid grid-cols-1 lg:gap-1', className)}>
      {skills.slice(0, 2).map((skill, index) => (
        <div key={skill} className={cn('flex gap-1', { 'hidden lg:flex': index === 1 })}>
          <BuildersSkillsChip key={skill} skill={skill} />
          <div
            className={cn({
              'lg:hidden': index === 0 || (index === 1 && skills.length === 2),
              hidden: skills.length === 1,
            })}
            onClick={handlePopoverClick}
          >
            <SkillsPopover skills={skills} />
          </div>
        </div>
      ))}
    </div>
  )
}

export { BuilderSkills }
