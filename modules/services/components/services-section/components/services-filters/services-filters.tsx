'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import SearchInput from '@/modules/shared/components/form/search-input'
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
  const tabsListRef = useRef<HTMLDivElement>(null)
  const [showLeftGradient, setShowLeftGradient] = useState(false)
  const [showRightGradient, setShowRightGradient] = useState(false)

  const updateGradients = useCallback(() => {
    const element = tabsListRef.current

    if (!element) {
      return
    }

    const { scrollLeft, scrollWidth, clientWidth } = element

    setShowLeftGradient(scrollLeft > 0)
    setShowRightGradient(scrollLeft + clientWidth < scrollWidth - 1)
  }, [])

  useEffect(() => {
    updateGradients()
  }, [updateGradients])

  useEffect(() => {
    const element = tabsListRef.current

    if (!element) {
      return
    }

    element.addEventListener('scroll', updateGradients)
    window.addEventListener('resize', updateGradients)

    return () => {
      element.removeEventListener('scroll', updateGradients)
      window.removeEventListener('resize', updateGradients)
    }
  }, [updateGradients])

  return (
    <div className="grid grid-cols-1 grid-rows-2 gap-4 md:flex md:items-center md:justify-between lg:gap-6">
      <SearchInput
        value=""
        onChange={() => {}}
        showKeyboardShortcut={false}
        className="h-7 w-full md:order-2 md:max-w-80"
      />
      <Tabs defaultValue="all" className="relative overflow-hidden md:order-1">
        {showLeftGradient && (
          <div className="from-background pointer-events-none absolute top-0 left-0 z-10 h-10.5 w-16 rounded-tl-lg bg-linear-to-r to-transparent md:hidden" />
        )}
        {showRightGradient && (
          <div className="from-background pointer-events-none absolute top-0 right-0 z-10 h-10.5 w-16 rounded-tr-lg bg-linear-to-l to-transparent md:hidden" />
        )}
        <TabsList
          ref={tabsListRef}
          className="no-scrollbar h-10 w-full justify-start overflow-x-auto rounded-md p-1"
        >
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
        </TabsList>
      </Tabs>
      {/* <div className="flex items-center gap-4 sm:hidden">
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
      </div> */}
    </div>
  )
}
