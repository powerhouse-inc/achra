import NetworksPage from './page'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Achra/Pages/Networks',
  component: NetworksPage,
  parameters: {
    includeLayout: true,
    nextjs: {
      appDirectory: true,
      router: {
        pathname: '/networks',
      },
    },
  },
} satisfies Meta<typeof NetworksPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
