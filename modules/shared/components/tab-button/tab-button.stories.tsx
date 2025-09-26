import { TabButton } from './tab-button'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Shared/Components/TabButton',
  component: TabButton,
  parameters: {
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

export const Basic: Story = {
  name: 'TabButton',
  args: {
    label: 'TabButton',
    onClick: () => {},
    isSelect: false,
  },
}

export const WithSelect: Story = {
  name: 'WithSelect',
  args: {
    label: 'TabButton',
    onClick: () => {},
    isSelect: true,
  },
}
