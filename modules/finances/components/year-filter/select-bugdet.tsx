import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/modules/shared/components/ui/select'

interface SelectYearProps {
  selectedYear: string
  years: string[]
  onYearChange: (year: string) => void
}

export function SelectYear({ selectedYear, years, onYearChange }: SelectYearProps) {
  return (
    <div className="flex items-center gap-4">
      <Select value={selectedYear} onValueChange={onYearChange}>
        <SelectTrigger
          size="sm"
          className="dark:border-input [&_svg]:text-foreground! border! shadow-none [&_svg]:opacity-100"
        >
          <SelectValue>{selectedYear}</SelectValue>
        </SelectTrigger>

        <SelectContent side="bottom" align="end">
          <SelectGroup>
            <SelectLabel className="text-foreground! text-xs font-semibold"> Year</SelectLabel>
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
