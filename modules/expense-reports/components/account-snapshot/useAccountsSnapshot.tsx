import { differenceInMonths, format, parse } from 'date-fns'
import { useMemo, useState } from 'react'
import { getReserveAccounts, transactionSort } from './utils/reserveUtils'
import type { ExpenseComparisonLineItem, Snapshots, Token } from './types'

// TODO: remove this hook in favor of the SSR version once the integration is complete
const useAccountsSnapshot = (snapshot: Snapshots) => {
  // TODO: the `setSelectedTo` is not used yet, but it will be used to filter the data
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedToken, setSelectedToken] = useState<Token>('DAI')

  const [includeOffChain, setIncludeOffChain] = useState<boolean>(false)
  const toggleIncludeOffChain = () => {
    setIncludeOffChain(!includeOffChain)
  }

  const startDate = snapshot.start ?? undefined
  const endDate = snapshot.end ?? undefined

  // root account
  const rootAccount = useMemo(
    () =>
      snapshot.snapshotAccount.find(
        (account) => account.groupAccountId === null && account.upstreamAccountId === null,
      ),
    [snapshot.snapshotAccount],
  )

  // main account (MakerDAO Funding Overview section)
  const mainAccount = useMemo(
    () =>
      snapshot.snapshotAccount.find(
        (account) =>
          account.groupAccountId === rootAccount?.id && account.upstreamAccountId === null,
      ),
    [rootAccount?.id, snapshot.snapshotAccount],
  )
  const mainBalance = useMemo(
    () => mainAccount?.snapshotAccountBalance.find((balance) => balance.token === selectedToken),
    [mainAccount?.snapshotAccountBalance, selectedToken],
  )

  // transaction history (MakerDAO Funding Overview section)
  const transactionHistory = useMemo(
    () =>
      mainAccount?.snapshotAccountTransaction
        .filter((transaction) => transaction.token === selectedToken)
        .sort(transactionSort) ?? [],
    [mainAccount?.snapshotAccountTransaction, selectedToken],
  )

  // Total Core Unit Reserves section
  const cuReservesAccount = useMemo(
    () =>
      snapshot.snapshotAccount.find(
        (account) =>
          account.groupAccountId === rootAccount?.id && account.upstreamAccountId !== null,
      ),
    [rootAccount?.id, snapshot.snapshotAccount],
  )
  const cuReservesBalances = useMemo(
    () =>
      cuReservesAccount?.snapshotAccountBalance.filter(
        (balance) => balance.token === selectedToken,
      ),
    [cuReservesAccount?.snapshotAccountBalance, selectedToken],
  )

  // balance with or without the off-chain data
  const cuReservesBalance = useMemo(
    () =>
      (cuReservesBalances?.length ?? 0) > 1
        ? cuReservesBalances?.find((account) => account.includesOffChain === includeOffChain)
        : cuReservesBalances?.[0],
    [cuReservesBalances, includeOffChain],
  )

  const onChainData = useMemo(
    () =>
      getReserveAccounts(snapshot, false, cuReservesAccount?.id, mainAccount?.id, selectedToken),
    [cuReservesAccount?.id, mainAccount?.id, selectedToken, snapshot],
  )

  const offChainData = useMemo(
    () => getReserveAccounts(snapshot, true, cuReservesAccount?.id, mainAccount?.id, selectedToken),
    [cuReservesAccount?.id, mainAccount?.id, selectedToken, snapshot],
  )

  const hasOffChainData = offChainData.length > 0

  const hasActualsComparison = snapshot.actualsComparison.length > 0
  const actualsComparison = useMemo(
    () =>
      snapshot.actualsComparison
        .filter((comparison) => comparison.currency === selectedToken)
        .sort(
          (a, b) =>
            differenceInMonths(
              parse(a.month, 'yyyy/MM', new Date()),
              parse(b.month, 'yyyy/MM', new Date()),
            ) * -1,
        ),
    [selectedToken, snapshot.actualsComparison],
  )

  // calculate the expense comparison line items
  const expenseComparisonLineItems: ExpenseComparisonLineItem[] = useMemo(() => {
    const lineItems = actualsComparison.map((comparison) => {
      return {
        isTotals: false,
        month: format(parse(comparison.month, 'yyyy/MM', new Date()), 'MMM-yyyy'),
        reportedActuals: comparison.reportedActuals ?? 0,
        onChainOnly: comparison.netExpenses.onChainOnly.amount ?? 0,
        onChainDifference: (comparison.netExpenses.onChainOnly.difference ?? 0) * 100,
        offChainIncluded: comparison.netExpenses.offChainIncluded.amount ?? 0,
        offChainDifference: (comparison.netExpenses.offChainIncluded.difference ?? 0) * 100,
      }
    })

    if (lineItems.length <= 1) {
      return lineItems
    }

    const totalReportedActuals = lineItems.reduce((acc, item) => acc + item.reportedActuals, 0)
    const totalOnChainOnly = lineItems.reduce((acc, item) => acc + item.onChainOnly, 0)
    const totalOffChainIncluded = lineItems.reduce((acc, item) => acc + item.offChainIncluded, 0)

    const totalOnChainDifference =
      totalReportedActuals === 0 || totalOnChainOnly === 0
        ? 0
        : (Math.abs(totalOnChainOnly) / Math.abs(totalReportedActuals) - 1) * 100

    const totalOffChainDifference =
      totalReportedActuals === 0 || totalOffChainIncluded === 0
        ? 0
        : (Math.abs(totalOffChainIncluded) / Math.abs(totalReportedActuals) - 1) * 100

    return [
      ...lineItems,
      {
        isTotals: true,
        reportedActuals: totalReportedActuals,
        onChainOnly: totalOnChainOnly,
        onChainDifference: totalOnChainDifference,
        offChainIncluded: totalOffChainIncluded,
        offChainDifference: totalOffChainDifference,
      },
    ]
  }, [actualsComparison])

  const isCoreUnit = snapshot.ownerType === 'CoreUnit'
  return {
    includeOffChain,
    toggleIncludeOffChain,
    startDate,
    endDate,
    mainBalance,
    transactionHistory,
    cuReservesBalance,
    onChainData,
    offChainData,
    hasOffChainData,
    // expenses comparison
    hasActualsComparison,
    expenseComparisonLineItems,
    isCoreUnit,
  }
}

export default useAccountsSnapshot
