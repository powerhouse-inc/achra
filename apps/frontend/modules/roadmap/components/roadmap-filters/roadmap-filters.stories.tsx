import { withNuqsAdapter } from '@/modules/shared/lib/decorators'
import { RoadmapFilters } from './roadmap-filters'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Roadmap/Components/RoadmapFilters',
  component: RoadmapFilters,
  decorators: [withNuqsAdapter],
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/roadmap',
        query: {
          search: '',
          statuses: 'RFP_DRAFT',
        },
      },
    },
  },
} satisfies Meta<typeof RoadmapFilters>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
