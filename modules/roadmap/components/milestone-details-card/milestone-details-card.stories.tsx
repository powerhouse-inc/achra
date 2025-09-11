import {
  mockedMilestone1,
  mockedDeliverables1,
  mockedContributors1,
  mockedProjects1,
} from '@/modules/roadmap/mocks'
import MilestoneDetailsCard from './milestone-details-card'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Modules/Roadmap/Components/MilestoneDetailsCard',
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
    deliverables: {
      description: 'Array of deliverables associated with this milestone',
      control: false,
    },
    contributors: {
      description: 'Array of contributors/agents',
      control: false,
    },
    projects: {
      description: 'Array of projects',
      control: false,
    },
  },
} satisfies Meta<typeof MilestoneDetailsCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    milestone: mockedMilestone1,
    deliverables: mockedDeliverables1,
    contributors: mockedContributors1,
    projects: mockedProjects1,
  },
}
