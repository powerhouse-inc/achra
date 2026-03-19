import { withNextjsExtras, withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { FinancesSection } from './finances-section'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Networks/Components/FinancesSection',
  component: FinancesSection,
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/network/powerhouse',
      },
    },
  },
  decorators: [withPortalFontStyles, withNextjsExtras],
} satisfies Meta<typeof FinancesSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
