import {
  mockedContributors,
  mockedDeliverables,
  mockedProjects,
  mockedRoadmaps,
} from '@/modules/roadmap/mocks'
import { DetailsSection, DetailsSectionSkeleton } from './details-section'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Roadmap/Components/DetailsSection',
  component: DetailsSection,
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/network/powerhouse/roadmap',
      },
    },
  },
  argTypes: {
    roadmap: {
      control: false,
      description: 'The roadmap containing milestones to display',
    },
    deliverables: {
      control: false,
      description: 'Array of deliverables associated with milestones',
    },
    contributors: {
      control: false,
      description: 'Array of contributors/agents',
    },
    projects: {
      control: false,
      description: 'Array of projects',
    },
  },
} satisfies Meta<typeof DetailsSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    roadmap: mockedRoadmaps[0],
    deliverables: mockedDeliverables,
    contributors: mockedContributors,
    projects: mockedProjects,
  },
}

export const Skeleton: Story = {
  args: {
    roadmap: undefined,
    deliverables: [],
    contributors: [],
    projects: [],
  },
  render: () => <DetailsSectionSkeleton />,
}
