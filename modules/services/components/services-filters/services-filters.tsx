'use client'

import type { ServiceTab } from '@/modules/services/config/types'
import SearchInput from '@/modules/shared/components/form/search-input'
import { ScrollableTabs, ScrollableTabsList } from '@/modules/shared/components/scrollable-tabs'
import { TabsTrigger } from '@/modules/shared/components/ui/tabs'

const SERVICES_TABS: Array<{ id: ServiceTab; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'builders', label: 'Builders' },
  { id: 'networks', label: 'Networks' },
]

interface ServicesFiltersProps {
  activeTab: ServiceTab
  onTabChange: (tab: ServiceTab) => void
}

export default function ServicesFilters({
  activeTab,
  onTabChange,
}: Readonly<ServicesFiltersProps>) {
  return (
    <div className="grid grid-cols-1 grid-rows-2 gap-4 md:grid-cols-[auto_1fr] md:grid-rows-1 md:items-center lg:gap-6">
      <SearchInput
        value=""
        onChange={() => {}}
        showKeyboardShortcut={false}
        className="h-7 w-full md:order-2 md:max-w-63.25 md:justify-self-end lg:max-w-80"
      />
      <ScrollableTabs
        value={activeTab}
        onValueChange={(value) => {
          onTabChange(value as ServiceTab)
        }}
        className="md:order-1"
      >
        <ScrollableTabsList>
          <div className="flex w-fit">
            {SERVICES_TABS.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </div>
        </ScrollableTabsList>
      </ScrollableTabs>
    </div>
  )
}
