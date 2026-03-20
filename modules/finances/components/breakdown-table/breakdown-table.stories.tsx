import { withFinancesYearProvider } from '@/modules/finances/lib/decorators'
import { withNuqsAdapter, withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { BreakdownTable } from './breakdown-table'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Finances/Components/BreakdownTable',
  component: BreakdownTable,
  decorators: [withFinancesYearProvider, withNuqsAdapter, withPortalFontStyles],
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/finances',
      },
    },
  },
} satisfies Meta<typeof BreakdownTable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
