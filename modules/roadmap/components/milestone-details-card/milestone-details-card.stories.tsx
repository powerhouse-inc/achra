import {
  mockedContributors1,
  mockedDeliverables1,
  mockedMilestone1,
  mockedProjects1,
} from '@/modules/roadmap/mocks'
import MilestoneDetailsCard from './milestone-details-card'
import type {
  RoadmapDetails_Contributor,
  RoadmapDetails_Deliverable,
  RoadmapDetails_Milestone,
  RoadmapDetails_Project,
} from '../../types'
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
    milestone: mockedMilestone1 as RoadmapDetails_Milestone,
    deliverables: mockedDeliverables1 as unknown as RoadmapDetails_Deliverable[],
    contributors: mockedContributors1 as unknown as RoadmapDetails_Contributor[],
    projects: mockedProjects1 as unknown as RoadmapDetails_Project[],
  },
}
