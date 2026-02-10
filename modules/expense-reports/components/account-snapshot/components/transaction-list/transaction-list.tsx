import type { SnapshotAccountTransaction } from '@/modules/__generated__/graphql/switchboard-generated'
import { getCurrencyValue } from '@/modules/expense-reports/lib/budget-statement-utils'
import { isAccountSnapshot } from '../../utils/typesHelpers'
import { Transaction } from '../transaction'
import { GroupItem } from './group-item'
import { InitialBalanceRow } from './initial-balance-row'
import { TransactionEmpty } from './transaction-empty'
import type { SnapshotAccount } from '../../types'

interface TransactionListProps {
  items?: Array<SnapshotAccountTransaction | SnapshotAccount>
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
        {items?.map((item) =>
          isAccountSnapshot(item) ? (
            <div
              key={item.id}
              className="flex flex-col gap-2 md:gap-0 md:not-last-of-type:border-b"
            >
              <GroupItem
                name={item.accountLabel}
                address={item.accountAddress ?? ''}
                initialBalance={item.snapshotAccountBalance[0]?.initialBalance ?? 0}
                inflow={item.snapshotAccountBalance[0]?.inflow ?? 0}
                outflow={item.snapshotAccountBalance[0]?.outflow ?? 0}
                newBalance={item.snapshotAccountBalance[0]?.newBalance ?? 0}
                currency="USD"
              />

              {/* TODO: uncomment this and implement it once the integration of reserve snapshot details is complete */}
              {/* {item.snapshotAccountTransaction.map(renderTransaction)} */}

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
