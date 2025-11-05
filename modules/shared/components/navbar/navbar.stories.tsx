import { AchraNavbar } from './achra-navbar'
import { NetworkNavbar } from './network-navbar'
import type { Meta, StoryObj } from '@storybook/nextjs'

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

export const NetworkPowerhouse: Story = {
  name: 'Navbar (Powerhouse)',
  render: () => <NetworkNavbar />,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/network/powerhouse/roadmap',
        segments: [['slug', 'powerhouse']],
      },
    },
  },
}

export const NetworkSky: Story = {
  name: 'Navbar (Sky)',
  render: () => <NetworkNavbar />,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/network/sky/finances',
        segments: [['slug', 'sky']],
      },
    },
  },
}
