import Navbar from './navbar'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Shared/Components/Navbar',
  component: Navbar,
  parameters: {
    nextjs: {
      appDirectory: true,
      router: {
        pathname: '/',
      },
    },
  },
} satisfies Meta<typeof Navbar>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => <Navbar />,
}
