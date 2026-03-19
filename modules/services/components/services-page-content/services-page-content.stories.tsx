import { SERVICES_CARDS_MOCK } from '@/modules/services/mocks/services'
import { withNuqsAdapter } from '@/modules/shared/lib/decorators'
import { ServicesFiltersProvider } from '../services-filters/services-filters-context'
import { ServicesPageContent } from './services-page-content'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Services/Components/ServicesPageContent',
  component: ServicesPageContent,
  argTypes: {
    services: {
      control: false,
      description: 'List of services to display',
    },
  },
  decorators: [
    withNuqsAdapter,
    (Story) => (
      <ServicesFiltersProvider>
        <Story />
      </ServicesFiltersProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/services',
      },
    },
  },
} satisfies Meta<typeof ServicesPageContent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    services: SERVICES_CARDS_MOCK,
  },
}

export const Empty: Story = {
  args: {
    services: [],
  },
}
