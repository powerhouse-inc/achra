import { FileText } from 'lucide-react'
import type { BuilderSkill } from '@/modules/__generated__/graphql/switchboard-generated'
import BuildersSkillsChip from '@/modules/shared/components/chips/builders-skills-chip/builders-skills-chip'

interface HeaderTitleOperatorProfileProps {
  title: string
  skills: BuilderSkill[]
}

function HeaderTitleOperatorProfile({ title, skills }: HeaderTitleOperatorProfileProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        {/* TODO: Add logo */}
        <FileText className="text-muted-foreground h-14 w-14" strokeWidth={1.5} />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg leading-[120%] font-bold sm:text-xl">{title}</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <BuildersSkillsChip key={skill} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  )
}

export { HeaderTitleOperatorProfile }
