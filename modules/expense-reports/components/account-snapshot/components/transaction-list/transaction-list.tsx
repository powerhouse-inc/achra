import { isAccountSnapshot } from '../../utils/typesHelpers'
import { Transaction } from '../transaction'
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
      <div className="bg-secondary md:bg-background flex flex-col gap-8 rounded-xl p-2 md:gap-0 md:p-0 md:shadow-xl">
        {!items?.length && <TransactionEmpty />}
        {items?.map((item) =>
          isAccountSnapshot(item) ? (
            <div key={item.id} className="flex flex-col gap-2 md:gap-0">
              <div>Group item</div>

              {item.snapshotAccountTransaction.map(renderTransaction)}

              <div>initial balance row</div>
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
