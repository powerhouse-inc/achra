import { usLocalizedNumber } from '@/modules/shared/lib/humanization'
import { cn } from '@/modules/shared/lib/utils'

interface InitialBalanceRowProps {
  initialBalance: number
}

function InitialBalanceRow({ initialBalance }: InitialBalanceRowProps) {
  return (
    <div
      className={cn(
        'border-border border-t',
        'hidden flex-col items-end justify-center gap-2',
        'hover:bg-muted/50',
        'px-3.5 pt-10 pb-5',
        'md:flex md:pt-2 md:pr-10 md:pb-3',
        'lg:py-4 lg:pr-14 xl:pr-16',
      )}
    >
      <div className="text-foreground/50 text-xs/4.5">Initial Balance</div>
      <div className="text-sm/5.5 font-semibold">
        {usLocalizedNumber(initialBalance)}{' '}
        <span className="text-foreground/30 text-xs/4.5 font-medium">USD</span>
      </div>
    </div>
  )
}

export { InitialBalanceRow }
