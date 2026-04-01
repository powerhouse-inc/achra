import type { BudgetStatementsDetailsQuery } from '@/modules/__generated__/graphql/switchboard-generated'

/** Mock for getBudgetStatementForMonth / BudgetStatementsDetails GraphQL query. Month format: MAR2024 */
export const mockBudgetStatementsDetails: BudgetStatementsDetailsQuery = {
  __typename: 'Query',
  budgetStatements: [
    {
      __typename: 'BudgetStatement',
      id: 'bs-mock-001',
      month: 'MAR2024',
      expenseReport: {
        __typename: 'BudgetStatementExpenseReport',
        periodStart: '2024-03-01T00:00:00Z',
        periodEnd: '2024-03-31T23:59:59Z',
        wallets: [
          {
            __typename: 'ExpenseReportWallet',
            name: 'Main Wallet',
            address: '0xbe8e3e3717276148e4e706f6df491a72dd4bc3ee',
            billingStatementIds: [],
            totals: [
              {
                __typename: 'ExpenseReportGroupTotals',
                group: 'headcount',
                groupLabel: 'Headcount Expenses',
                totalBudget: 80000,
                totalForecast: 75000,
                totalActuals: 72000,
                totalPayments: 70000,
              },
              {
                __typename: 'ExpenseReportGroupTotals',
                group: 'non-headcount',
                groupLabel: 'Non-Headcount Expenses',
                totalBudget: 23000,
                totalForecast: 20000,
                totalActuals: 19300,
                totalPayments: 19300,
              },
            ],
            lineItems: [
              {
                __typename: 'ExpenseReportLineItem',
                id: 'li-1',
                label: 'Compensation & Benefits',
                groupId: 'hc-compensation',
                groupLabel: 'Compensation & Benefits',
                budget: 80000,
                forecast: 75000,
                actuals: 72000,
                payments: 70000,
                comments: null,
              },
              {
                __typename: 'ExpenseReportLineItem',
                id: 'li-2',
                label: 'Software & Subscriptions',
                groupId: 'nhc-software',
                groupLabel: 'Software & Subscriptions',
                budget: 8000,
                forecast: 8000,
                actuals: 7800,
                payments: 7800,
                comments: null,
              },
            ],
          },
        ],
        groups: [
          {
            __typename: 'ExpenseReportGroup',
            id: 'headcount',
            label: 'Headcount Expenses',
            parentId: '',
          },
          {
            __typename: 'ExpenseReportGroup',
            id: 'non-headcount',
            label: 'Non-Headcount Expenses',
            parentId: '',
          },
          {
            __typename: 'ExpenseReportGroup',
            id: 'hc-compensation',
            label: 'Compensation & Benefits',
            parentId: 'headcount',
          },
          {
            __typename: 'ExpenseReportGroup',
            id: 'nhc-software',
            label: 'Software & Subscriptions',
            parentId: 'non-headcount',
          },
        ],
      },
    },
  ],
}
