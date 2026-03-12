'use client'

import { BasicSelect } from '@/modules/shared/components/basic-select/basic-select'
import { DrawerSelect, FilterDrawer } from '@/modules/shared/components/filter-drawer/filter-drawer'
import { MultipleSelector, type Option } from '@/modules/shared/components/form/multiselect'
import { Button } from '@/modules/shared/components/ui/button'
import { Separator } from '@/modules/shared/components/ui/separator'

interface ReservesWaterfallChartFiltersProps {
  granularityValue?: string
  granularityOptions: string[]
  onGranularityChange: (selectedLabel: string) => void
  categoryOptions: Option[]
  selectedCategoryOptions: Option[]
  setActiveElements: (values: string[] | null) => void
  canReset: boolean
  onReset: () => void
}

function ReservesWaterfallChartFilters({
  granularityValue,
  granularityOptions,
  onGranularityChange,
  categoryOptions,
  selectedCategoryOptions,
  setActiveElements,
  canReset,
  onReset,
}: Readonly<ReservesWaterfallChartFiltersProps>) {
  const handleCategoriesChange = (values: Option[]) => {
    const selectedValues = values.map((item) => item.value)
    setActiveElements(selectedValues.length === categoryOptions.length ? null : selectedValues)
  }

  const selectedCategoryValues = selectedCategoryOptions.map((item) => item.value)

  return (
    <>
      <div className="hidden items-center gap-3 md:flex lg:gap-4">
        <BasicSelect
          label="Granularity"
          value={granularityValue}
          placeholder="Monthly"
          options={granularityOptions}
          onValueChange={onGranularityChange}
          className="min-w-38"
        />
        <MultipleSelector
          options={categoryOptions}
          value={selectedCategoryOptions}
          onChange={handleCategoriesChange}
          placeholder="All Categories"
          className="bg-background max-w-72 min-w-72"
          enableSelectAll
          selectAllLabel="All Categories"
        />
        <Button
          variant="ghost"
          className="text-foreground/50 px-4 hover:bg-transparent dark:hover:bg-transparent"
          onClick={onReset}
          disabled={!canReset}
        >
          Reset Filters
        </Button>
      </div>

      <div className="flex items-center gap-4 md:hidden">
        <Separator orientation="vertical" className="h-7!" />
        <FilterDrawer onReset={onReset} isResetDisabled={!canReset}>
          <DrawerSelect
            value={granularityValue}
            onChange={(value: string) => {
              onGranularityChange(value)
            }}
            label="Granularity"
            options={granularityOptions.map((option) => ({ label: option, value: option }))}
          />
          <DrawerSelect
            value={selectedCategoryValues}
            onChange={(values: string[]) => {
              setActiveElements(values.length === categoryOptions.length ? null : values)
            }}
            label="Categories"
            options={categoryOptions.map((option) => ({
              label: option.label,
              value: option.value,
            }))}
            multiselect
            enableSelectAll
            selectAllLabel="All Categories"
          />
        </FilterDrawer>
      </div>
    </>
  )
}

export { ReservesWaterfallChartFilters }
