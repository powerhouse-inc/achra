import type { Sow_Deliverable } from '@/modules/__generated__/graphql/switchboard-generated'
import { mockedDeliverables, mockedMilestones } from '@/modules/roadmap/mocks'
import RoadmapSwiper from './roadmap-swiper'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Modules/Roadmap/Components/RoadmapSwiper',
  component: RoadmapSwiper,
  parameters: {
    layout: 'centered',
    viewport: {
      defaultViewport: 'responsive',
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
