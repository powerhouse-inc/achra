'use client'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/modules/shared/components/ui/select'

export function YearSelect() {
  const [selectedYear, setSelectedYear] = useState('2025')
  const years = ['2023', '2024', '2025']

  const handleYearSelect = (year: string) => {
    setSelectedYear(year)
  }

  return (
    <div className="flex items-center gap-4">
      <Select value={selectedYear} onValueChange={handleYearSelect}>
        <SelectTrigger
          size="sm"
          className="dark:border-input [&_svg]:text-foreground! focus-visible:border-input w-32 border! shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 [&_svg]:opacity-100 [&_svg]:transition-transform [&_svg]:duration-200 data-[state=open]:[&_svg]:rotate-180"
          aria-label="Select year"
        >
          <SelectValue />
        </SelectTrigger>

        <SelectContent side="bottom" align="end">
          <SelectGroup>
            <SelectLabel className="text-foreground! text-xs font-semibold">Year</SelectLabel>
            {years.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
