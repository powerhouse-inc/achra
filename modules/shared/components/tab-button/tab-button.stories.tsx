import { TabButton } from './tab-button'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Shared/Components/TabButton',
  component: TabButton,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/networks',
      },
    },
  },
} satisfies Meta<typeof TabButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'TabButton',
    onClick: () => {},
    isSelect: false,
  },
}

export const Selected: Story = {
  args: {
    label: 'TabButton',
    onClick: () => {},
    isSelect: true,
  },
}
