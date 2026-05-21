import { Fragment } from 'react/jsx-runtime'
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
      description:
        'Items to cycle through with a flip animation. Accepts strings or any ReactNode, so individual segments inside an item can carry their own styling (e.g. articles in normal weight while the noun is bold).',
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
    words: [
      <Fragment key="builder">
        <span className="font-normal">a</span> Builder
      </Fragment>,
      <Fragment key="operator">
        <span className="font-normal">an</span> Operator
      </Fragment>,
      <Fragment key="organization">
        <span className="font-normal">an</span> Organization
      </Fragment>,
    ],
    duration: 3000,
    className: 'font-bold',
  },
  render: (args) => (
    <p className="text-foreground max-w-[16rem] text-center text-sm leading-snug">
      Begin your journey as <br />
      <TextFlip {...args} />
    </p>
  ),
}
