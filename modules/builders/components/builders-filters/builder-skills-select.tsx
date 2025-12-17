import { useMemo } from 'react'
import { BuilderSkill } from '@/modules/__generated__/graphql/switchboard-generated'
import BuildersSkillsChip from '@/modules/shared/components/chips/builders-skills-chip'
import { DrawerSelect } from '@/modules/shared/components/filter-drawer/filter-drawer'
import { MultipleSelector, type Option } from '@/modules/shared/components/form/multiselect'
import { cn } from '@/modules/shared/lib/utils'

interface BuilderSkillsSelectProps {
  builderSkills: BuilderSkill[]
  setBuilderSkills: (builderSkills: BuilderSkill[]) => Promise<URLSearchParams>
  className?: string
}

const builderSkillsOptions: Option[] = [
  {
    value: BuilderSkill.BackendDevelopment,
    label: <BuildersSkillsChip skill={BuilderSkill.BackendDevelopment} />,
    group: 'Builder Skills',
  },
  {
    value: BuilderSkill.DataEngineering,
    label: <BuildersSkillsChip skill={BuilderSkill.DataEngineering} />,
    group: 'Builder Skills',
  },
  {
    value: BuilderSkill.DevopsEngineering,
    label: <BuildersSkillsChip skill={BuilderSkill.DevopsEngineering} />,
    group: 'Builder Skills',
  },
  {
    value: BuilderSkill.FrontendDevelopment,
    label: <BuildersSkillsChip skill={BuilderSkill.FrontendDevelopment} />,
    group: 'Builder Skills',
  },
  {
    value: BuilderSkill.FullStackDevelopment,
    label: <BuildersSkillsChip skill={BuilderSkill.FullStackDevelopment} />,
    group: 'Builder Skills',
  },
  {
    value: BuilderSkill.QaTesting,
    label: <BuildersSkillsChip skill={BuilderSkill.QaTesting} />,
    group: 'Builder Skills',
  },
  {
    value: BuilderSkill.SecurityEngineering,
    label: <BuildersSkillsChip skill={BuilderSkill.SecurityEngineering} />,
    group: 'Builder Skills',
  },
  {
    value: BuilderSkill.SmartContractDevelopment,
    label: <BuildersSkillsChip skill={BuilderSkill.SmartContractDevelopment} />,
    group: 'Builder Skills',
  },
  {
    value: BuilderSkill.TechnicalWriting,
    label: <BuildersSkillsChip skill={BuilderSkill.TechnicalWriting} />,
    group: 'Builder Skills',
  },
  {
    value: BuilderSkill.UiUxDesign,
    label: <BuildersSkillsChip skill={BuilderSkill.UiUxDesign} />,
    group: 'Builder Skills',
  },
]

function BuilderSkillsSelect({
  builderSkills,
  setBuilderSkills,
  className,
}: BuilderSkillsSelectProps) {
  const selectedOptions = useMemo(
    () =>
      builderSkillsOptions.filter((option) => builderSkills.includes(option.value as BuilderSkill)),
    [builderSkills],
  )

  const handleChange = (options: Option[]) => {
    const values = options.map((option) => option.value as BuilderSkill)
    void setBuilderSkills(values)
  }

  return (
    <MultipleSelector
      value={selectedOptions}
      onChange={handleChange}
      options={builderSkillsOptions}
      enableSearch={false}
      groupBy="group"
      enableSelectAll={true}
      selectAllGroup="Builder Skills"
      placeholder="Builder Skills"
      className={cn('bg-background dark:bg-background')}
      commandProps={{
        className,
      }}
      customItemRenderer={(option): React.ReactNode => option.label}
    />
  )
}

function BuilderSkillsSelectDrawer({ builderSkills, setBuilderSkills }: BuilderSkillsSelectProps) {
  const handleChange = (values: string[]) => {
    void setBuilderSkills(values as BuilderSkill[])
  }

  return (
    <DrawerSelect
      value={builderSkills}
      onChange={handleChange}
      label="Builder Skills"
      options={builderSkillsOptions}
      multiselect={true}
      enableSelectAll={true}
      selectAllLabel="Select All"
    />
  )
}

export { BuilderSkillsSelect, BuilderSkillsSelectDrawer }
