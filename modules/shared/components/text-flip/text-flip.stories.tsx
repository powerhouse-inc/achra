import { TextFlip } from './text-flip'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Shared/Components/TextFlip',
  component: TextFlip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    words: {
      control: 'object',
      description: 'Array of strings to cycle through with a flip animation',
    },
    duration: {
      control: 'number',
      description: 'Time in milliseconds each word is visible before flipping to the next',
    },
    className: {
      control: 'text',
      description: 'Additional Tailwind classes applied to the wrapper span',
    },
  },
} satisfies Meta<typeof TextFlip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    words: ['Builder', 'Operator', 'Organization'],
    duration: 3000,
  },
}

export const InsideText: Story = {
  args: {
    words: ['Builder', 'Operator', 'Organization'],
    duration: 3000,
    className: 'font-bold',
  },
  render: (args) => (
    <p className="text-foreground max-w-[16rem] text-center text-sm leading-snug">
      Begin your journey as a <br />
      <TextFlip {...args} />
    </p>
  ),
}
