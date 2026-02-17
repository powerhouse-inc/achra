import { sortBy, sumBy } from 'lodash'
import type {
  BudgetStatementExpenseReport,
  ExpenseReportLineItem,
  ExpenseReportWallet,
  SnapshotAccount,
  SnapshotAccountTransaction,
} from '@/modules/__generated__/graphql/switchboard-generated'
import type { InnerTableColumn, InnerTableRow } from '@/modules/expense-reports/types'
import { isGeneratedSnapshotAccount } from '../components/account-snapshot/utils/types-helpers'
import { WalletTableCell } from '../components/wallet-table-cell'
import { STABLECOIN_UNITS } from './constants'
import { capitalizeSentence, formatAddressForOutput } from './strings'

function renderWallet(wallet: ExpenseReportWallet) {
  return (
    <WalletTableCell
      key={wallet.address}
      name={wallet.name ?? ''}
      wallet={formatAddressForOutput(wallet.address)}
      address={wallet.address}
    />
  )
}

export function getWalletsFromBudgetStatement(
  budgetStatement?: Partial<BudgetStatementExpenseReport>,
) {
  if (!budgetStatement?.wallets || budgetStatement.wallets.length === 0) {
    return []
  }

  const dict: Record<string, ExpenseReportWallet> = {}

  budgetStatement.wallets.forEach((wallet) => {
    // could be multiple wallets with the same address, we need to keep only the first one
    const savedWallet = dict[wallet.address.toLowerCase()] as ExpenseReportWallet | undefined

    if (wallet.address && !savedWallet) {
      wallet.name = capitalizeSentence(wallet.name ?? '')
      dict[wallet.address.toLowerCase()] = wallet
    }
  })

  return sortBy(Object.values(dict), 'id')
}

export function getCurrencyValue(amount: unknown): number {
  if (!amount) return 0

  if (typeof amount === 'number') {
    return amount
  }

  const num = Number((amount as { value: string }).value)
  return isNaN(num) ? 0 : num
}

export function isStablecoinLineItem(item: ExpenseReportLineItem): boolean {
  const currencyFields = [item.budget, item.actuals, item.forecast, item.payments]

  return currencyFields.every((field) => {
    if (!field) {
      return true
    }

    if (typeof field === 'object') {
      const unit = (field as { unit?: string }).unit
      // If unit is missing, undefined, or empty, assume it's USDS
      if (unit === undefined || unit === '') {
        return true
      }
      // If unit exists, it must be a stablecoin
      return STABLECOIN_UNITS.includes(unit)
    }

    // For other types, assume it's USDS
    return true
  })
}

export function getActualsTableData(wallets: ExpenseReportWallet[]): {
  columns: InnerTableColumn[]
  items: InnerTableRow[]
} {
  const mainTableColumns: InnerTableColumn[] = [
    {
      header: 'Wallet',
      align: 'left',
      type: 'custom',
      cellRender: renderWallet,
      isCardHeader: true,
      className: wallets.some((wallet) => (wallet.name?.length ?? 0) > 25)
        ? 'w-50 min-w-50 md:w-58 md:min-w-58'
        : 'w-47 min-w-47 md:w-55 md:min-w-55',
    },
    {
      header: 'Mthly Budget',
      align: 'right',
      type: 'number',
      hasBorderBottomOnCard: true,
    },
    {
      header: 'Forecast',
      align: 'right',
      type: 'incomeNumber',
      hasBorderBottomOnCard: true,
    },
    {
      header: 'Actuals',
      align: 'right',
      type: 'incomeNumber',
      hasBorderBottomOnCard: true,
    },
    {
      header: 'Difference',
      align: 'right',
      type: 'number',
      hasBorderBottomOnCard: true,
    },
    {
      header: 'Payments',
      align: 'right',
      type: 'number',
    },
  ]

  const mainTableItems: InnerTableRow[] = []

  // add wallet rows
  wallets.forEach((wallet) => {
    const stablecoinItems = wallet.lineItems.filter(isStablecoinLineItem)
    const actuals = sumBy(stablecoinItems, (item) => getCurrencyValue(item.actuals))
    const forecast = sumBy(stablecoinItems, (item) => getCurrencyValue(item.forecast))
    const numberCellData = [
      sumBy(stablecoinItems, (item) => getCurrencyValue(item.budget)),
      forecast,
      actuals,
      forecast - actuals,
      sumBy(stablecoinItems, (item) => getCurrencyValue(item.payments)),
    ]

    if (numberCellData.some((n) => n !== 0)) {
      mainTableItems.push({
        showHeader: false, // Hide header for wallet rows
        type: 'normal',
        items: [
          {
            column: mainTableColumns[0],
            value: wallet,
          },
          {
            column: mainTableColumns[1],
            value: numberCellData[0],
          },
          {
            column: mainTableColumns[2],
            value: numberCellData[1],
          },
          {
            column: mainTableColumns[3],
            value: numberCellData[2],
          },
          {
            column: mainTableColumns[4],
            value: numberCellData[3],
          },
          {
            column: mainTableColumns[5],
            value: numberCellData[4],
          },
        ],
      })
    }
  })

  // add total rows if there are at least one wallet row
  if (mainTableItems.length > 0) {
    const totalBudget = sumBy(wallets, (wallet) =>
      sumBy(wallet.lineItems.filter(isStablecoinLineItem), (item) => getCurrencyValue(item.budget)),
    )
    const totalForecast = sumBy(wallets, (wallet) =>
      sumBy(wallet.lineItems.filter(isStablecoinLineItem), (item) =>
        getCurrencyValue(item.forecast),
      ),
    )
    const totalActual = sumBy(wallets, (wallet) =>
      sumBy(wallet.lineItems.filter(isStablecoinLineItem), (item) =>
        getCurrencyValue(item.actuals),
      ),
    )
    const totalDifference = totalForecast - totalActual
    const totalPayment = sumBy(wallets, (wallet) =>
      sumBy(wallet.lineItems.filter(isStablecoinLineItem), (item) =>
        getCurrencyValue(item.payments),
      ),
    )

    mainTableItems.push({
      type: 'total',
      // Hidden the header for total
      showHeader: false,
      items: [
        {
          column: mainTableColumns[0],
          value: 'Total',
        },
        {
          column: mainTableColumns[1],
          value: totalBudget,
        },
        {
          column: mainTableColumns[2],
          value: totalForecast,
        },
        {
          column: mainTableColumns[3],
          value: totalActual,
        },
        {
          column: mainTableColumns[4],
          value: totalDifference,
        },
        {
          column: mainTableColumns[5],
          value: totalPayment,
        },
      ],
      hideMobile: mainTableItems.length < 2,
    })
  }

  return {
    columns: mainTableColumns,
    items: mainTableItems,
  }
}

export function filterAccountAndTransactions(
  items: Array<SnapshotAccountTransaction | SnapshotAccount>,
): Array<SnapshotAccountTransaction | SnapshotAccount> {
  const filteredItems: Array<SnapshotAccountTransaction | SnapshotAccount> = []
  items.forEach((item) => {
    if (isGeneratedSnapshotAccount(item)) {
      filteredItems.push({
        ...item,
        transactions: item.transactions
          .filter((transaction) => STABLECOIN_UNITS.includes(transaction.amount.unit))
          .sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime()),
      })
    } else if (STABLECOIN_UNITS.includes(item.amount.unit)) {
      filteredItems.push(item)
    }
  })

  return filteredItems
}
