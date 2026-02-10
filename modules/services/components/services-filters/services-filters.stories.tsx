import { NuqsAdapter } from 'nuqs/adapters/react'
import ServicesFilters from './services-filters'
import { ServicesFiltersProvider } from './services-filters-context'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Modules/Services/Components/ServicesFilters',
  component: ServicesFilters,
  decorators: [
    (Story) => (
      <NuqsAdapter>
        <ServicesFiltersProvider>
          <Story />
        </ServicesFiltersProvider>
      </NuqsAdapter>
    ),
  ],
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/services',
      },
    },
  },
} satisfies Meta<typeof ServicesFilters>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
