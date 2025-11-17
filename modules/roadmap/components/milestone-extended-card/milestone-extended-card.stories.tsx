import { mockedMilestones } from '@/modules/roadmap/mocks'
import MilestoneExtendedCard from './milestone-extended-card'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Modules/Roadmap/Components/MilestoneExtendedCard',
  component: MilestoneExtendedCard,
  parameters: {
    layout: 'centered',
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
  },
}
