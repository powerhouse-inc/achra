import { Button } from '@/modules/shared/components/ui/button'
import { useIsMobile } from '@/modules/shared/hooks/use-mobile'

export function FinacesTabs() {
  const isMobile = useIsMobile()
  return (
    <div className="sm:gap:6 flex gap-2">
      <Button variant="ghost" className="p-0">
        {isMobile ? 'Realized Expenses' : 'Realized Exp.'}
      </Button>
      <Button variant="ghost" className="p-0">
        {isMobile ? 'Operational Reserves' : 'Operational Res.'}
      </Button>
      <Button variant="ghost" className="p-0">
        Forecast
      </Button>
    </div>
  )
}
