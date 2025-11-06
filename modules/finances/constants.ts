interface MetricItem {
  title: string
  description: string
}

export const metrics: MetricItem[] = [
  {
    title: 'Budget',
    description: 'The maximum amount allocated for a specific budget category or project.',
  },
  {
    title: 'Forecast',
    description:
      'The amount forecasted to be spent in a period, as self-reported by the corresponding team.',
  },
  {
    title: 'Actuals',
    description:
      'The actual amount spent or received in a period, as self-reported by the corresponding team.',
  },
  {
    title: 'Payments On-Chain',
    description: 'Transactions (expenses) made directly on the blockchain.',
  },
  {
    title: 'Payments Off-Chain Included',
    description:
      'Expense transactions based on the on-chain data combined with self-reported off-chain account balances.',
  },
]
