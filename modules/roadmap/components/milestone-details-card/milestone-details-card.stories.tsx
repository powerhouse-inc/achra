import { mockedMilestone1 } from '../details-section/mocked-data'
import MilestoneDetailsCard from './milestone-details-card'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Roadmap/Components/MilestoneDetailsCard',
  component: MilestoneDetailsCard,
  parameters: {
    nextjs: {
      appDirectory: true,
      router: {
        pathname: '/network/test/roadmap',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    milestone: {
      description: 'The milestone data object containing all milestone information',
      control: false,
    },
  },
} satisfies Meta<typeof MilestoneDetailsCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    milestone: mockedMilestone1,
  },
}
