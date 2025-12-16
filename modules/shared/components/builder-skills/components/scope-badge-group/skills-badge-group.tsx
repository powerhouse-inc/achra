import type { BuilderSkill } from '@/modules/__generated__/graphql/switchboard-generated'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/modules/shared/components/ui/hover-card'
import BuildersSkillsChip from '../../../chips/builders-skills-chip/builders-skills-chip'

export interface SkillsBadgeGroupProps {
  skills: BuilderSkill[]
}

export default function SkillsBadgeGroup({ skills }: SkillsBadgeGroupProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="grid grid-cols-2 gap-1">
          {skills.slice(0, 4).map((skill: BuilderSkill) => (
            <BuildersSkillsChip key={skill} skill={skill} size="small" />
          ))}
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-fit p-2" align="start">
        <div className="flex flex-col gap-1">
          {skills.map((skill) => (
            <BuildersSkillsChip key={skill} skill={skill} size="large" />
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
