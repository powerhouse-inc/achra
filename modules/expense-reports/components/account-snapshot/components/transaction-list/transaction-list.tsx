import { isAccountSnapshot } from '../../utils/typesHelpers'
import { Transaction } from '../transaction'
import { GroupItem } from './group-item'
import { InitialBalanceRow } from './initial-balance-row'
import { TransactionEmpty } from './transaction-empty'
import type { SnapshotAccount, SnapshotAccountTransaction } from '../../types'

interface TransactionListProps {
  items?: Array<SnapshotAccountTransaction | SnapshotAccount>
  highlightPositiveAmounts?: boolean
}

function TransactionList({ items, highlightPositiveAmounts = false }: TransactionListProps) {
  const renderTransaction = (transaction: SnapshotAccountTransaction) => (
    <Transaction
      key={transaction.id}
      name={transaction.txLabel ?? 'N/A'}
      date={transaction.timestamp}
      toDate={null}
      txHash={transaction.txHash}
      counterPartyName={transaction.counterPartyName ?? 'N/A'}
      counterPartyAddress={transaction.counterParty}
      amount={transaction.amount}
      highlightPositiveAmounts={highlightPositiveAmounts}
    />
  )

  return (
    <div className="relative p-0 md:px-4 lg:px-6 xl:px-14">
      <div className="bg-secondary md:bg-background flex flex-col gap-8 rounded-xl p-2 md:gap-0 md:rounded-t-none md:p-0 md:shadow-xl">
        {!items?.length && <TransactionEmpty />}
        {items?.map((item) =>
          isAccountSnapshot(item) ? (
            <div key={item.id} className="flex flex-col gap-2 md:gap-0">
              <GroupItem
                name={item.accountLabel}
                address={item.accountAddress ?? ''}
                initialBalance={item.snapshotAccountBalance[0]?.initialBalance ?? 0}
                inflow={item.snapshotAccountBalance[0]?.inflow ?? 0}
                outflow={item.snapshotAccountBalance[0]?.outflow ?? 0}
                newBalance={item.snapshotAccountBalance[0]?.newBalance ?? 0}
                currency="USD"
              />

              {item.snapshotAccountTransaction.map(renderTransaction)}

              <InitialBalanceRow
                initialBalance={item.snapshotAccountBalance[0]?.initialBalance ?? 0}
              />
            </div>
          ) : (
            renderTransaction(item)
          ),
        )}
      </div>
    </div>
  )
}

export { TransactionList }
