import type { BudgetStatement } from '../type'

export const mockBudgetStatements: BudgetStatement[] = [
  {
    __typename: 'BudgetStatement',
    id: 'e4934aab-197c-4db4-8c2f-9aacfb28a0ee',
    month: 'DEC2024',
    lastModifiedAtUtcIso: '2024-12-05T14:30:00.000Z',
    status: 'FINAL',
    owner: {
      __typename: 'BudgetStatementOwner',
      name: 'BAI',
      code: 'bai',
      id: 'owner-bai',
      logo: 'https://i.postimg.cc/Dy4QT8Y9/baiicon.png',
    },
    expenseReport: {
      __typename: 'BudgetStatementExpenseReport',
      periodStart: '2024-12-01T00:00:00.000Z',
      periodEnd: '2024-12-31T23:59:59.999Z',
      wallets: [
        {
          __typename: 'ExpenseReportWallet',
          name: 'Operations Wallet',
          address: '0x1234567890abcdef1234567890abcdef12345678',
          totals: [
            {
              __typename: 'ExpenseReportGroupTotals',
              groupLabel: 'Compensation & Benefits',
              totalActuals: { unit: 'USDS', value: '1200' },
              totalForecast: { unit: 'USDS', value: '1500' },
              totalPayments: { unit: 'USDS', value: '1100' },
            },
          ],
        },
      ],
    },
  },
  {
    __typename: 'BudgetStatement',
    id: '79d54930-e6dd-4cd5-adf7-17a42fc774eb',
    month: 'JAN2025',
    lastModifiedAtUtcIso: '2025-01-10T12:00:00.000Z',
    status: 'DRAFT',
    owner: {
      __typename: 'BudgetStatementOwner',
      name: 'Teep',
      code: 'TEEP',
      id: 'owner-teep',
      logo: 'https://pbs.twimg.com/profile_images/1543149307435618304/5K_7BdwO_400x400.jpg',
    },
    expenseReport: {
      __typename: 'BudgetStatementExpenseReport',
      periodStart: '2025-01-01T00:00:00.000Z',
      periodEnd: '2025-01-31T23:59:59.999Z',
      wallets: [
        {
          __typename: 'ExpenseReportWallet',
          name: 'Main Wallet',
          address: '0xabcdef1234567890abcdef1234567890abcdef12',
          totals: [
            {
              __typename: 'ExpenseReportGroupTotals',
              groupLabel: 'Development',
              totalActuals: { unit: 'USDS', value: '500' },
              totalForecast: { unit: 'USDS', value: '600' },
              totalPayments: { unit: 'USDS', value: '450' },
            },
          ],
        },
      ],
    },
  },
  {
    __typename: 'BudgetStatement',
    id: '112c80c9-ccfe-4902-bbd6-a991c83d6119',
    month: 'NOV2024',
    status: 'FINAL',
    lastModifiedAtUtcIso: '2024-11-15T10:30:00.000Z',
    owner: {
      __typename: 'BudgetStatementOwner',
      name: 'Liberuum',
      code: 'liberuum',
      id: 'owner-liberuum',
      logo: 'https://pbs.twimg.com/profile_images/1578398330278871041/YfZgMhQW_400x400.jpg',
    },
    expenseReport: {
      __typename: 'BudgetStatementExpenseReport',
      periodStart: '2024-11-01T00:00:00.000Z',
      periodEnd: '2024-11-30T23:59:59.999Z',
      wallets: [
        {
          __typename: 'ExpenseReportWallet',
          name: 'Primary Wallet',
          address: '0x9876543210fedcba9876543210fedcba98765432',
          totals: [
            {
              __typename: 'ExpenseReportGroupTotals',
              groupLabel: 'Operations',
              totalActuals: { unit: 'USDS', value: '800' },
              totalForecast: { unit: 'USDS', value: '900' },
              totalPayments: { unit: 'USDS', value: '750' },
            },
          ],
        },
      ],
    },
  },
  {
    __typename: 'BudgetStatement',
    lastModifiedAtUtcIso: '2024-09-20T09:15:00.000Z',
    status: 'FINAL',
    id: '4a7596a6-9ff1-4ffb-b205-6a8be375fd99',
    month: 'SEP2024',
    owner: {
      __typename: 'BudgetStatementOwner',
      name: 'apeiron',
      code: 'APEIRON',
      id: 'owner-apeiron',
      logo: 'https://pbs.twimg.com/profile_images/1859264281323167745/ku3nlrHH_400x400.jpg',
    },
    expenseReport: {
      __typename: 'BudgetStatementExpenseReport',
      periodStart: '2024-09-01T00:00:00.000Z',
      periodEnd: '2024-09-30T23:59:59.999Z',
      wallets: [
        {
          __typename: 'ExpenseReportWallet',
          name: 'DevOps Wallet',
          address: '0xfedcba9876543210fedcba9876543210fedcba98',
          totals: [
            {
              __typename: 'ExpenseReportGroupTotals',
              groupLabel: 'Infrastructure',
              totalActuals: { unit: 'USDS', value: '2000' },
              totalForecast: { unit: 'USDS', value: '2200' },
              totalPayments: { unit: 'USDS', value: '1800' },
            },
          ],
        },
      ],
    },
  },
  {
    __typename: 'BudgetStatement',
    id: '0c12e19a-bd55-41fc-890a-3ae0e935ac45',
    lastModifiedAtUtcIso: '2024-08-15T11:45:00.000Z',
    status: 'DRAFT',
    month: 'AUG2024',
    owner: {
      __typename: 'BudgetStatementOwner',
      name: 'Sky Labs',
      code: 'sky-labs',
      id: 'owner-skylabs',
      logo: 'https://i.postimg.cc/Dy4QT8Y9/baiicon.png',
    },
    expenseReport: {
      __typename: 'BudgetStatementExpenseReport',
      periodStart: '2024-08-01T00:00:00.000Z',
      periodEnd: '2024-08-31T23:59:59.999Z',
      wallets: [
        {
          __typename: 'ExpenseReportWallet',
          name: 'Protocol Wallet',
          address: '0x1111222233334444555566667777888899990000',
          totals: [
            {
              __typename: 'ExpenseReportGroupTotals',
              groupLabel: 'Protocol Development',
              totalActuals: { unit: 'USDS', value: '15000' },
              totalForecast: { unit: 'USDS', value: '16000' },
              totalPayments: { unit: 'USDS', value: '14000' },
            },
          ],
        },
      ],
    },
  },
  {
    __typename: 'BudgetStatement',
    id: 'fb3ab2c7-48aa-4acb-a5c1-2b847ef98aaf',
    month: 'JUN2024',
    status: 'DRAFT',
    lastModifiedAtUtcIso: '2024-06-25T16:20:00.000Z',
    owner: {
      __typename: 'BudgetStatementOwner',
      name: 'Data Scout',
      code: 'data-scout',
      id: 'owner-datascout',
      logo: 'https://i.postimg.cc/Dy4QT8Y9/baiicon.png',
    },
    expenseReport: {
      __typename: 'BudgetStatementExpenseReport',
      periodStart: '2024-06-01T00:00:00.000Z',
      periodEnd: '2024-06-30T23:59:59.999Z',
      wallets: [
        {
          __typename: 'ExpenseReportWallet',
          name: 'Analytics Wallet',
          address: '0xaaaa111122223333444455556666777788889999',
          totals: [
            {
              __typename: 'ExpenseReportGroupTotals',
              groupLabel: 'Analytics',
              totalActuals: { unit: 'USDS', value: '4500' },
              totalForecast: { unit: 'USDS', value: '5000' },
              totalPayments: { unit: 'USDS', value: '4000' },
            },
          ],
        },
      ],
    },
  },
]
