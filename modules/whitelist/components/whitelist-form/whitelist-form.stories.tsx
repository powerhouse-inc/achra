import { withNextjsExtras } from '@/modules/shared/lib/decorators'
import { WhitelistForm } from './whitelist-form'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Whitelist/Components/WhitelistForm',
  component: WhitelistForm,
  decorators: [withNextjsExtras],
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    onSuccess: () => {},
  },
} satisfies Meta<typeof WhitelistForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
