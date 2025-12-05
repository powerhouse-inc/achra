import { usLocalizedNumber } from '@/modules/shared/lib/humanization'

interface InitialBalanceRowProps {
  initialBalance: number
}

function InitialBalanceRow({ initialBalance }: InitialBalanceRowProps) {
  return (
    <div className="border-border hover:bg-muted/50 hidden flex-col items-end justify-center gap-2 border-t px-3.5 pt-10 pb-5 md:flex lg:px-6 lg:pt-6 lg:pb-5">
      <div className="text-foreground/50 text-xs/4.5">Initial Balance</div>
      <div className="text-sm/5.5 font-semibold">
        {usLocalizedNumber(initialBalance)}{' '}
        <span className="text-foreground/30 text-xs/4.5 font-medium">USD</span>
      </div>
    </div>
  )
}

export { InitialBalanceRow }
