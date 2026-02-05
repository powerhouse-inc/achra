import { sortBy, sumBy } from 'lodash'
import type {
  BudgetStatementExpenseReport,
  ExpenseReportLineItem,
  ExpenseReportWallet,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { WalletTableCell } from '../components/wallet-table-cell'
import { capitalizeSentence, formatAddressForOutput } from './strings'
import type { InnerTableColumn, InnerTableRow } from '../components/advanced-inner-table/types'

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

export function isUsdsLineItem(item: ExpenseReportLineItem): boolean {
  const currencyFields = [item.budget, item.actuals, item.forecast, item.payments]

  return currencyFields.every((field) => {
    // If field is null, undefined, or empty, assume it's USDS
    if (!field) {
      return true
    }

    // If field is an object, check its unit property
    if (typeof field === 'object') {
      const unit = (field as { unit?: string }).unit
      // If unit is missing, undefined, or empty, assume it's USDS
      if (unit === undefined || unit === '') {
        return true
      }
      // If unit exists, it must be 'USDS'
      return unit === 'USDS'
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
    const usdsItems = wallet.lineItems.filter(isUsdsLineItem)
    const actuals = sumBy(usdsItems, (item) => getCurrencyValue(item.actuals))
    const forecast = sumBy(usdsItems, (item) => getCurrencyValue(item.forecast))
    const numberCellData = [
      sumBy(usdsItems, (item) => getCurrencyValue(item.budget)),
      forecast,
      actuals,
      forecast - actuals,
      sumBy(usdsItems, (item) => getCurrencyValue(item.payments)),
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
      sumBy(wallet.lineItems.filter(isUsdsLineItem), (item) => getCurrencyValue(item.budget)),
    )
    const totalForecast = sumBy(wallets, (wallet) =>
      sumBy(wallet.lineItems.filter(isUsdsLineItem), (item) => getCurrencyValue(item.forecast)),
    )
    const totalActual = sumBy(wallets, (wallet) =>
      sumBy(wallet.lineItems.filter(isUsdsLineItem), (item) => getCurrencyValue(item.actuals)),
    )
    const totalDifference = totalForecast - totalActual
    const totalPayment = sumBy(wallets, (wallet) =>
      sumBy(wallet.lineItems.filter(isUsdsLineItem), (item) => getCurrencyValue(item.payments)),
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
