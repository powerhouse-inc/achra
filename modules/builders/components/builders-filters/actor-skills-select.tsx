import { useMemo } from 'react'
import { BuilderSkill } from '@/modules/__generated__/graphql/switchboard-generated'
import BuildersSkillsChip from '@/modules/shared/components/chips/builders-skills-chip'
import { DrawerSelect } from '@/modules/shared/components/filter-drawer/filter-drawer'
import { MultipleSelector, type Option } from '@/modules/shared/components/form/multiselect'
import { cn } from '@/modules/shared/lib/utils'

interface ActorSkillsSelectProps {
  actorSkills: BuilderSkill[]
  setActorSkills: (actorSkills: BuilderSkill[]) => Promise<URLSearchParams>
  className?: string
}

const actorSkillsOptions: Option[] = [
  {
    value: BuilderSkill.BackendDevelopment,
    label: <BuildersSkillsChip skill={BuilderSkill.BackendDevelopment} />,
    group: 'Actor Skills',
  },
  {
    value: BuilderSkill.DataEngineering,
    label: <BuildersSkillsChip skill={BuilderSkill.DataEngineering} />,
    group: 'Actor Skills',
  },
  {
    value: BuilderSkill.DevopsEngineering,
    label: <BuildersSkillsChip skill={BuilderSkill.DevopsEngineering} />,
    group: 'Actor Skills',
  },
  {
    value: BuilderSkill.FrontendDevelopment,
    label: <BuildersSkillsChip skill={BuilderSkill.FrontendDevelopment} />,
    group: 'Actor Skills',
  },
  {
    value: BuilderSkill.FullStackDevelopment,
    label: <BuildersSkillsChip skill={BuilderSkill.FullStackDevelopment} />,
    group: 'Actor Skills',
  },
  {
    value: BuilderSkill.QaTesting,
    label: <BuildersSkillsChip skill={BuilderSkill.QaTesting} />,
    group: 'Actor Skills',
  },
  {
    value: BuilderSkill.SecurityEngineering,
    label: <BuildersSkillsChip skill={BuilderSkill.SecurityEngineering} />,
    group: 'Actor Skills',
  },
  {
    value: BuilderSkill.SmartContractDevelopment,
    label: <BuildersSkillsChip skill={BuilderSkill.SmartContractDevelopment} />,
    group: 'Actor Skills',
  },
  {
    value: BuilderSkill.TechnicalWriting,
    label: <BuildersSkillsChip skill={BuilderSkill.TechnicalWriting} />,
    group: 'Actor Skills',
  },
  {
    value: BuilderSkill.UiUxDesign,
    label: <BuildersSkillsChip skill={BuilderSkill.UiUxDesign} />,
    group: 'Actor Skills',
  },
]

function ActorSkillsSelect({ actorSkills, setActorSkills, className }: ActorSkillsSelectProps) {
  const selectedOptions = useMemo(
    () => actorSkillsOptions.filter((option) => actorSkills.includes(option.value as BuilderSkill)),
    [actorSkills],
  )

  const handleChange = (options: Option[]) => {
    const values = options.map((option) => option.value as BuilderSkill)
    void setActorSkills(values)
  }

  return (
    <MultipleSelector
      value={selectedOptions}
      onChange={handleChange}
      options={actorSkillsOptions}
      enableSearch={false}
      groupBy="group"
      enableSelectAll={true}
      selectAllGroup="Actor Skills"
      placeholder="Actor Skills"
      className={cn('bg-background dark:bg-background')}
      commandProps={{
        className,
      }}
      customItemRenderer={(option): React.ReactNode => option.label}
    />
  )
}

function ActorSkillsSelectDrawer({ actorSkills, setActorSkills }: ActorSkillsSelectProps) {
  const handleChange = (values: string[]) => {
    void setActorSkills(values as BuilderSkill[])
  }

  return (
    <DrawerSelect
      value={actorSkills}
      onChange={handleChange}
      label="Actor Skills"
      options={actorSkillsOptions}
      multiselect={true}
      enableSelectAll={true}
      selectAllLabel="Select All"
    />
  )
}

export { ActorSkillsSelect, ActorSkillsSelectDrawer }
