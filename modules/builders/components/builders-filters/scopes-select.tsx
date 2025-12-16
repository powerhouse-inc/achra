import { useMemo } from 'react'
import { BuilderScope } from '@/modules/__generated__/graphql/switchboard-generated'
import BuildersScopesChip from '@/modules/shared/components/chips/builders-scopes-chip/builders-scopes-chip'
import { DrawerSelect } from '@/modules/shared/components/filter-drawer/filter-drawer'
import { MultipleSelector, type Option } from '@/modules/shared/components/form/multiselect'
import { cn } from '@/modules/shared/lib/utils'

interface ScopesSelectProps {
  scopes: BuilderScope[]
  setScopes: (scopes: BuilderScope[]) => Promise<URLSearchParams>
  className?: string
}

const scopesOptions: Option[] = [
  {
    value: BuilderScope.SupportScope,
    label: <BuildersScopesChip scope={BuilderScope.SupportScope} />,
    group: 'Scopes',
  },
  {
    value: BuilderScope.StabilityScope,
    label: <BuildersScopesChip scope={BuilderScope.StabilityScope} />,
    group: 'Scopes',
  },
  {
    value: BuilderScope.Acc,
    label: <BuildersScopesChip scope={BuilderScope.Acc} />,
    group: 'Scopes',
  },
  {
    value: BuilderScope.Sta,
    label: <BuildersScopesChip scope={BuilderScope.Sta} />,
    group: 'Scopes',
  },
  {
    value: BuilderScope.ProtocolScope,
    label: <BuildersScopesChip scope={BuilderScope.ProtocolScope} />,
    group: 'Scopes',
  },
  {
    value: BuilderScope.GovernanceScope,
    label: <BuildersScopesChip scope={BuilderScope.GovernanceScope} />,
    group: 'Scopes',
  },
]

function ScopesSelect({ scopes, setScopes, className }: ScopesSelectProps) {
  const selectedOptions = useMemo(
    () => scopesOptions.filter((option) => scopes.includes(option.value as BuilderScope)),
    [scopes],
  )

  const handleChange = (options: Option[]) => {
    const values = options.map((option) => option.value as BuilderScope)
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
    void setScopes(values as BuilderScope[])
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
