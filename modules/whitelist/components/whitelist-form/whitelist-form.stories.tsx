import { whitelistHandlers } from '@/modules/whitelist/mocks/whitelist-handlers'
import { WhitelistForm } from './whitelist-form'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Whitelist/Components/WhitelistForm',
  component: WhitelistForm,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
    msw: {
      handlers: whitelistHandlers,
    },
  },
  argTypes: {
    onSuccess: {
      action: 'onSuccess',
      description: 'Callback invoked when the form is successfully submitted',
    },
  },
  args: {
    onSuccess: () => {},
  },
} satisfies Meta<typeof WhitelistForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
