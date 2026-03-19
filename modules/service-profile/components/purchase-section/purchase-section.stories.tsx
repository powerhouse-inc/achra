import { mockedOperator } from '@/modules/service-profile/mocks'
import { PurchaseSection } from './purchase-section'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/ServiceProfile/Components/PurchaseSection',
  component: PurchaseSection,
  argTypes: {
    operator: {
      description: 'Operator/builder profile data',
    },
    serviceSlug: {
      control: 'text',
      description: 'Slug of the service for purchase links',
    },
  },
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/services/c6aacdfe-b182-4ec5-8a4c-dbf9f21708f8/purchase',
      },
    },
  },
} satisfies Meta<typeof PurchaseSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    operator: mockedOperator,
    serviceSlug: 'c6aacdfe-b182-4ec5-8a4c-dbf9f21708f8',
  },
}
