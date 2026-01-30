import { NuqsAdapter } from 'nuqs/adapters/next/app'
import BuilderFilters from './builders-filters'
import { BuildersFiltersProvider } from './builders-filters-context'
import type { Meta, StoryObj } from '@storybook/nextjs'

const withNuqsAdapter = (Story: React.ComponentType) => (
  <NuqsAdapter>
    <BuildersFiltersProvider>
      <Story />
    </BuildersFiltersProvider>
  </NuqsAdapter>
)

const meta = {
  title: 'Modules/Builders/Components/BuilderFilters',
  component: BuilderFilters,
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
} satisfies Meta<typeof BuilderFilters>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
