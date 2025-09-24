import { Button } from '@/modules/shared/components/ui/button'

export function FinacesTabs() {
  return (
    <div className="sm:gap:6 flex gap-2">
      <Button variant="ghost" className="p-0">
        <span className="sm:hidden">Realized Expenses</span>
        <span className="hidden sm:inline">Realized Exp.</span>
      </Button>

      <Button variant="ghost" className="p-0">
        <span className="sm:hidden">Operational Reserves</span>
        <span className="hidden sm:inline">Operational Res.</span>
      </Button>
      <Button variant="ghost" className="p-0">
        Forecast
      </Button>
    </div>
  )
}
