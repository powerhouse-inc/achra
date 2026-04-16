import { getServiceBadge } from '@/modules/services/lib/utils'
import { SERVICES_CARDS_MOCK } from '@/modules/services/mocks/services'
import { withNuqsAdapter } from '@/modules/shared/lib/decorators'
import { ServicesFiltersProvider } from '../services-filters/services-filters-context'
import { ServicesPageContent } from './services-page-content'
import type { EnrichedService } from '../../types'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const ENRICHED_SERVICES_MOCK: EnrichedService[] = SERVICES_CARDS_MOCK.map((service) => ({
  service,
  badge: getServiceBadge(service, null),
  offeringSummary: null,
  operatorName: 'Powerhouse',
}))

const meta = {
  title: 'Modules/Services/Components/ServicesPageContent',
  component: ServicesPageContent,
  argTypes: {
    enrichedServices: {
      control: false,
      description: 'List of enriched services to display',
    },
  },
  decorators: [
    (Story) => (
      <ServicesFiltersProvider>
        <Story />
      </ServicesFiltersProvider>
    ),
    withNuqsAdapter,
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
    enrichedServices: ENRICHED_SERVICES_MOCK,
  },
}

export const Empty: Story = {
  args: {
    enrichedServices: [],
  },
}
