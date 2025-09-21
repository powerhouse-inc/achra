import { NuqsAdapter } from 'nuqs/adapters/next/app'
import WorkstreamFilters from './workstream-filters'
import type { Meta, StoryObj } from '@storybook/nextjs'

const withNuqsAdapter = (Story: React.ComponentType) => (
  <NuqsAdapter>
    <Story />
  </NuqsAdapter>
)

const meta = {
  title: 'Modules/Workstream/Components/WorkstreamFilters',
  component: WorkstreamFilters,
  decorators: [withNuqsAdapter],
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/workstreams',
        query: {
          search: '',
          status: 'OPEN_FOR_PROPOSALS',
          network: 'all',
        },
      },
    },
  },
  argTypes: {},
} satisfies Meta<typeof WorkstreamFilters>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
