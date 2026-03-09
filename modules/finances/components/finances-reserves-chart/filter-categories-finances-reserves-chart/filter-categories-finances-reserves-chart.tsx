import { DrawerSelect } from '@/modules/shared/components/filter-drawer/filter-drawer'

interface CategoriesSelectProps {
  categories: Array<{ label: string; value: string }>
  selectedCategories: string[]
  setCategories: (categories: string[]) => Promise<URLSearchParams>
}

export function FinancesReservesCategoriesSelectDrawer({
  categories,
  selectedCategories,
  setCategories,
}: Readonly<CategoriesSelectProps>) {
  const handleChange = (values: string[]) => {
    void setCategories(values)
  }

  return (
    <DrawerSelect
      value={selectedCategories}
      onChange={handleChange}
      label="Categories"
      multiselect
      enableSelectAll
      selectAllLabel="All Categories"
      options={categories}
    />
  )
}
