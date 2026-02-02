import { sortBy, sumBy } from 'lodash'
import type {
  BudgetStatementExpenseReport,
  ExpenseReportWallet,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { WalletTableCell } from '../components/wallet-table-cell'
import { API_MONTH_TO_FORMAT } from './date'
import { capitalizeSentence, formatAddressForOutput } from './strings'
import type { InnerTableColumn, InnerTableRow } from '../components/advanced-inner-table/types'
import type {
  BudgetStatement,
  BudgetStatementLineItem,
  BudgetStatementTransferRequest,
  BudgetStatementWallet,
} from '../types'
import type { DateTime } from 'luxon'

export const hasWalletGroups = (wallet: BudgetStatementWallet) =>
  wallet.budgetStatementLineItem.some((item) => item.group && item.actual)

export const hasGroupExpenses = (
  wallet: BudgetStatementWallet,
  group: string,
  month: string,
  isHeadcount = true,
) =>
  wallet.budgetStatementLineItem
    .filter(
      (item) =>
        !!item.headcountExpense === isHeadcount &&
        (item.group === group || (!item.group && !group)),
    )
    .some((x) => (x.actual || x.forecast) && x.month === month)

export const getGroupActual = (group: BudgetStatementLineItem[], month: string) =>
  sumBy(
    group.filter((item) => item.month === month),
    (item) => item.actual,
  )

export const getWalletMonthlyBudget = (wallet: ExpenseReportWallet) =>
  sumBy(wallet.lineItems, (item) => item.budget ?? 0)

export const getWalletActual = (wallet: ExpenseReportWallet) =>
  sumBy(wallet.lineItems, (item) => item.actuals.value ?? 0)

export const getGroupMonthlyBudget = (group: BudgetStatementLineItem[], month: string) =>
  sumBy(
    group.filter((item) => item.month === month),
    (item) => item.budgetCap ?? 0,
  )

export const getGroupForecast = (group: BudgetStatementLineItem[], month: string) =>
  sumBy(
    group.filter((item) => item.month === month),
    (item) => item.forecast ?? 0,
  )

export const getWalletForecast = (wallet: ExpenseReportWallet) =>
  sumBy(wallet.lineItems, (item) => item.forecast ?? 0)

export const getGroupDifference = (group: BudgetStatementLineItem[], month: string) =>
  getGroupForecast(group, month) - getGroupActual(group, month)

export const getWalletDifference = (wallet: ExpenseReportWallet) =>
  getWalletForecast(wallet) - getWalletActual(wallet)

export const getGroupPayment = (group: BudgetStatementLineItem[], month: string) =>
  sumBy(
    group.filter((item) => item.month === month),
    (item) => item.payment ?? 0,
  )

export const getWalletPayment = (wallet: BudgetStatementWallet, month: string) =>
  sumBy(
    wallet.budgetStatementLineItem.filter((item) => item.month === month),
    (i) => i.payment ?? 0,
  )

export const getCommentsFromCategory = (group: BudgetStatementLineItem[], month: string) =>
  group
    .filter((item) => item.month === month && item.comments !== undefined)
    .reduce((current, next) => `${current} ${next.comments !== '' ? next.comments : ''}`, '')

export const reduceLineItemsToTotals = (lineItems: BudgetStatementLineItem[]) =>
  lineItems.reduce(
    (prv, curr) => ({
      group: curr.group,
      budgetCap: (prv.budgetCap ?? 0) + (curr.budgetCap ?? 0),
      actual: prv.actual + curr.actual,
      forecast: (prv.forecast ?? 0) + (curr.forecast ?? 0),
      payment: (prv.payment ?? 0) + (curr.payment ?? 0),
      month: curr.month,
    }),
    {
      budgetCap: 0,
      actual: 0,
      forecast: 0,
      payment: 0,
    },
  )

// forecast

export const hasExpensesInRange = (
  lineItems: BudgetStatementLineItem[],
  currentMonth: DateTime,
  months: DateTime[],
  isHeadcount = true,
) => {
  const formattedCurrentMonth = currentMonth.toFormat(API_MONTH_TO_FORMAT)
  const formattedMonths = months.map((x) => x.toFormat(API_MONTH_TO_FORMAT))
  return lineItems.some((item) => {
    if (!!item.headcountExpense !== isHeadcount) return false
    if (item.month === formattedCurrentMonth) return !!item.budgetCap
    return formattedMonths.includes(item.month ?? '') && (item.budgetCap ?? item.forecast)
  })
}

export const getForecastForMonthOnWalletOnBudgetStatement = (
  budgetStatements: BudgetStatement[],
  walletAddress: string | undefined,
  currentMonth: DateTime,
  month: DateTime,
) => {
  const budgetStatement =
    budgetStatements.find((x) => x.month === currentMonth.toFormat(API_MONTH_TO_FORMAT)) ?? null

  if (!budgetStatement || !walletAddress) return 0

  const wallet =
    budgetStatement.budgetStatementWallet.find(
      (x) => x.address.toLowerCase() === walletAddress.toLowerCase(),
    ) ?? null

  if (!wallet) return 0

  return sumBy(
    wallet.budgetStatementLineItem.filter(
      (item) => item.month === month.toFormat(API_MONTH_TO_FORMAT),
    ),
    (i) => i.forecast ?? 0,
  )
}

export const getBudgetCapForMonthOnWalletOnBudgetStatement = (
  budgetStatements: BudgetStatement[],
  walletAddress: string | undefined,
  currentMonth: DateTime,
  month: DateTime,
) => {
  const budgetStatement =
    budgetStatements.find((x) => x.month === currentMonth.toFormat(API_MONTH_TO_FORMAT)) ?? null

  if (!budgetStatement || !walletAddress) return 0

  const wallet =
    budgetStatement.budgetStatementWallet.find(
      (x) => x.address.toLowerCase() === walletAddress.toLowerCase(),
    ) ?? null

  if (!wallet) return 0

  return sumBy(
    wallet.budgetStatementLineItem.filter(
      (item) => item.month === month.toFormat(API_MONTH_TO_FORMAT),
    ),
    (i) => i.budgetCap ?? 0,
  )
}

export const getForecastSumOfMonthsOnWallet = (
  budgetStatements: BudgetStatement[],
  walletAddress: string | undefined,
  currentMonth: DateTime,
  months: DateTime[],
) => {
  let result = 0

  if (!walletAddress) return result

  months.forEach((month) => {
    result += getForecastForMonthOnWalletOnBudgetStatement(
      budgetStatements,
      walletAddress,
      currentMonth,
      month,
    )
  })

  return result
}

export const getBudgetCapSumOfMonthsOnWallet = (
  budgetStatements: BudgetStatement[],
  walletAddress: string | undefined,
  currentMonth: DateTime,
  months: DateTime[],
) => {
  let result = 0

  if (!walletAddress) return result

  months.forEach((month) => {
    result += getBudgetCapForMonthOnWalletOnBudgetStatement(
      budgetStatements,
      walletAddress,
      currentMonth,
      month,
    )
  })

  return result
}

export const getForecastSumForMonth = (
  budgetStatements: BudgetStatement[],
  currentMonth: DateTime,
  month: DateTime,
) => {
  const budgetStatement =
    budgetStatements.find((x) => x.month === currentMonth.toFormat(API_MONTH_TO_FORMAT)) ?? null

  return sumBy(budgetStatement?.budgetStatementWallet, (wallet) =>
    sumBy(
      wallet.budgetStatementLineItem.filter(
        (item) => item.month === month.toFormat(API_MONTH_TO_FORMAT),
      ),
      (item) => item.forecast ?? 0,
    ),
  )
}

export const getForecastSumForMonths = (
  budgetStatements: BudgetStatement[],
  currentMonth: DateTime,
  months: DateTime[],
) => {
  let result = 0

  months.forEach((month) => {
    result += getForecastSumForMonth(budgetStatements, currentMonth, month)
  })

  return result
}

export const getBudgetCapForMonthOnBudgetStatement = (
  budgetStatements: BudgetStatement[],
  currentMonth: DateTime,
  month: DateTime,
) => {
  const budgetStatement =
    budgetStatements.find((x) => x.month === currentMonth.toFormat(API_MONTH_TO_FORMAT)) ?? null

  return sumBy(budgetStatement?.budgetStatementWallet, (wallet) =>
    sumBy(
      wallet.budgetStatementLineItem.filter(
        (item) => item.month === month.toFormat(API_MONTH_TO_FORMAT),
      ),
      (item) => item.budgetCap ?? 0,
    ),
  )
}

export const getTotalQuarterlyBudgetCapOnBudgetStatement = (
  budgetStatements: BudgetStatement[],
  months: DateTime[],
  wallets: BudgetStatementWallet[],
  currentMonth: DateTime,
) => {
  let result = 0

  wallets.forEach((wallet) => {
    result += getBudgetCapSumOfMonthsOnWallet(
      budgetStatements,
      wallet.address.toLowerCase(),
      currentMonth,
      months,
    )
  })

  return result
}

export const getLineItemsForWalletOnMonth = (
  budgetStatements: BudgetStatement[],
  currentMonth: DateTime,
  month: DateTime,
  walletAddress: string,
) => {
  const budgetStatement = budgetStatements.find(
    (bs) => bs.month === currentMonth.toFormat(API_MONTH_TO_FORMAT),
  )

  if (!budgetStatement) return []

  return (
    budgetStatement.budgetStatementWallet
      .find((wallet) => wallet.address.toLowerCase() === walletAddress.toLowerCase())
      ?.budgetStatementLineItem.filter(
        (item) => item.month === month.toFormat(API_MONTH_TO_FORMAT),
      ) ?? []
  )
}

export const getLineItemForecastSumForMonth = (items: BudgetStatementLineItem[], month: DateTime) =>
  sumBy(
    items.filter((item) => item.month === month.toFormat(API_MONTH_TO_FORMAT)),
    (item) => item.forecast ?? 0,
  )

export const getLineItemForecastSumForMonths = (
  items: BudgetStatementLineItem[],
  months: DateTime[],
) => {
  const formattedMonths = months.map((x) => x.toFormat(API_MONTH_TO_FORMAT))
  return sumBy(
    items.filter((item) => formattedMonths.includes(item.month ?? '')),
    (item) => item.forecast ?? 0,
  )
}

export const getBudgetCapForMonthOnLineItem = (items: BudgetStatementLineItem[], month: DateTime) =>
  sumBy(
    items.filter((item) => item.month === month.toFormat(API_MONTH_TO_FORMAT)),
    (item) => item.budgetCap ?? 0,
  )

export const getTotalQuarterlyBudgetCapOnLineItem = (
  items: BudgetStatementLineItem[],
  months: DateTime[],
) => {
  const formattedMonths = months.map((x) => x.toFormat(API_MONTH_TO_FORMAT))
  return sumBy(
    items.filter((item) => formattedMonths.includes(item.month ?? '')),
    (item) => item.budgetCap ?? 0,
  )
}

export const getExtraEmptyColumnsForHeaders = (breakdownColumns: InnerTableColumn[]) => [
  // column 0 would be the header column
  {
    column: breakdownColumns[1],
    value: '',
  },
  {
    column: breakdownColumns[2],
    value: '',
  },
  {
    column: breakdownColumns[3],
    value: '',
  },
  {
    column: breakdownColumns[4],
    value: '',
  },
  {
    column: breakdownColumns[5],
    value: '',
  },
  {
    column: breakdownColumns[6],
    value: '',
  },
]

export const getTransferRequestTargetBalanceColumn = (wallet: BudgetStatementWallet) => {
  const targetWithTimeSpan: Pick<
    BudgetStatementTransferRequest,
    'target' | 'walletBalanceTimeStamp'
  > = {} as BudgetStatementTransferRequest

  const lastIndex = wallet.budgetStatementTransferRequest.length - 1
  if (wallet.budgetStatementTransferRequest.length > 0) {
    targetWithTimeSpan.target = wallet.budgetStatementTransferRequest[lastIndex].target
    targetWithTimeSpan.walletBalanceTimeStamp =
      wallet.budgetStatementTransferRequest[lastIndex]?.walletBalanceTimeStamp
  }

  return targetWithTimeSpan
}

export const renderWallet = (wallet: BudgetStatementWallet) => (
  <WalletTableCell
    key={wallet.address}
    name={wallet.name}
    wallet={formatAddressForOutput(wallet.address)}
    address={wallet.address}
  />
)

// NEW FUNCTIONS

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

  // TODO: move to a function utility??
  const toValue = (amount: unknown) => {
    if (!amount) return 0
    const num = Number((amount as { value: string }).value)
    return isNaN(num) ? 0 : num
  }

  const mainTableItems: InnerTableRow[] = []

  // TODO: filter values by USDS only

  // add wallet rows
  wallets.forEach((wallet, walletIndex) => {
    const actuals = sumBy(wallet.lineItems, (item) => toValue(item.actuals))
    const forecast = sumBy(wallet.lineItems, (item) => toValue(item.forecast))
    const numberCellData = [
      sumBy(wallet.lineItems, (item) => toValue(item.budget)),
      forecast,
      actuals,
      forecast - actuals,
      sumBy(wallet.lineItems, (item) => toValue(item.payments)),
    ]

    if (numberCellData.some((n) => n !== 0)) {
      mainTableItems.push({
        // Hidden the header for wallet
        showHeader: mainTableItems[walletIndex]?.items[0].column.header === 'Wallet',
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
      sumBy(wallet.lineItems, (item) => toValue(item.budget)),
    )
    const totalForecast = sumBy(wallets, (wallet) =>
      sumBy(wallet.lineItems, (item) => toValue(item.forecast)),
    )
    const totalActual = sumBy(wallets, (wallet) =>
      sumBy(wallet.lineItems, (item) => toValue(item.actuals)),
    )
    const totalDifference = totalForecast - totalActual
    const totalPayment = sumBy(wallets, (wallet) =>
      sumBy(wallet.lineItems, (item) => toValue(item.payments)),
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
