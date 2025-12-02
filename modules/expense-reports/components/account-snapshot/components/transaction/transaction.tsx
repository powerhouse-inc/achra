import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import { MobileTransaction } from './mobile-transaction'

export interface TransactionProps {
  name: string
  date: string
  toDate?: string | null
  txHash: string | null
  counterPartyName: string
  counterPartyAddress: string
  amount: number
  highlightPositiveAmounts?: boolean
}

function Transaction({
  name,
  date,
  toDate,
  txHash,
  counterPartyName,
  counterPartyAddress,
  amount,
  highlightPositiveAmounts = false,
}: TransactionProps) {
  const isMobile = useMediaQuery({ to: 'md' })
  const isIncomingTransaction = amount > 0

  return isMobile ? (
    <MobileTransaction
      name={name}
      date={date}
      toDate={toDate}
      txHash={txHash}
      counterPartyName={counterPartyName}
      counterPartyAddress={counterPartyAddress}
      amount={amount}
      highlightPositiveAmounts={highlightPositiveAmounts}
    />
  ) : (
    <div className="h-20">Desktop transaction {isIncomingTransaction}</div>
  )
}

export { Transaction }
