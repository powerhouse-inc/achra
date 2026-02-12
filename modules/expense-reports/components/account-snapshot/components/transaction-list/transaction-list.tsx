import type {
  SnapshotAccount as GeneratedSnapshotAccount,
  SnapshotAccountTransaction,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { getBalance } from '@/modules/expense-reports/components/account-snapshot/utils/balance'
import { getCurrencyValue } from '@/modules/expense-reports/lib/budget-statement-utils'
import { isGeneratedSnapshotAccount } from '../../utils/types-helpers'
import { Transaction } from '../transaction'
import { GroupItem } from './group-item'
import { InitialBalanceRow } from './initial-balance-row'
import { TransactionEmpty } from './transaction-empty'

interface TransactionListProps {
  items?: Array<SnapshotAccountTransaction | GeneratedSnapshotAccount>
  highlightPositiveAmounts?: boolean
}

function TransactionList({ items, highlightPositiveAmounts = false }: TransactionListProps) {
  const renderTransaction = (transaction: SnapshotAccountTransaction) => (
    <Transaction
      key={transaction.id}
      label={transaction.flowType}
      date={transaction.datetime}
      toDate={null}
      txHash={transaction.txHash}
      counterPartyName={transaction.counterPartyName.trim() || 'N/A'}
      counterPartyAddress={transaction.counterParty}
      amount={getCurrencyValue(transaction.amount.value)}
      highlightPositiveAmounts={highlightPositiveAmounts}
      direction={transaction.direction}
    />
  )

  return (
    <div className="relative p-0 md:px-4 lg:px-6 xl:px-14">
      <div className="bg-secondary md:bg-background flex flex-col gap-8 rounded-xl p-2 md:gap-0 md:rounded-t-none md:p-0 md:shadow-xl">
        {!items?.length && <TransactionEmpty />}
        {items?.map((item) => {
          if (isGeneratedSnapshotAccount(item)) {
            const balance = getBalance(item)
            return (
              <div
                key={item.id}
                className="flex flex-col gap-2 md:gap-0 md:not-last-of-type:border-b"
              >
                <GroupItem
                  name={item.name || 'N/A'}
                  address={item.address}
                  initialBalance={balance.startingBalance}
                  inflow={balance.inflow}
                  outflow={balance.outflow}
                  newBalance={balance.endingBalance}
                />
                {item.transactions.map(renderTransaction)}
                <InitialBalanceRow initialBalance={balance.startingBalance} />
              </div>
            )
          }
          return renderTransaction(item)
        })}
      </div>
    </div>
  )
}

export { TransactionList }
