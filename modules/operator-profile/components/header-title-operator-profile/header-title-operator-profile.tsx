import { FileText } from 'lucide-react'
import Image from 'next/image'
import type { BuilderSkill } from '@/modules/__generated__/graphql/switchboard-generated'
import { SkillsPopover } from '@/modules/shared/components/builder-skills'
import BuildersSkillsChip from '@/modules/shared/components/chips/builders-skills-chip/builders-skills-chip'

const LOGO_SIZE = 56
const MAX_SKILLS_TO_SHOW = 3

interface HeaderTitleOperatorProfileProps {
  code?: string
  name: string
  skills: BuilderSkill[]
  logo?: string
}

function HeaderTitleOperatorProfile({ code, name, skills, logo }: HeaderTitleOperatorProfileProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center">
        {logo ? (
          <Image
            src={logo}
            alt={`${name} logo`}
            width={LOGO_SIZE}
            height={LOGO_SIZE}
            unoptimized
            className="h-14 w-14 rounded-full object-contain"
          />
        ) : (
          <FileText className="text-muted-foreground h-14 w-14" strokeWidth={1.5} />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="flex items-center gap-1 text-lg leading-[120%] font-bold sm:items-baseline sm:text-xl md:items-start">
          {code && (
            <span className="text-foreground/30 text-base/6 font-semibold uppercase sm:text-sm/5.5 md:text-base/6">
              {code}
            </span>
          )}
          <span>{name}</span>
        </h2>

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
