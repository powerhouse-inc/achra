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
  },
}

export const CoreUnit: Story = {
  render: (args) => <ContributorProfileInfo {...args} />,
  args: {
    name: 'Sustainable Ecosystem Scaling',
    code: 'SES',
    isCoreUnit: true,
    icon: true,
  },
}
