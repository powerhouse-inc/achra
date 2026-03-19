import { withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { TransparencyCard } from './transparency-card'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/ExpenseReports/Components/AdvancedInnerTable/TransparencyCard',
  component: TransparencyCard,
  decorators: [withPortalFontStyles],
  argTypes: {
    header: {
      control: false,
      description: 'Card header content',
    },
    headers: {
      control: false,
      description: 'Column headers for the card',
    },
    items: {
      control: false,
      description: 'Cell values for each column',
    },
    itemType: {
      control: 'select',
      options: ['normal', 'total', 'section', 'groupTitle', 'subTotal', 'category'],
      description: 'Row type affecting styling',
    },
    subHeader: {
      control: 'text',
      description: 'Sub-header text when showSubHeader is true',
    },
    showSubHeader: {
      control: 'boolean',
      description: 'Whether to show the sub-header section',
    },
    category: {
      control: 'text',
      description: 'Category label for sub-header',
    },
    cardSpacingSize: {
      control: 'select',
      options: ['small', 'large'],
      description: 'Spacing size for card content',
    },
    separators: {
      control: false,
      description: 'Which columns show separator lines below',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TransparencyCard>

export default meta
type Story = StoryObj<typeof meta>

const defaultHeader = <div className="px-6 py-3 font-semibold">Compensation & Benefits</div>
const defaultHeaders = ['Budget', 'Forecast', 'Actuals', 'Payments']
const defaultItems = [
  <span key="budget">80,000 DAI</span>,
  <span key="forecast">75,000 DAI</span>,
  <span key="actuals">72,000 DAI</span>,
  <span key="payments">70,000 DAI</span>,
]

const totalHeader = <div className="px-6 py-3 font-bold">Totals</div>
const totalItems = [
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
]

export const Default: Story = {
  args: {
    header: defaultHeader,
    headers: defaultHeaders,
    items: defaultItems,
    itemType: 'normal',
    subHeader: 'Q1 2024',
    showSubHeader: false,
    category: 'Headcount',
    cardSpacingSize: 'large',
  },
}

export const TotalRow: Story = {
  args: {
    header: totalHeader,
    headers: defaultHeaders,
    items: totalItems,
    itemType: 'total',
    subHeader: '',
    showSubHeader: false,
    category: 'Totals',
    cardSpacingSize: 'large',
  },
}
