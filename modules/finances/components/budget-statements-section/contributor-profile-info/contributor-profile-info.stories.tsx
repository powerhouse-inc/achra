import { BuilderStatus } from '@/modules/__generated__/graphql/switchboard-generated'
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

export const Default: Story = {
  render: (args) => <ContributorProfileInfo {...args} />,
  args: {
    name: 'Sustainable Ecosystem Scaling',
    code: 'SES',
    isCoreUnit: false,
    icon: true,
    status: BuilderStatus.Active,
  },
}

export const CoreUnit: Story = {
  render: (args) => <ContributorProfileInfo {...args} />,
  args: {
    name: 'Sustainable Ecosystem Scaling',
    code: 'SES',
    isCoreUnit: true,
    icon: true,
    status: BuilderStatus.Active,
  },
}
