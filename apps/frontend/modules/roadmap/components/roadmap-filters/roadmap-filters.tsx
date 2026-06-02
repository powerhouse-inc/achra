'use client'

import { FilterDrawer } from '@/modules/shared/components/filter-drawer/filter-drawer'
import { SearchInput } from '@/modules/shared/components/form/search-input'
import { Separator } from '@/modules/shared/components/ui/separator'
import { StatusSelect, StatusSelectDrawer } from './status-select'
import { useWorkstreamFilters as useRoadmapFilters } from './use-roadmap-filters'

function RoadmapFilters() {
  const { search, statuses, setSearch, setStatuses, onReset } = useRoadmapFilters()

  return (
    <div className="grid grid-cols-[1fr_auto] grid-rows-1 gap-4 sm:grid-cols-1 sm:grid-rows-2 md:flex lg:gap-6">
      <SearchInput
        value={search}
        onChange={(value) => void setSearch(value)}
        placeholder="Search by Roadmap name, code, coordinators..."
      />
      <div className="hidden items-center gap-4 sm:flex lg:gap-6">
        <StatusSelect
          statuses={statuses}
          setStatuses={setStatuses}
          className="w-1/2 md:w-full md:max-w-54 md:min-w-54 lg:max-w-64 lg:min-w-64 xl:max-w-75 xl:min-w-75"
        />
      </div>

      <div className="flex items-center gap-4 sm:hidden">
        <Separator orientation="vertical" className="h-7!" />
        <FilterDrawer onReset={onReset}>
          <StatusSelectDrawer statuses={statuses} setStatuses={setStatuses} />
        </FilterDrawer>
      </div>
    </div>
  )
}

export { RoadmapFilters }
