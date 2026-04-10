import type { Sow_Deliverable } from '@/modules/__generated__/graphql/switchboard-generated'
import { mockedDeliverables, mockedMilestones } from '@/modules/roadmap/mocks'
import { MilestoneExtendedCard } from './milestone-extended-card'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Roadmap/Components/MilestoneExtendedCard',
  component: MilestoneExtendedCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    milestone: {
      control: false,
      description: 'The milestone data object',
    },
    networkSlug: {
      control: 'text',
      description: 'Network slug for navigation links',
    },
    roadmapSlug: {
      control: 'text',
      description: 'Roadmap slug for navigation links',
    },
    deliverables: {
      control: false,
      description: 'Array of deliverables for key results',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof MilestoneExtendedCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    milestone: mockedMilestones[0],
    networkSlug: 'powerhouse',
    roadmapSlug: 'roadmap-1',
    className: 'max-w-79',
    deliverables: mockedDeliverables as unknown as Sow_Deliverable[],
  },
}
