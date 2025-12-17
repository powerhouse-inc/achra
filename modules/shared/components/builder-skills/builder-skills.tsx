import { Ellipsis } from 'lucide-react'
import type { BuilderSkill } from '@/modules/__generated__/graphql/switchboard-generated'
import { cn } from '../../lib/utils'
import BuildersSkillsChip from '../chips/builders-skills-chip'
import { GenericChip } from '../chips/generic-chip/generic-chip'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

interface SkillsPopoverProps {
  skills: BuilderSkill[]
}

function SkillsPopover({ skills }: SkillsPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <GenericChip variant="underline" color="gray" className="h-full w-8 justify-center">
          <Ellipsis className="size-4" />
        </GenericChip>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-2" align="start">
        <div className="flex flex-col gap-1">
          {skills.map((skill) => (
            <BuildersSkillsChip key={skill} skill={skill} />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
export interface BuilderSkillsProps {
  skills: BuilderSkill[]
  className?: string
}

export default function BuilderSkills({ skills, className }: BuilderSkillsProps) {
  const handlePopoverClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div className={cn('grid grid-cols-1 lg:gap-1', className)}>
      {skills.slice(0, 2).map((skill, index) => (
        <div key={skill} className={cn('flex gap-1', { 'hidden lg:flex': index === 1 })}>
          <BuildersSkillsChip key={skill} skill={skill} />
          <div className={cn({ 'lg:hidden': index === 0 })} onClick={handlePopoverClick}>
            <SkillsPopover skills={skills} />
          </div>
        </div>
      ))}
    </div>
  )
}
