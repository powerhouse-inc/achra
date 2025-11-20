import { useMemo } from 'react'
import { TeamRole } from '@/modules/shared/enums/teamRole'
import { GenericChip } from '../generic-chip/generic-chip'

interface BuildersRolesChipProps {
  role: TeamRole
}

export default function BuildersRolesChip({ role }: BuildersRolesChipProps) {
  const { label, color } = useMemo(() => {
    switch (role) {
      case TeamRole.ActiveEcosystemActor:
        return {
          label: 'Active Ecosystem Actor',
          color: 'blue',
        }
      case TeamRole.ScopeFacilitator:
        return {
          label: 'Scope Facilitator',
          color: 'red',
        }
      case TeamRole.AdvisoryCouncilMember:
        return {
          label: 'Advisory Council Member',
          color: 'green',
        }
      case TeamRole.Facilitator:
        return {
          label: 'Facilitator',
          color: 'orange',
        }
      case TeamRole.ResearchExpert:
        return {
          label: 'Research Expert',
          color: 'purple',
        }
      case TeamRole.ProjectLead:
        return {
          label: 'Project Lead',
          color: 'yellow',
        }
      case TeamRole.DataExpert:
        return {
          label: 'Data Expert',
          color: 'purple',
        }
      case TeamRole.TechExpert:
        return {
          label: 'Tech Expert',
          color: 'purple',
        }
      case TeamRole.TeamLead:
        return {
          label: 'Team Lead',
          color: 'lime',
        }
      case TeamRole.All:
        return {
          label: 'All',
          color: 'gray',
        }
    }
  }, [role])

  return (
    <GenericChip variant="underline" color={color}>
      {label}
    </GenericChip>
  )
}
