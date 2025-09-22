import { mockedMilestones } from '@/modules/roadmap/mocks'
import RoadmapSwiper from './roadmap-swiper'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Modules/Roadmap/Components/RoadmapSwiper',
  component: RoadmapSwiper,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RoadmapSwiper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    milestones: mockedMilestones,
  },
}
