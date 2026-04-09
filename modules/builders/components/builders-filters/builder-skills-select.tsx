import { useMemo } from 'react'
import { BuilderSkill } from '@/modules/__generated__/graphql/switchboard-generated'
import BuildersSkillsChip from '@/modules/shared/components/chips/builders-skills-chip'
import { DrawerSelect } from '@/modules/shared/components/filter-drawer/filter-drawer'
import { MultipleSelector, type Option } from '@/modules/shared/components/form/multiselect'
import { cn } from '@/modules/shared/lib/utils'

interface BuilderSkillsSelectProps {
  skills: BuilderSkill[]
  setSkills: (skills: BuilderSkill[]) => void
  className?: string
  isLoading?: boolean
  disabled?: boolean
}

const skillsOptions: Option[] = [
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
  skills,
  isLoading = false,
  setSkills,
  className,
  disabled = false,
}: BuilderSkillsSelectProps) {
  const selectedOptions = useMemo(
    () => skillsOptions.filter((option) => skills.includes(option.value as BuilderSkill)),
    [skills],
  )

  const handleChange = (options: Option[]) => {
    const values = options.map((option) => option.value as BuilderSkill)
    setSkills(values)
  }

  return (
    <MultipleSelector
      value={selectedOptions}
      onChange={handleChange}
      options={skillsOptions}
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
      isLoading={isLoading}
      disabled={disabled}
    />
  )
}

function BuilderSkillsSelectDrawer({ skills, setSkills }: BuilderSkillsSelectProps) {
  const handleChange = (values: string[]) => {
    setSkills(values as BuilderSkill[])
  }

  return (
    <DrawerSelect
      value={skills}
      onChange={handleChange}
      label="Builder Skills"
      options={skillsOptions}
      multiselect={true}
      enableSelectAll={true}
      selectAllLabel="Select All"
    />
  )
}

export { BuilderSkillsSelect, BuilderSkillsSelectDrawer }
