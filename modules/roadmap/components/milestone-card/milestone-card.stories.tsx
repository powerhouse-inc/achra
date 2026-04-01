import { mockedMilestones } from '@/modules/roadmap/mocks'
import MilestoneCard from './milestone-card'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Roadmap/Components/MilestoneCard',
  component: MilestoneCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    milestone: {
      control: false,
      description: 'The milestone data object',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof MilestoneCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    milestone: mockedMilestones[0],
    className: 'max-w-76',
  },
}
