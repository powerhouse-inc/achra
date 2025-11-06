'use client'

import { FilterDrawer } from '@/modules/shared/components/filter-drawer/filter-drawer'
import SearchInput from '@/modules/shared/components/form/search-input'
import { Separator } from '@/modules/shared/components/ui/separator'
import { Tabs, TabsList, TabsTrigger } from '@/modules/shared/components/ui/tabs'

const SERVICES_TABS = [
  {
    id: 'all',
    label: 'All',
  },
  { id: 'builders', label: 'Builders' },
  {
    id: 'operators',
    label: 'Operators',
  },
  {
    id: 'founders',
    label: 'Founders',
  },
  {
    id: 'sno-governors',
    label: 'SNO Governors',
  },
]

export default function ServicesFilters() {
  return (
    <div className="grid grid-cols-[1fr_auto] grid-rows-1 gap-4 sm:grid-cols-1 sm:grid-rows-2 md:flex md:items-center md:justify-between lg:gap-6">
      <SearchInput
        value=""
        onChange={() => {}}
        showKeyboardShortcut={false}
        className="h-7 w-full md:order-2 md:max-w-80"
      />
      <Tabs defaultValue="all" className="hidden sm:flex md:order-1">
        <TabsList className="h-10 rounded-md p-1">
          {SERVICES_TABS.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="text-muted-foreground data-[state=active]:text-foreground border-none px-3 py-1.5 leading-5"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="flex items-center gap-4 sm:hidden">
        <Separator orientation="vertical" className="h-7!" />
        <FilterDrawer>
          <Tabs defaultValue="all" orientation="vertical">
            <TabsList className="h-auto w-full rounded-md p-1 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch">
              {SERVICES_TABS.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="justify-start border-none px-3 py-1.5 leading-5"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </FilterDrawer>
      </div>
    </div>
  )
}
