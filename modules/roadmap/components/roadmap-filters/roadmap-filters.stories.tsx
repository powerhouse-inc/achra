import { NuqsAdapter } from 'nuqs/adapters/next/app'
import RoadmapFilters from './roadmap-filters'
import type { Meta, StoryObj } from '@storybook/nextjs'

const withNuqsAdapter = (Story: React.ComponentType) => (
  <NuqsAdapter>
    <Story />
  </NuqsAdapter>
)

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
  argTypes: {},
} satisfies Meta<typeof RoadmapFilters>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
