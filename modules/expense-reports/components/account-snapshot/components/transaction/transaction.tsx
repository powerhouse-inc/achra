import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import { DesktopTransaction } from './desktop-transaction'
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
    <DesktopTransaction
      name={name}
      date={date}
      toDate={toDate}
      amount={amount}
      txHash={txHash}
      counterPartyName={counterPartyName}
      counterPartyAddress={counterPartyAddress}
    />
  )
}

export { Transaction }
