'use client'

import { FilterDrawer } from '@/modules/shared/components/filter-drawer/filter-drawer'
import SearchInput from '@/modules/shared/components/form/search-input'
import { Button } from '@/modules/shared/components/ui/button'
import { Separator } from '@/modules/shared/components/ui/separator'
import { BuilderSkillsSelect, BuilderSkillsSelectDrawer } from './builder-skills-select'
import useBuildersFilters from './useBuildersFilters'

export default function BuilderFilters() {
  const { search, builderSkills, setSearch, setBuilderSkills, onReset } = useBuildersFilters()

  return (
    <div className="grid grid-cols-[1fr_auto] gap-4 md:grid-cols-[1fr_400px] lg:gap-6">
      <SearchInput
        value={search}
        onChange={(value) => void setSearch(value)}
        placeholder="Search..."
      />
      <div className="hidden items-center gap-2 md:flex lg:gap-4">
        <BuilderSkillsSelect
          builderSkills={builderSkills}
          setBuilderSkills={setBuilderSkills}
          className="w-69"
        />
        <Button
          className="text-foreground/50 px-4 hover:bg-transparent dark:hover:bg-transparent"
          variant="ghost"
          onClick={onReset}
        >
          Reset Filter
        </Button>
      </div>

      <div className="flex items-center gap-4 md:hidden">
        <Separator orientation="vertical" className="h-7!" />
        <FilterDrawer onReset={onReset}>
          <BuilderSkillsSelectDrawer
            builderSkills={builderSkills}
            setBuilderSkills={setBuilderSkills}
          />
        </FilterDrawer>
      </div>
    </div>
  )
}
