import { SERVICES_CARDS_MOCK } from '@/modules/services/mocks/services'
import { ServicesCard } from './services-card'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Services/Components/ServicesCard',
  component: ServicesCard,
  tags: ['autodocs'],
  argTypes: {
    service: {
      control: false,
      description: 'Service data to display',
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
} satisfies Meta<typeof ServicesCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    service: SERVICES_CARDS_MOCK[0],
  },
}

export const ComingSoon: Story = {
  args: {
    service: SERVICES_CARDS_MOCK[1],
  },
}
