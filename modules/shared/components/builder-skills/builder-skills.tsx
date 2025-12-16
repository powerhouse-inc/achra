import type { BuilderSkill } from '@/modules/__generated__/graphql/switchboard-generated'
import { cn } from '../../lib/utils'
import BuildersSkillsChip from '../chips/builders-skills-chip/builders-skills-chip'
import SkillsBadgeGroup from './components/scope-badge-group/skills-badge-group'

interface BuilderSkillsProps {
  skills: BuilderSkill[]
  isMobile?: boolean
  className?: string
}

export default function BuilderSkills({ skills, isMobile, className }: BuilderSkillsProps) {
  return (
    <div className={cn('w-fit', className)}>
      {isMobile ? (
        <div className="flex gap-1">
          {skills.map((skill) => (
            <BuildersSkillsChip key={skill} skill={skill} size="small" />
          ))}
        </div>
      ) : skills.length > 2 ? (
        skills.length > 2 ? (
          <SkillsBadgeGroup skills={skills} />
        ) : skills.length === 0 ? null : (
          <div className="flex flex-col gap-1">
            {skills.map((skill) => (
              <BuildersSkillsChip key={skill} skill={skill} />
            ))}
          </div>
        )
      ) : null}
    </div>
  )
}
