import { milestones } from '../overview-section/mocked-data'
import MilestoneCard from './milestone-card'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Modules/Roadmap/Components/MilestoneCard',
  component: MilestoneCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof MilestoneCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    milestone: milestones[0],
    className: 'max-w-76',
  },
}
