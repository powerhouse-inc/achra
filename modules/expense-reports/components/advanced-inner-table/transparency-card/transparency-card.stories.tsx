import { withNextjsExtras, withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { TransparencyCard } from './transparency-card'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Expense Reports/Components/TransparencyCard',
  component: TransparencyCard,
  decorators: [withPortalFontStyles, withNextjsExtras],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TransparencyCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    header: <div className="px-6 py-3 font-semibold">Compensation & Benefits</div>,
    headers: ['Budget', 'Forecast', 'Actuals', 'Payments'],
    items: [
      <span key="budget">80,000 DAI</span>,
      <span key="forecast">75,000 DAI</span>,
      <span key="actuals">72,000 DAI</span>,
      <span key="payments">70,000 DAI</span>,
    ],
    itemType: 'normal',
    subHeader: 'Q1 2024',
    showSubHeader: false,
    category: 'Headcount',
    cardSpacingSize: 'large',
  },
}

export const WithSubHeader: Story = {
  args: {
    ...Default.args,
    showSubHeader: true,
  },
}

export const TotalRow: Story = {
  args: {
    header: <div className="px-6 py-3 font-bold">Totals</div>,
    headers: ['Budget', 'Forecast', 'Actuals', 'Payments'],
    items: [
      <span key="budget" className="font-bold">
        103,000 DAI
      </span>,
      <span key="forecast" className="font-bold">
        95,000 DAI
      </span>,
      <span key="actuals" className="font-bold">
        91,300 DAI
      </span>,
      <span key="payments" className="font-bold">
        89,300 DAI
      </span>,
    ],
    itemType: 'total',
    subHeader: '',
    showSubHeader: false,
    category: 'Totals',
    cardSpacingSize: 'large',
  },
}

export const WithSeparators: Story = {
  args: {
    ...Default.args,
    separators: [false, false, true, false],
  },
}
