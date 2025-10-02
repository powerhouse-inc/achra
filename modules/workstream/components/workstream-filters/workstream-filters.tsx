'use client'

import { FilterDrawer } from '@/modules/shared/components/filter-drawer/filter-drawer'
import SearchInput from '@/modules/shared/components/form/search-input'
import { Separator } from '@/modules/shared/components/ui/separator'
import { NetworkSelect, NetworkSelectDrawer } from './network-select'
import { StatusSelect, StatusSelectDrawer } from './status-select'
import useWorkstreamFilters from './useWorkstreamFilters'

export default function WorkstreamFilters() {
  const { search, status, networks, setSearch, setStatus, setNetworks, onReset } =
    useWorkstreamFilters()

  return (
    <div className="grid grid-cols-[1fr_auto] grid-rows-1 gap-4 sm:grid-cols-1 sm:grid-rows-2 md:flex lg:gap-6">
      <SearchInput value={search} onChange={(value) => void setSearch(value)} />
      <div className="hidden items-center gap-4 sm:flex lg:gap-6">
        <StatusSelect
          status={status}
          setStatus={setStatus}
          className="sm:flex-1 md:w-full md:max-w-54 md:min-w-54 lg:max-w-64 lg:min-w-64 xl:max-w-75 xl:min-w-75"
        />
        <NetworkSelect
          networks={networks}
          setNetworks={setNetworks}
          className="sm:flex-1 md:w-full md:max-w-46 md:min-w-46 xl:max-w-75 xl:min-w-75"
        />
      </div>

      <div className="flex items-center gap-4 sm:hidden">
        <Separator orientation="vertical" className="h-7!" />
        <FilterDrawer onReset={onReset}>
          <NetworkSelectDrawer networks={networks} setNetworks={setNetworks} />
          <StatusSelectDrawer status={status} setStatus={setStatus} />
        </FilterDrawer>
      </div>
    </div>
  )
}
