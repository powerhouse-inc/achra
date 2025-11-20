'use client'

import { FilterDrawer } from '@/modules/shared/components/filter-drawer/filter-drawer'
import SearchInput from '@/modules/shared/components/form/search-input'
import { Separator } from '@/modules/shared/components/ui/separator'
import { ActorRolesSelect, ActorRolesSelectDrawer } from './actor-roles-select'
import { ScopesSelect, ScopesSelectDrawer } from './scopes-select'
import useBuilderFilters from './useBuilderFilters'

export default function BuilderFilters() {
  const { search, scopes, actorRoles, setSearch, setScopes, setActorRoles, onReset } =
    useBuilderFilters()

  return (
    <div className="grid grid-cols-[1fr_auto] grid-rows-1 gap-4 sm:grid-cols-1 sm:grid-rows-2 md:flex lg:gap-6">
      <SearchInput
        value={search}
        onChange={(value) => void setSearch(value)}
        placeholder="Search..."
      />
      <div className="hidden items-center gap-4 sm:flex lg:gap-6">
        <ScopesSelect
          scopes={scopes}
          setScopes={setScopes}
          className="w-1/2 md:w-full md:max-w-54 md:min-w-54 lg:max-w-64 lg:min-w-64 xl:max-w-75 xl:min-w-75"
        />
        <ActorRolesSelect
          actorRoles={actorRoles}
          setActorRoles={setActorRoles}
          className="w-1/2 md:w-full md:max-w-54 md:min-w-54 lg:max-w-64 lg:min-w-64 xl:max-w-75 xl:min-w-75"
        />
      </div>

      <div className="flex items-center gap-4 sm:hidden">
        <Separator orientation="vertical" className="h-7!" />
        <FilterDrawer onReset={onReset}>
          <ScopesSelectDrawer scopes={scopes} setScopes={setScopes} />
          <ActorRolesSelectDrawer actorRoles={actorRoles} setActorRoles={setActorRoles} />
        </FilterDrawer>
      </div>
    </div>
  )
}
