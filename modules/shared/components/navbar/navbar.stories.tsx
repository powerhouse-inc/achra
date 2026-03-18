import { AchraNavbar } from './achra-navbar'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Shared/Components/Navbar',
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Achra: Story = {
  name: 'Navbar (Achra)',
  render: () => <AchraNavbar />,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/networks',
      },
    },
  },
}
