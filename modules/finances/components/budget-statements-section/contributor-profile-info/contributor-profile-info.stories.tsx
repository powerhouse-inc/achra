import { ExpenseReport_ExpenseReportStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import { ContributorProfileInfo } from './contributor-profile-info'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Modules/Finances/ContributorProfileInfo',
  component: ContributorProfileInfo,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ContributorProfileInfo>

export default meta
type Story = StoryObj<typeof meta>

const SAMPLE_LOGO_URL =
  'https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/POWERHOUSE/POWERHOUSE_logo.png'

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
