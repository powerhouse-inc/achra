import { useMemo } from 'react'
import { BuilderSkill } from '@/modules/__generated__/graphql/switchboard-generated'
import { GenericChip } from '../generic-chip/generic-chip'

interface BuildersSkillsChipProps {
  skill: BuilderSkill
  size?: 'small' | 'medium' | 'large'
  className?: string
}

export default function BuildersSkillsChip({
  skill,
  size = 'large',
  className,
}: BuildersSkillsChipProps) {
  const chipLabel = useMemo(() => {
    return skill
      .split('_')
      .map((segment) => segment.charAt(0))
      .filter(Boolean)
      .join('')
      .toUpperCase()
  }, [skill])

  const { label, color } = useMemo(() => {
    switch (skill) {
      case BuilderSkill.BackendDevelopment:
        return {
          label: 'Backend Development',
          color: 'blue',
        }
      case BuilderSkill.DataEngineering:
        return {
          label: 'Data Engineering',
          color: 'red',
        }
      case BuilderSkill.DevopsEngineering:
        return {
          label: 'Devops Engineering',
          color: 'green',
        }
      case BuilderSkill.FrontendDevelopment:
        return {
          label: 'Facilitator',
          color: 'orange',
        }
      case BuilderSkill.FullStackDevelopment:
        return {
          label: 'Full Stack Development',
          color: 'purple',
        }
      case BuilderSkill.QaTesting:
        return {
          label: 'QA Testing',
          color: 'yellow',
        }
      case BuilderSkill.SecurityEngineering:
        return {
          label: 'Security Engineering',
          color: 'purple',
        }
      case BuilderSkill.SmartContractDevelopment:
        return {
          label: 'Smart Contract Development',
          color: 'purple',
        }
      case BuilderSkill.TechnicalWriting:
        return {
          label: 'Technical Writing',
          color: 'lime',
        }
      case BuilderSkill.UiUxDesign:
        return {
          label: 'UI/UX Design',
          color: 'gray',
        }
    }
  }, [skill])

  return (
    <GenericChip variant="underline" color={color} className={className}>
      {size === 'small' || size === 'medium' ? chipLabel : label}
    </GenericChip>
  )
}
