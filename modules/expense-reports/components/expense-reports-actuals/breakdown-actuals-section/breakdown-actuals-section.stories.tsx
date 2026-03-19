import { makeBudgetRow } from '@/modules/expense-reports/mocks'
import {
  withNextjsExtras,
  withNuqsAdapter,
  withPortalFontStyles,
} from '@/modules/shared/lib/decorators'
import { BreakdownActualsSection } from './breakdown-actuals-section'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Expense Reports/Components/BreakdownActualsSection',
  component: BreakdownActualsSection,
  decorators: [withNuqsAdapter, withPortalFontStyles, withNextjsExtras],
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/network/powerhouse/builders/powerhouse/budget-statements',
      },
    },
  },
} satisfies Meta<typeof BreakdownActualsSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    currentMonth: new Date('2025-08-01'),
    hasMainTableItems: true,
    breakdownTabs: ['Main Wallet', 'Reserve Wallet'],
    breakdownItemsByWallet: [
      [
        makeBudgetRow('Compensation & Benefits', 80000, 75000, 72000, 70000),
        makeBudgetRow('Software & Subscriptions', 8000, 8000, 7800, 7800),
        makeBudgetRow('Totals', 88000, 83000, 79800, 77800, 'total'),
      ],
      [
        makeBudgetRow('Travel & Entertainment', 15000, 12000, 11500, 11500),
        makeBudgetRow('Totals', 15000, 12000, 11500, 11500, 'total'),
      ],
    ],
    builderLabel: 'Powerhouse',
  },
}

export const NoMainTableItems: Story = {
  args: {
    currentMonth: new Date('2025-08-01'),
    hasMainTableItems: false,
    breakdownTabs: [],
    breakdownItemsByWallet: [],
    builderLabel: 'Powerhouse',
  },
}
