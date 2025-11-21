'use client'

import { FilterDrawer } from '@/modules/shared/components/filter-drawer/filter-drawer'
import SearchInput from '@/modules/shared/components/form/search-input'
import { Button } from '@/modules/shared/components/ui/button'
import { Separator } from '@/modules/shared/components/ui/separator'
import { ActorRolesSelect, ActorRolesSelectDrawer } from './actor-roles-select'
import { ScopesSelect, ScopesSelectDrawer } from './scopes-select'
import useBuilderFilters from './useBuildersFilters'

export default function BuilderFilters() {
  const { search, scopes, actorRoles, setSearch, setScopes, setActorRoles, onReset } =
    useBuilderFilters()

  return (
    <div className="grid grid-cols-[1fr_auto] gap-4 sm:grid-cols-1 lg:grid-cols-[1fr_508px] lg:gap-6">
      <SearchInput
        value={search}
        onChange={(value) => void setSearch(value)}
        placeholder="Search..."
      />
      <div className="hidden items-center gap-4 sm:flex">
        <ScopesSelect scopes={scopes} setScopes={setScopes} className="w-46" />
        <ActorRolesSelect actorRoles={actorRoles} setActorRoles={setActorRoles} className="w-46" />
        <Button
          className="text-foreground/50 px-4 hover:bg-transparent dark:hover:bg-transparent"
          variant="ghost"
          onClick={onReset}
        >
          Reset Filter
        </Button>
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
