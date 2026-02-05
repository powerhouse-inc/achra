import ServicesFilters from './services-filters'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Modules/Services/Components/ServicesFilters',
  component: ServicesFilters,
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

export const Default: Story = {
  args: {
    activeTab: 'all',
    onTabChange: () => {},
  },
}
