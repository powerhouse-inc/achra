import { withNuqsAdapter } from '@/modules/shared/lib/decorators'
import ServicesFilters from './services-filters'
import { ServicesFiltersProvider } from './services-filters-context'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Services/Components/ServicesFilters',
  component: ServicesFilters,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    withNuqsAdapter,
    (Story) => (
      <ServicesFiltersProvider>
        <Story />
      </ServicesFiltersProvider>
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
