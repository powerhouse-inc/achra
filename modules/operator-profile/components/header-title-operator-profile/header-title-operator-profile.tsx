import { FileText } from 'lucide-react'
import Image from 'next/image'
import type { BuilderSkill } from '@/modules/__generated__/graphql/switchboard-generated'
import { SkillsPopover } from '@/modules/shared/components/builder-skills'
import BuildersSkillsChip from '@/modules/shared/components/chips/builders-skills-chip/builders-skills-chip'

const LOGO_SIZE = 56
const MAX_SKILLS_TO_SHOW = 3

interface HeaderTitleOperatorProfileProps {
  title: string
  skills: BuilderSkill[]
  logo?: string
}

function HeaderTitleOperatorProfile({ title, skills, logo }: HeaderTitleOperatorProfileProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center">
        {logo ? (
          <Image
            src={logo}
            alt={`${title} logo`}
            width={LOGO_SIZE}
            height={LOGO_SIZE}
            unoptimized
            className="h-14 w-14 rounded-md object-contain"
          />
        ) : (
          <FileText className="text-muted-foreground h-14 w-14" strokeWidth={1.5} />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg leading-[120%] font-bold sm:text-xl">{title}</h2>

        <div className="flex flex-wrap gap-2">
          {skills.slice(0, MAX_SKILLS_TO_SHOW).map((skill) => (
            <BuildersSkillsChip key={skill} skill={skill} />
          ))}
          {skills.length > MAX_SKILLS_TO_SHOW && (
            <SkillsPopover skills={skills.slice(MAX_SKILLS_TO_SHOW)} className="h-auto" />
          )}
        </div>
      </div>
    </div>
  )
}

export { HeaderTitleOperatorProfile }
