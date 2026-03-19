import { Input } from './input'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Shared/Shadcn/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { placeholder: 'Type here' },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text when input is empty',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search'],
      description: 'HTML input type',
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
