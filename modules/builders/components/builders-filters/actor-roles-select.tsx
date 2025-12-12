import { useMemo } from 'react'
import BuildersRolesChip from '@/modules/shared/components/chips/builders-roles-chip/builders-roles-chip'
import { DrawerSelect } from '@/modules/shared/components/filter-drawer/filter-drawer'
import { MultipleSelector, type Option } from '@/modules/shared/components/form/multiselect'
import { cn } from '@/modules/shared/lib/utils'
import { TeamRole } from '@/modules/shared/types'

interface ActorRolesSelectProps {
  actorRoles: TeamRole[]
  setActorRoles: (actorRoles: TeamRole[]) => Promise<URLSearchParams>
  className?: string
}

const actorRolesOptions: Option[] = [
  {
    value: TeamRole.ActiveEcosystemActor,
    label: <BuildersRolesChip role={TeamRole.ActiveEcosystemActor} />,
    group: 'Skills',
  },
  {
    value: TeamRole.ScopeFacilitator,
    label: <BuildersRolesChip role={TeamRole.ScopeFacilitator} />,
    group: 'Skills',
  },
  {
    value: TeamRole.AdvisoryCouncilMember,
    label: <BuildersRolesChip role={TeamRole.AdvisoryCouncilMember} />,
    group: 'Skills',
  },
  {
    value: TeamRole.Facilitator,
    label: <BuildersRolesChip role={TeamRole.Facilitator} />,
    group: 'Skills',
  },
  {
    value: TeamRole.ResearchExpert,
    label: <BuildersRolesChip role={TeamRole.ResearchExpert} />,
    group: 'Skills',
  },
  {
    value: TeamRole.ProjectLead,
    label: <BuildersRolesChip role={TeamRole.ProjectLead} />,
    group: 'Skills',
  },
  {
    value: TeamRole.DataExpert,
    label: <BuildersRolesChip role={TeamRole.DataExpert} />,
    group: 'Skills',
  },
  {
    value: TeamRole.TechExpert,
    label: <BuildersRolesChip role={TeamRole.TechExpert} />,
    group: 'Skills',
  },
  {
    value: TeamRole.TeamLead,
    label: <BuildersRolesChip role={TeamRole.TeamLead} />,
    group: 'Skills',
  },
  {
    value: TeamRole.All,
    label: <BuildersRolesChip role={TeamRole.All} />,
    group: 'Skills',
  },
]

function ActorRolesSelect({ actorRoles, setActorRoles, className }: ActorRolesSelectProps) {
  const selectedOptions = useMemo(
    () => actorRolesOptions.filter((option) => actorRoles.includes(option.value as TeamRole)),
    [actorRoles],
  )

  const handleChange = (options: Option[]) => {
    const values = options.map((option) => option.value as TeamRole)
    void setActorRoles(values)
  }

  return (
    <MultipleSelector
      value={selectedOptions}
      onChange={handleChange}
      options={actorRolesOptions}
      enableSearch={false}
      groupBy="group"
      enableSelectAll={true}
      selectAllGroup="Skills"
      placeholder="Skills"
      className={cn('bg-background dark:bg-background')}
      commandProps={{
        className,
      }}
      customItemRenderer={(option): React.ReactNode => option.label}
    />
  )
}

function ActorRolesSelectDrawer({ actorRoles, setActorRoles }: ActorRolesSelectProps) {
  const handleChange = (values: string[]) => {
    void setActorRoles(values as TeamRole[])
  }

  return (
    <DrawerSelect
      value={actorRoles}
      onChange={handleChange}
      label="Skills"
      options={actorRolesOptions}
      multiselect={true}
      enableSelectAll={true}
      selectAllLabel="Select All"
    />
  )
}

export { ActorRolesSelect, ActorRolesSelectDrawer }
