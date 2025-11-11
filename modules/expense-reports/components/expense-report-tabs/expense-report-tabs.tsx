'use client'

import { Maximize2, Minimize2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { Tabs, TabsList, TabsTrigger } from '@/modules/shared/components/ui/tabs'
import { sectionSearchParamParser, viewModeSearchParamParser } from '../../lib/search-params-client'
import { AuditorTabSection, CommonTabSection, DefaultTabSection, ViewMode } from '../../types'
import type { Route } from 'next'

type Tab =
  | {
      label: string
      value: string
    }
  | {
      label: React.ReactNode
      value: string
      href: Route
    }

const defaultTabs: Tab[] = [
  {
    label: 'Actuals',
    value: DefaultTabSection.ACTUALS,
  },
]

const auditorTabs: Tab[] = [
  {
    label: 'Expense Reports',
    value: AuditorTabSection.EXPENSE_REPORTS,
  },
]

function ExpenseReportTabs() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [viewMode] = useQueryState('view', viewModeSearchParamParser)
  const [section] = useQueryState('section', sectionSearchParamParser)

  const tabs = viewMode === ViewMode.AUDITOR ? auditorTabs : defaultTabs

  const createUrl = (sectionValue: string): Route => {
    const params = new URLSearchParams(searchParams.toString())

    if (sectionValue == CommonTabSection.ACCOUNT_SNAPSHOT) {
      // we don't show the first tab in the url to keep it cleaner
      params.delete('section')
    } else {
      params.set('section', sectionValue)
    }

    return `${pathname}?${params.toString()}` as Route
  }

  const createAuditorUrl = () => {
    const params = new URLSearchParams(searchParams.toString())

    if (viewMode === ViewMode.AUDITOR) {
      params.delete('view')
    } else {
      params.set('view', ViewMode.AUDITOR)
    }

    if (section === CommonTabSection.ACCOUNT_SNAPSHOT) {
      params.delete('section')
    } else {
      params.set(
        'section',
        viewMode === ViewMode.AUDITOR
          ? DefaultTabSection.ACTUALS
          : AuditorTabSection.EXPENSE_REPORTS,
      )
    }

    return `${pathname}?${params.toString()}` as Route
  }

  return (
    <Tabs value={section}>
      <TabsList>
        {/* account snapshot tab */}
        <TabsTrigger value={CommonTabSection.ACCOUNT_SNAPSHOT} asChild>
          <Link href={createUrl(CommonTabSection.ACCOUNT_SNAPSHOT)}>Account Snapshot</Link>
        </TabsTrigger>

        {/* rest of the tabs */}
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} asChild>
            <Link
              href={
                'href' in tab
                  ? section !== CommonTabSection.ACCOUNT_SNAPSHOT
                    ? `${tab.href}?section=${viewMode === ViewMode.AUDITOR ? DefaultTabSection.ACTUALS : AuditorTabSection.EXPENSE_REPORTS}`
                    : tab.href
                  : createUrl(tab.value)
              }
            >
              {tab.label}
            </Link>
          </TabsTrigger>
        ))}

        {/* view mode switcher */}
        <TabsTrigger value={viewMode === ViewMode.AUDITOR ? 'auditor' : 'default'} asChild>
          <Link href={createAuditorUrl()}>
            {viewMode === ViewMode.AUDITOR ? (
              <Minimize2 className="size-4" />
            ) : (
              <Maximize2 className="size-4" />
            )}
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export { ExpenseReportTabs }
