import { ArrowButton } from './arrow-button'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Shared/Components/Buttons/Arrow Button',
  component: ArrowButton,
  parameters: {
    layout: 'centered',
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
