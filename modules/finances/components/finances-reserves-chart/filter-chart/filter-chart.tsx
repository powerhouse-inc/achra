'use client'

import { usePathname } from 'next/navigation'
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs'
import { useMemo } from 'react'
import { BasicSelect } from '@/modules/shared/components/basic-select/basic-select'
import { FilterDrawer } from '@/modules/shared/components/filter-drawer/filter-drawer'
import { MultipleSelector, type Option } from '@/modules/shared/components/form/multiselect'
import { Button } from '@/modules/shared/components/ui/button'
import { BUDGETS } from '../../../mocks'
import { GRANULARITY_OPTIONS } from '../../../types'
import { formatBudgetName, getBudgetsByCodePath } from '../../../utils'
import { FinancesReservesCategoriesSelectDrawer } from '../filter-categories-finances-reserves-chart'
import { FinancesReservesGranularitySelectDrawer } from '../filter-granularity-finances-reserves-chart'

const granularityParser = parseAsString.withDefault(GRANULARITY_OPTIONS.Monthly)
const categoriesParser = parseAsArrayOf(parseAsString).withDefault([])

const getCodePathFromPathname = (pathname: string) => {
  const financesIndex = pathname.indexOf('/finances')
  if (financesIndex < 0) return 'atlas'

  const suffix = pathname.slice(financesIndex + '/finances'.length).replace(/^\/+/, '')
  return suffix ? `atlas/${suffix}` : 'atlas'
}

export function FilterChart() {
  const pathname = usePathname()
  const [granularity, setGranularity] = useQueryState('reservesGranularity', granularityParser)
  const [categories, setCategories] = useQueryState('reservesCategories', categoriesParser)

  const currentCodePath = getCodePathFromPathname(pathname)
  const categoryOptions = useMemo(() => {
    const budgets = getBudgetsByCodePath(currentCodePath, BUDGETS)
    return budgets.map((budget) => ({
      value: budget.codePath,
      label: formatBudgetName(budget.name),
    }))
  }, [currentCodePath])

  const selectedCategoryValues = categories.length
    ? categories
    : categoryOptions.map((option) => option.value)
  const selectedCategoryOptions: Option[] = categoryOptions.filter((option) =>
    selectedCategoryValues.includes(option.value),
  )

  const onReset = () => {
    void setGranularity(null)
    void setCategories(null)
  }

  return (
    <div className="row flex gap-4">
      <div className="hidden items-center gap-4 md:flex">
        <Button variant="ghost" className="text-muted-foreground" onClick={onReset}>
          Reset Filters
        </Button>
        <BasicSelect
          key={`reserves-granularity-${granularity}`}
          label="Granularity"
          value={granularity}
          onValueChange={(value) => {
            void setGranularity(value as GRANULARITY_OPTIONS)
          }}
          options={Object.values(GRANULARITY_OPTIONS)}
          placeholder="Monthly"
        />
        <MultipleSelector
          options={categoryOptions}
          value={selectedCategoryOptions}
          onChange={(values) => {
            const selectedValues = values.map((item) => item.value)
            const allValues = categoryOptions.map((item) => item.value)
            void setCategories(selectedValues.length === allValues.length ? null : selectedValues)
          }}
          placeholder="All Categories"
          className="bg-background min-w-60"
          enableSelectAll
          selectAllLabel="All Categories"
        />
      </div>
      <div className="flex items-center gap-4 md:hidden">
        <FilterDrawer onReset={onReset}>
          <FinancesReservesGranularitySelectDrawer
            granularity={granularity as GRANULARITY_OPTIONS}
            setGranularity={async (value) => setGranularity(value)}
          />
          <FinancesReservesCategoriesSelectDrawer
            categories={categoryOptions}
            selectedCategories={selectedCategoryValues}
            setCategories={async (value) =>
              setCategories(value.length === categoryOptions.length ? null : value)
            }
          />
        </FilterDrawer>
      </div>
    </div>
  )
}
