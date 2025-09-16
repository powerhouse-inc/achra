import { withReactServerComponentDecorator } from '@/modules/shared/config/rsc-decorator'
import NetworkPage from './page'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Achra/Pages/Network Homepage',
  component: NetworkPage,
  decorators: [withReactServerComponentDecorator],
  parameters: {
    includeLayout: true,
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/network/sky',
      },
    },
  },
} satisfies Meta<typeof NetworkPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
