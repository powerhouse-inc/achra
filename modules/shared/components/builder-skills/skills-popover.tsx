import { Ellipsis } from 'lucide-react'
import type { BuilderSkill } from '@/modules/__generated__/graphql/switchboard-generated'
import { BuildersSkillsChip } from '@/modules/shared/components/chips/builders-skills-chip'
import { GenericChip } from '@/modules/shared/components/chips/generic-chip/generic-chip'
import { Popover, PopoverContent, PopoverTrigger } from '@/modules/shared/components/ui/popover'
import { cn } from '../../lib/utils'

interface SkillsPopoverProps {
  skills: BuilderSkill[]
  className?: string
}

function SkillsPopover({ skills, className }: SkillsPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <GenericChip
          variant="underline"
          color="gray"
          className={cn('h-full w-8 cursor-pointer justify-center', className)}
          aria-label="Show all skills"
        >
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

export { SkillsPopover }
