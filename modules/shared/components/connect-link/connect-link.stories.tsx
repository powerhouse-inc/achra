import { ConnectLink } from './connect-link'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Shared/Components/Buttons/Connect link',
  component: ConnectLink,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/networks',
      },
    },
  },
} satisfies Meta<typeof ConnectLink>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  name: 'ConnectLink',
  render: () => (
    <div className="text-primary-foreground">
      <ConnectLink />
    </div>
  ),
}
