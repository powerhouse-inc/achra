import { withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { BuildersSection } from './builders-section'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Networks/Components/BuildersSection',
  component: BuildersSection,
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/network/powerhouse',
      },
    },
  },
  decorators: [withPortalFontStyles],
} satisfies Meta<typeof BuildersSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
