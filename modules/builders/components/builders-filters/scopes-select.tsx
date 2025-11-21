import { useMemo } from 'react'
import { BuildersScopesChip } from '@/modules/shared/components/chips/builders-scopes-chip/builders-scopes-chip'
import { DrawerSelect } from '@/modules/shared/components/filter-drawer/filter-drawer'
import { MultipleSelector, type Option } from '@/modules/shared/components/form/multiselect'
import { TeamScopeEnum } from '@/modules/shared/enums/actorScopeEnum'
import { cn } from '@/modules/shared/lib/utils'

interface ScopesSelectProps {
  scopes: TeamScopeEnum[]
  setScopes: (scopes: TeamScopeEnum[]) => Promise<URLSearchParams>
  className?: string
}

const scopesOptions: Option[] = [
  {
    value: TeamScopeEnum.SupportScope,
    label: <BuildersScopesChip scope={TeamScopeEnum.SupportScope} />,
    group: 'Scopes',
  },
  {
    value: TeamScopeEnum.StabilityScope,
    label: <BuildersScopesChip scope={TeamScopeEnum.StabilityScope} />,
    group: 'Scopes',
  },
  {
    value: TeamScopeEnum.AccessibilityScope,
    label: <BuildersScopesChip scope={TeamScopeEnum.AccessibilityScope} />,
    group: 'Scopes',
  },
  {
    value: TeamScopeEnum.ProtocolScope,
    label: <BuildersScopesChip scope={TeamScopeEnum.ProtocolScope} />,
    group: 'Scopes',
  },
  {
    value: TeamScopeEnum.GovernanceScope,
    label: <BuildersScopesChip scope={TeamScopeEnum.GovernanceScope} />,
    group: 'Scopes',
  },
  {
    value: TeamScopeEnum.All,
    label: <BuildersScopesChip scope={TeamScopeEnum.All} />,
    group: 'Scopes',
  },
]

function ScopesSelect({ scopes, setScopes, className }: ScopesSelectProps) {
  const selectedOptions = useMemo(
    () => scopesOptions.filter((option) => scopes.includes(option.value as TeamScopeEnum)),
    [scopes],
  )

  const handleChange = (options: Option[]) => {
    const values = options.map((option) => option.value as TeamScopeEnum)
    void setScopes(values)
  }

  return (
    <MultipleSelector
      value={selectedOptions}
      onChange={handleChange}
      options={scopesOptions}
      enableSearch={false}
      groupBy="group"
      enableSelectAll={true}
      selectAllGroup="Scopes"
      placeholder="Scopes"
      className={cn('bg-background dark:bg-background')}
      commandProps={{
        className,
      }}
      customItemRenderer={(option): React.ReactNode => option.label}
    />
  )
}

function ScopesSelectDrawer({ scopes, setScopes }: ScopesSelectProps) {
  const handleChange = (values: string[]) => {
    void setScopes(values as TeamScopeEnum[])
  }

  return (
    <DrawerSelect
      value={scopes}
      onChange={handleChange}
      label="Scopes"
      options={scopesOptions}
      multiselect={true}
      enableSelectAll={true}
      selectAllLabel="Select All"
    />
  )
}

export { ScopesSelect, ScopesSelectDrawer }
