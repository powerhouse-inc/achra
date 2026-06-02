import { CountUp } from './count-up'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Shared/Components/CountUp',
  component: CountUp,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    to: { control: 'number' },
    from: { control: 'number' },
    direction: { control: 'select', options: ['up', 'down'] },
    delay: { control: 'number' },
    duration: { control: 'number' },
    separator: { control: 'text' },
  },
} satisfies Meta<typeof CountUp>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    to: 1000,
    from: 0,
    direction: 'up',
  },
}

export const WithSeparator: Story = {
  args: {
    to: 1234567,
    from: 0,
    separator: ',',
  },
}

export const CountDown: Story = {
  args: {
    to: 0,
    from: 100,
    direction: 'down',
  },
}
