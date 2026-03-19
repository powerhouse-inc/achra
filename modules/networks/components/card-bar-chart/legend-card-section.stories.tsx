import { withNextjsExtras, withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { FinancesLegends } from './legend-card-section'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Networks/Components/LegendCardSection',
  component: FinancesLegends,
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
} satisfies Meta<typeof FinancesLegends>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
