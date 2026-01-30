import { ArrowButton } from './arrow-button'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Shared/Components/Buttons/Arrow Button',
  component: ArrowButton,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/networks',
      },
    },
  },
} satisfies Meta<typeof ArrowButton>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  name: 'ArrowButton',
  args: {
    onClick: () => {
      console.log('ArrowButton clicked')
    },
    children: 'ArrowButton',
  },
}
