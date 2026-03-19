import {
  withNextjsExtras,
  withNuqsAdapter,
  withPortalFontStyles,
} from '@/modules/shared/lib/decorators'
import { ExpenseReportsSection } from './expense-reports-section'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Expense Reports/Components/ExpenseReportsSection',
  component: ExpenseReportsSection,
  decorators: [withNuqsAdapter, withPortalFontStyles, withNextjsExtras],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/network/powerhouse/builders/powerhouse-dashboard/budget-statements',
      },
    },
  },
} satisfies Meta<typeof ExpenseReportsSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    teamId: 'team-mock-id',
    month: new Date('2024-03-01'),
    builderLabel: 'Powerhouse',
  },
}
