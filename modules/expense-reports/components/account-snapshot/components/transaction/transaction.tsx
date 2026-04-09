'use client'

import type { AccountTransactionDirection } from '@/modules/__generated__/graphql/switchboard-generated'
import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import { DesktopTransaction } from './desktop-transaction'
import { MobileTransaction } from './mobile-transaction'

export interface TransactionProps {
  label: string
  date: string
  toDate?: string | null
  txHash: string | null
  counterPartyName: string
  counterPartyAddress: string
  amount: number
  highlightPositiveAmounts?: boolean
  direction: AccountTransactionDirection
}

function Transaction({
  label,
  date,
  toDate,
  txHash,
  counterPartyName,
  counterPartyAddress,
  amount,
  highlightPositiveAmounts = false,
  direction,
}: TransactionProps) {
  const isMobile = useMediaQuery({ to: 'md' })

  return isMobile ? (
    <MobileTransaction
      label={label}
      date={date}
      toDate={toDate}
      txHash={txHash}
      counterPartyName={counterPartyName}
      counterPartyAddress={counterPartyAddress}
      amount={amount}
      highlightPositiveAmounts={highlightPositiveAmounts}
      direction={direction}
    />
  ) : (
    <DesktopTransaction
      label={label}
      date={date}
      toDate={toDate}
      amount={amount}
      txHash={txHash}
      counterPartyName={counterPartyName}
      counterPartyAddress={counterPartyAddress}
      direction={direction}
    />
  )
}

export { Transaction }
