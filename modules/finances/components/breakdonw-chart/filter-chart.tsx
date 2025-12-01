import { ListFilter } from 'lucide-react'
import { Button } from '@/modules/shared/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/modules/shared/components/ui/select'

export default function FilterChart() {
  return (
    <div className="row flex gap-4">
      <div className="hidden items-center gap-4 md:flex">
        <Button variant="ghost" className="text-muted-foreground">
          Reset Filters
        </Button>
        <Select value="timeframe" onValueChange={() => {}}>
          <SelectTrigger>
            <SelectValue placeholder="Budget" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="timeframe">Budget</SelectItem>
          </SelectContent>
        </Select>
        <Select value="metric" onValueChange={() => {}}>
          <SelectTrigger>
            <SelectValue placeholder="Select Metric" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="metric">Metric</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-4 md:hidden">
        <button type="button" aria-label="Filter" onClick={() => {}} className="cursor-pointer">
          <ListFilter className="size-5" />
        </button>
      </div>
    </div>
  )
}
