import { withNextjsExtras } from '@/modules/shared/lib/decorators'
import { SuccessView } from './success-view'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Whitelist/Components/SuccessView',
  component: SuccessView,
  decorators: [withNextjsExtras],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SuccessView>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
