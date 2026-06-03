import { BuildNetworkSection } from './build-network-section'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Home/Components/BuildNetworkSection',
  component: BuildNetworkSection,
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      disable: true,
    },
  },
} satisfies Meta<typeof BuildNetworkSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
