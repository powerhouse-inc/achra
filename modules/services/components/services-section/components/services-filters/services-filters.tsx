'use client'

import SearchInput from '@/modules/shared/components/form/search-input'
import { ScrollableTabs, ScrollableTabsList } from '@/modules/shared/components/scrollable-tabs'
import { TabsTrigger } from '@/modules/shared/components/ui/tabs'

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
    <div className="grid grid-cols-1 grid-rows-2 gap-4 md:grid-cols-[auto_1fr] md:grid-rows-1 md:items-center lg:gap-6">
      <SearchInput
        value=""
        onChange={() => {}}
        showKeyboardShortcut={false}
        className="h-7 w-full md:order-2 md:max-w-63.25 md:justify-self-end lg:max-w-80"
      />
      <ScrollableTabs defaultValue="all" className="md:order-1">
        <ScrollableTabsList>
          <div className="flex w-fit">
            {SERVICES_TABS.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="text-muted-foreground data-[state=active]:text-foreground border-none px-3 py-1.5 leading-5"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </div>
        </ScrollableTabsList>
      </ScrollableTabs>
    </div>
  )
}
