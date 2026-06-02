import type { Sow_Deliverable } from '@/modules/__generated__/graphql/switchboard-generated'
import { mockedDeliverables, mockedMilestones } from '@/modules/roadmap/mocks'
import { RoadmapSwiper } from './roadmap-swiper'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Roadmap/Components/RoadmapSwiper',
  component: RoadmapSwiper,
  parameters: {
    layout: 'centered',
    viewport: {
      defaultViewport: 'responsive',
    },
  },
  argTypes: {
    milestones: {
      control: false,
      description: 'Array of milestones to display in the swiper',
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
      description: 'Array of deliverables for milestone cards',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '1312px', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RoadmapSwiper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    milestones: mockedMilestones,
    networkSlug: 'powerhouse',
    roadmapSlug: 'roadmap-1',
    deliverables: mockedDeliverables as unknown as Sow_Deliverable[],
  },
}
