import { SERVICES_CARDS_MOCK } from '@/modules/services/mocks/services'
import { ServicesList } from './services-list'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Services/Components/ServicesList',
  component: ServicesList,
  tags: ['autodocs'],
  argTypes: {
    services: {
      control: false,
      description: 'List of services to display',
    },
    title: {
      control: 'text',
      description: 'Optional section title',
    },
  },
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/services',
      },
    },
  },
} satisfies Meta<typeof ServicesList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    services: SERVICES_CARDS_MOCK,
  },
}

export const WithTitle: Story = {
  args: {
    services: SERVICES_CARDS_MOCK,
    title: 'Builders',
  },
}

export const SingleService: Story = {
  args: {
    services: [SERVICES_CARDS_MOCK[0]],
    title: 'Networks',
  },
}
