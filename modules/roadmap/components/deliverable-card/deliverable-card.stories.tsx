import { mockedContributors, mockedDeliverables, mockedProjects } from '@/modules/roadmap/mocks'
import DeliverableCard from './deliverable-card'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Roadmap/Components/DeliverableCard',
  component: DeliverableCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    deliverable: {
      control: false,
      description: 'The deliverable data object',
    },
    contributors: {
      control: false,
      description: 'Array of contributors/agents',
    },
    projects: {
      control: false,
      description: 'Array of projects',
    },
    viewMode: {
      control: 'select',
      options: ['compacted', 'detailed'],
      description: 'Display mode: compacted or detailed layout',
    },
    maxKeyResultsOnRow: {
      control: 'number',
      description: 'Maximum key results to show per row',
    },
    isProjectCard: {
      control: 'boolean',
      description: 'Whether to render as a project card variant',
    },
  },
} satisfies Meta<typeof DeliverableCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    deliverable: mockedDeliverables[0],
    contributors: mockedContributors,
    projects: mockedProjects,
    viewMode: 'compacted',
    maxKeyResultsOnRow: 3,
  },
}

export const Detailed: Story = {
  args: {
    deliverable: mockedDeliverables[0],
    contributors: mockedContributors,
    projects: mockedProjects,
    viewMode: 'detailed',
    maxKeyResultsOnRow: 3,
  },
}

export const InProgress: Story = {
  args: {
    deliverable: mockedDeliverables[3],
    contributors: mockedContributors,
    projects: mockedProjects,
    viewMode: 'compacted',
    maxKeyResultsOnRow: 3,
  },
}

export const Todo: Story = {
  args: {
    deliverable: mockedDeliverables[4],
    contributors: mockedContributors,
    projects: mockedProjects,
    viewMode: 'compacted',
    maxKeyResultsOnRow: 3,
  },
}

export const ProjectCard: Story = {
  args: {
    deliverable: mockedDeliverables[0],
    contributors: mockedContributors,
    projects: mockedProjects,
    viewMode: 'compacted',
    maxKeyResultsOnRow: 3,
    isProjectCard: true,
  },
}
