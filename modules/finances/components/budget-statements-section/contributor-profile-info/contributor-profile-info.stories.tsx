import { ExpenseReport_ExpenseReportStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import { SAMPLE_LOGO_URL } from '@/modules/finances/mocks'
import { ContributorProfileInfo } from './contributor-profile-info'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Finances/Components/BudgetStatementsSection/ContributorProfileInfo',
  component: ContributorProfileInfo,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'Contributor or builder name',
    },
    code: {
      control: 'text',
      description: 'Contributor code',
    },
    isCoreUnit: {
      control: 'boolean',
      description: 'Whether this is a core unit',
    },
    logoUrl: {
      control: 'text',
      description: 'URL of the contributor logo',
    },
    status: {
      control: 'select',
      options: Object.values(ExpenseReport_ExpenseReportStatus),
      description: 'Expense report status',
    },
  },
} satisfies Meta<typeof ContributorProfileInfo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <ContributorProfileInfo {...args} />,
  args: {
    name: 'Sustainable Ecosystem Scaling',
    code: 'SES',
    isCoreUnit: false,
    logoUrl: SAMPLE_LOGO_URL,
    status: ExpenseReport_ExpenseReportStatus.Draft,
  },
}

export const CoreUnit: Story = {
  render: (args) => <ContributorProfileInfo {...args} />,
  args: {
    name: 'Sustainable Ecosystem Scaling',
    code: 'SES',
    isCoreUnit: true,
    logoUrl: SAMPLE_LOGO_URL,
    status: ExpenseReport_ExpenseReportStatus.Review,
  },
}

export const MissingLogo: Story = {
  render: (args) => <ContributorProfileInfo {...args} />,
  args: {
    name: 'Builder Without Logo',
    code: 'BWL',
    isCoreUnit: false,
    logoUrl: undefined,
    status: ExpenseReport_ExpenseReportStatus.Draft,
  },
}
